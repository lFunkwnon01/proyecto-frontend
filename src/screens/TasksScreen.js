import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getRoleBasedOnToken } from "../api";
import { ROLE_COORDINATOR, ROLE_VOLUNTEER } from "../constants/role";
import TareaCoordinadorScreen from "./coordinador/TareaCoordinadorScreen";
import TareaVoluntarioScreen from "./voluntario/TareaVoluntarioScreen";

const TasksScreen = ({ route }) => {
  const [role, setRole] = useState("");

  const tareas = route.params?.tareas;

  const getRole = async () => {
    try {
      const data = await getRoleBasedOnToken();
      setRole(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <View style={styles.container}>
      {role === ROLE_COORDINATOR && <TareaCoordinadorScreen route={route} />}
      {role === ROLE_VOLUNTEER && <TareaVoluntarioScreen route={route} />}
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  projectName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00B8D4",
    marginBottom: 24,
  },
  label: {
    width: "100%",
    fontSize: 16,
    color: "#333333",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: "blue",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333333",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 8,
  },
});

export default TasksScreen;