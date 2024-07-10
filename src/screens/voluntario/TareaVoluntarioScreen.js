import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import {
  deleteTarea,
  getPerfil,
  participarTarea,
  tareasDisponibles,
  completarTarea,
  eliminarVoluntarioTarea,
} from "../../api";

const TareaVoluntarioScreen = ({ setIsLoggedIn, route }) => {
  const [tasks, setTasks] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [miTareas, setMiTareas] = useState([]);

  const tareas = route.params?.tareas;

  const participar = async (idTarea) => {
    try {
      const { id: idVoluntario } = await getPerfil();

      await participarTarea(idTarea, idVoluntario);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const completar = async (item) => {
    try {
      await completarTarea(item.id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const eliminar = async (id) => {
    try {
      const { id: idVoluntario } = await getPerfil();

      await eliminarVoluntarioTarea(id, idVoluntario);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const all = async () => {
    try {
      const data = await tareasDisponibles();
      const { id } = await getPerfil();

      const misTareas = [];
      const tareas = [];

      data.forEach((item) => {
        if (item.voluntarios.find((voluntario) => voluntario.id === id)) {
          misTareas.push(item);
        } else {
          tareas.push(item);
        }
      });

      setTasks(tareas);
      setMiTareas(misTareas);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    all();
  }, [updateList]);

  const Item = ({ id, title, description, status }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{status}</Text>

      <View style={styles.actions}>
        <View>
          <Button
            title="Participar"
            color="#f194ff"
            onPress={() => participar(id)}
          />
        </View>
      </View>
    </View>
  );

  const ItemMiTareas = ({ id, title, description, status }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{status}</Text>

      <View style={styles.actions}>
        <Button
          title="Completar"
          color="#f194ff"
          onPress={() => completar({ id })}
        />
        <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mis Tareas:</Text>
      <FlatList
        data={miTareas ?? tasks}
        renderItem={({ item }) => (
          <ItemMiTareas
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.heading}>Tareas:</Text>
      <FlatList
        data={tareas ?? tasks}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAF3E0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00B8D4",
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 8,
  },
});

export default TareaVoluntarioScreen;