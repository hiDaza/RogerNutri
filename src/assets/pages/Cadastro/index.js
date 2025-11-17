import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Cadastro({ navigation }) {
  const [remember, setRemember] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({});

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validarCampos = () => {
    const novosErros = {};

    if (!usuario.trim()) {
      novosErros.usuario = "Usuário é obrigatório";
    }

    if (!email.trim()) {
      novosErros.email = "Email é obrigatório";
    } else if (!validarEmail(email)) {
      novosErros.email = "Email inválido";
    }

    if (!senha.trim()) {
      novosErros.senha = "Senha é obrigatória";
    } else if (senha.length < 6) {
      novosErros.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastrar = () => {
    if (validarCampos()) {
      // Se todos os campos estão válidos, navega para a próxima tela
      navigation.navigate("InformacoesUsuarioPasso1");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>RogerNutri</Text>

      {/* Título */}
      <Text style={styles.title}>Cadastrar</Text>

      {/* Input Usuário */}
      <TextInput
        style={[styles.input, errors.usuario && styles.inputError]}
        placeholder="Usuário"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={(text) => {
          setUsuario(text);
          if (errors.usuario) setErrors({...errors, usuario: null});
        }}
      />
      {errors.usuario && <Text style={styles.errorText}>{errors.usuario}</Text>}

      {/* Input Email */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({...errors, email: null});
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Input Senha */}
      <TextInput
        style={[styles.input, errors.senha && styles.inputError]}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={(text) => {
          setSenha(text);
          if (errors.senha) setErrors({...errors, senha: null});
        }}
      />
      {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

      {/* Checkbox Customizado */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setRemember(!remember)}>
          <View style={[styles.checkbox, remember && styles.checkboxSelected]} />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>Lembre-se de mim</Text>
      </View>

      {/* Botão Cadastrar */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleCadastrar}
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
    marginBottom: 5,
    backgroundColor: "#FFF",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
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