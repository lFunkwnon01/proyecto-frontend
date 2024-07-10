import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { getRoleBasedOnToken, logout } from "../api";
import { getCoordinadorPerfil, getVoluntarioPerfil } from "../api";
import { ROLE_COORDINATOR, ROLE_VOLUNTEER } from "../constants/role";

const PerfilScreen = ({ setIsLoggedIn }) => {
  const [role, setRole] = useState("");
  const [perfil, setPerfil] = useState("");

  const getRole = async () => {
    try {
      const data = await getRoleBasedOnToken();
      setRole(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const getPerfil = async () => {
    const role = await getRoleBasedOnToken();
    setRole(role);

    if (role === ROLE_COORDINATOR) {
      const data = await getCoordinadorPerfil();
      setPerfil(data);
    }

    if (role === ROLE_VOLUNTEER) {
      const data = await getVoluntarioPerfil();
      setPerfil(data);
    }
  };

  useEffect(() => {
    getRole();
    getPerfil();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre: {perfil.name}</Text>
      <Text style={styles.label}>Correo: {perfil.email}</Text>
      <Text style={styles.label}>Teléfono: {perfil.phone}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#FF6347" />
      </View>
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
  label: {
    width: "100%",
    fontSize: 16,
    color: "#333333",
    marginBottom: 12,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 8,
  },
});

export default PerfilScreen;