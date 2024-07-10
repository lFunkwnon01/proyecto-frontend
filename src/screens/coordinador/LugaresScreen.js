import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import { deleteLugar, listLugares } from "../../api";
import LugarCreate from "../../components/LugarCreate";
import LugarUpdate from "../../components/LugarUpdate";

const LugaresScreen = ({}) => {
  const [lugares, setLugares] = useState([]);
  const [emergencia, setEmergencia] = useState("");
  const [updateList, setUpdateList] = useState(false);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const crear = async () => {
    setModalCreate(true);
  };

  const actualizar = async (item) => {
    setEmergencia(item);
    setModalUpdate(true);
  };

  const all = async () => {
    try {
      const list = await listLugares();
      setLugares(list.content);
    } catch (error) {
      console.error("List failed", error);
    }
  };

  const eliminar = async (id) => {
    try {
      await deleteLugar(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Eliminar failed", error);
    }
  };

  useEffect(() => {
    all();
  }, [updateList]);

  const ItemTarea = ({ id, title, description }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );

  const Item = ({ id, name, ubication, tareas }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{ubication}</Text>
      <Text style={styles.subtitle}>Tareas:</Text>

      <FlatList
        data={tareas}
        renderItem={({ item }) => (
          <ItemTarea
            id={item.id}
            title={item.title}
            description={item.description}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Button
        title="Actualizar"
        color="#f194ff"
        onPress={() => actualizar({ id, name, ubication })}
      />
      <Button title="Eliminar" color="#FF0000" onPress={() => eliminar(id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Crear" onPress={crear} />

      <FlatList
        data={lugares}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            ubication={item.ubication}
            tareas={item.tareas}
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
            <LugarCreate
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
            <LugarUpdate
              item={emergencia}
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
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  title: {
    fontSize: 24,
    color: "#333333",
  },
  subtitle: {
    fontSize: 16,
    color: "#333333",
  },
  description: {
    fontSize: 14,
    color: "#333333",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  centeredView: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
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

export default LugaresScreen;