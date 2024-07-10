import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { register } from "../api";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isCoordinator, setIsCoordinator] = useState(false);

  const toggleCheckbox = () => {
    setIsCoordinator(!isCoordinator);
  };

  const handleRegister = async () => {
    try {
      await register(name, email, password, phone, isCoordinator);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo123.png')} style={styles.logo} />
      <Text style={styles.projectName}>YOAYUDO</Text>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa tu nombre"
        placeholderTextColor="#333333"
      />
      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#333333"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#333333"
        secureTextEntry
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        placeholderTextColor="#333333"
      />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          {isCoordinator && <View style={styles.checked} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>¿Eres un coordinador?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} color="#FF6F61" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
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

export default RegisterScreen;
