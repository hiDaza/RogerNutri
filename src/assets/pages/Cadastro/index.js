import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Cadastro({ navigation }) {
  const [remember, setRemember] = useState(false);

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Text style={styles.logo}>RogerNutri</Text>

      {/* Título */}
      <Text style={styles.title}>Cadastrar</Text>

      {/* Input Usuário (ALTERADO) */}
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#888"
      />

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      {/* Input Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
      />

      {/* Checkbox Customizado */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setRemember(!remember)}>
          <View style={[styles.checkbox, remember && styles.checkboxSelected]} />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>Lembre-se de mim</Text>
      </View>

      {/* Botão Cadastrar - AGORA VAI PARA INFORMAÇÕES USUÁRIO */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("InformacoesUsuarioPasso1")}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footer}>
          Já tem uma conta? <Text style={styles.link}>faça login</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  logo: {
    fontSize: 34,
    color: "#FF9800",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: "#FF9800",
    borderColor: "#FF9800",
  },
  checkboxText: {
    color: "#444",
  },
  button: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 18,
    textAlign: "center",
    color: "#777",
  },
  link: {
    color: "#FF9800",
    fontWeight: "600",
  },
});