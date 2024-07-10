import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { deleteTarea, tareasDisponibles } from "../../api";
import TareaCreate from "../../components/TareaCreate";
import TareaUpdate from "../../components/TareaUpdate";

const TareaCoordinadorScreen = ({ route }) => {
  const [tasks, setTasks] = useState([]);
  const [tarea, setTarea] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const tareas = route.params?.tareas;

  const crear = async () => {
    setModalCreate(true);
  };

  const actualizar = async (item) => {
    setTarea(item);
    setModalUpdate(true);
  };

  const eliminar = async (id) => {
    try {
      await deleteTarea(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const all = async () => {
    try {
      const data = await tareasDisponibles();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    all();
  }, [updateList]);

  const Item = ({ id, title, description, status, suministros }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{status}</Text>

      <View style={styles.actions}>
        <Button
          title="Actualizar"
          color="#00B8D4"
          onPress={() =>
            actualizar({ id, title, description, status, suministros })
          }
        />
        <Button title="Eliminar" color="#FF6F61" onPress={() => eliminar(id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Button title="Crear" onPress={crear} color="#FF6F61" />
        <Text style={styles.label}>Tareas:</Text>
        <FlatList
          data={tareas ?? tasks}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              description={item.description}
              status={item.status}
              suministros={item.suministros}
            />
          )}
          keyExtractor={(item) => item.id}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCreate}
          onRequestClose={() => {
            setModalCreate(!modalCreate);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TareaCreate
                setUpdateList={setUpdateList}
                setModalCreate={setModalCreate}
                updateList={updateList}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalCreate(!modalCreate)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUpdate}
          onRequestClose={() => {
            setModalUpdate(!setModalUpdate);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TareaUpdate
                item={tarea}
                setUpdateList={setUpdateList}
                setModalUpdate={setModalUpdate}
                updateList={updateList}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalUpdate(!modalUpdate)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAF3E0",
  },
  title: {
    fontSize: 24,
    color: "#333333",
  },
  label: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TareaCoordinadorScreen;