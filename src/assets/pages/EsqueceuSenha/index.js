import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from "react-native";

export default function EsqueceuSenha({ navigation }) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validarCampos = () => {
    const novosErros = {};

    if (!email.trim()) {
      novosErros.email = "Email é obrigatório";
    } else if (!validarEmail(email)) {
      novosErros.email = "Email inválido";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleEnviar = () => {
    if (validarCampos()) {
      Alert.alert("Sucesso", "Email de recuperação enviado com sucesso!");
      // Aqui você implementaria o envio real do email
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Título */}
      <Text style={styles.title}>Esqueci minha senha</Text>

      {/* Texto explicativo */}
      <Text style={styles.subtitle}>
        Para redefinir a sua senha, informe o e-mail cadastrado na sua conta e 
        lhe enviaremos um link com as instruções
      </Text>

      {/* Linha divisória */}
      <View style={styles.divider} />

      {/* Campo Email */}
      <Text style={styles.label}>Email de acesso</Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({...errors, email: null});
        }}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Botão Enviar */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleEnviar}
      >
        <Text style={styles.primaryButtonText}>Enviar</Text>
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryButtonText}>Voltar</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 5,
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 20,
    marginLeft: 5,
  },
  primaryButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF9800",
  },
  secondaryButtonText: {
    color: "#FF9800",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});