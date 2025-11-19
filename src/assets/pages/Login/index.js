import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from "react-native";
import { auth as AuthService } from "../../services/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, informe seu email");
      return;
    }

    if (!senha) {
      Alert.alert("Erro", "Por favor, informe sua senha");
      return;
    }

    setLoading(true);
    const result = await AuthService.login(email, senha, lembrar);
    setLoading(false);

    if (result.success) {
      // Navegar para tela inicial
      navigation.navigate("Inicial");
    } else {
      Alert.alert("Erro", result.message);
    }
  };

  return (
    <View style={styles.container}>

      {/* Título principal */}
      <Text style={styles.logo}>RogerNutri</Text>

      {/* Subtítulo */}
      <Text style={styles.title}>Login</Text>

      {/* Campo Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* CheckBox fake */}
      <TouchableOpacity 
        style={styles.checkboxArea}
        onPress={() => setLembrar(!lembrar)}
      >
        <View style={[styles.checkbox, lembrar && styles.checkboxSelected]} />
        <Text style={styles.checkboxText}>Lembre-se de mim</Text>
      </TouchableOpacity>

      {/* Botão Login */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Entrando..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Esqueceu senha */}
      <TouchableOpacity onPress={() => navigation.navigate("EsqueceuSenha")}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Criar conta - CORRIGIDO */}
      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.register}>
          Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
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
    paddingTop: 60
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF9800",
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    color: "#333",
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  checkboxArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#444",
    marginRight: 8,
    borderRadius: 4
  },

  checkboxSelected: {
    backgroundColor: "#FF9800",
    borderColor: "#FF9800"
  },

  checkboxText: {
    color: "#333",
  },

  button: {
    backgroundColor: "#FF9800",
    height: 42,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  forgotPassword: {
    marginTop: 15,
    textAlign: "center",
    color: "#FF9800",
    fontWeight: "500"
  },

  register: {
    marginTop: 10,
    textAlign: "center",
    color: "#777"
  },

  registerLink: {
    color: "#FF9800",
    fontWeight: "500"
  }
});
