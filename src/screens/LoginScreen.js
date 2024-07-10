import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import {
  login,
  getCoordinadorPerfil,
  getRoleBasedOnToken,
  getVoluntarioPerfil,
} from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROLE_COORDINATOR, ROLE_VOLUNTEER } from "../constants/role";

const LoginScreen = ({ navigation, setIsLoggedIn, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      setIsLoggedIn(true);

      const role = await getRoleBasedOnToken();
      setRole(role);

      if (role === ROLE_COORDINATOR) {
        await getCoordinadorPerfil();
      }

      if (role === ROLE_VOLUNTEER) {
        await getVoluntarioPerfil();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogged = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    handleLogged();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo123.png')} style={styles.logo} />
      <Text style={styles.projectName}>YOAYUDO</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#333333"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#333333"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLogin}
          color="#FF6F61"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Register"
          onPress={() => navigation.navigate("Register")}
          color="#FFC107"
        />
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
  buttonContainer: {
    width: "100%",
    marginVertical: 8,
  },
});

export default LoginScreen;