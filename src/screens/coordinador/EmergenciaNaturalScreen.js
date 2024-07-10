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
import { deleteEmergenciaNatural, listEmergenciaNatural } from "../../api";
import EmergenciaNaturalCreate from "../../components/EmergenciaNaturalCreate";
import EmergenciaNaturalUpdate from "../../components/EmergenciaNaturalUpdate";

const EmergenciaNaturalScreen = ({}) => {
  const [emergencias, setEmergencias] = useState([]);
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
      const list = await listEmergenciaNatural();
      setEmergencias(list.content);
    } catch (error) {
      console.error("List failed", error);
    }
  };

  const eliminar = async (id) => {
    try {
      await deleteEmergenciaNatural(id);
      setUpdateList(!updateList);
    } catch (error) {
      console.error("Eliminar failed", error);
    }
  };

  useEffect(() => {
    all();
  }, [updateList]);

  const Item = ({ id, name, description, importance }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{importance}</Text>

      <View style={styles.actions}>
        <Button
          title="Actualizar"
          color="#00B8D4"
          onPress={() => actualizar({ id, name, description, importance })}
        />
        <Button title="Eliminar" color="#FF6F61" onPress={() => eliminar(id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Crear" onPress={crear} color="#FF6F61" />

      <FlatList
        data={emergencias}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            name={item.name}
            description={item.description}
            importance={item.importance}
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
            <EmergenciaNaturalCreate
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
          setModalUpdate(!modalUpdate);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <EmergenciaNaturalUpdate
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
    padding: 16,
    backgroundColor: "#FAF3E0",
  },
  input: {
    height: 40,
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
    fontSize: 14,
    color: "#333333",
  },
  item: {
    backgroundColor: "#ECEFF1",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    backgroundColor: "#FAF3E0",
    borderRadius: 20,
    padding: 35,
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
    backgroundColor: "#FF6F61",
  },
  buttonClose: {
    backgroundColor: "#00B8D4",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmergenciaNaturalScreen;