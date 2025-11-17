import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthService } from "../../services/auth";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    // Validações
    if (!nome.trim()) {
      Alert.alert("Erro", "Por favor, informe seu nome completo");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, informe seu email");
      return;
    }

    if (!senha || senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    const result = await AuthService.register(nome, email, senha);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        "Sucesso!",
        result.message,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login")
          }
        ]
      );
    } else {
      Alert.alert("Erro", result.message);
    }
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Text style={styles.logo}>RogerNutri</Text>

      {/* Título */}
      <Text style={styles.title}>Cadastrar</Text>

      {/* Input Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Input Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha (mín. 6 caracteres)"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Checkbox Customizado */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setRemember(!remember)}>
          <View style={[styles.checkbox, remember && styles.checkboxSelected]} />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>Lembre-se de mim</Text>
      </View>

      {/* Botão Cadastrar */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCadastro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      {/* Link para Login - CORRIGIDO */}
      <TouchableOpacity 
        style={styles.loginLink} // Adicionei um estilo específico
        onPress={() => navigation.navigate("Login")} // Certifique-se que está chamando navigate
      >
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 18,
    alignItems: "center",
  },
  footer: {
    textAlign: "center",
    color: "#777",
  },
  link: {
    color: "#FF9800",
    fontWeight: "600",
  },
});