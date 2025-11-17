import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function InformacoesUsuarioPasso1({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [objetivo, setObjetivo] = useState("");

  return (
    <View style={styles.container}>
      
      {/* Título e Subtítulo */}
      <Text style={styles.title}>Suas Informações</Text>
      <Text style={styles.subtitle}>Passo 1/2</Text>

      {/* Campo Nome Completo */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
      />

      {/* Campo Telefone */}
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      {/* Campo Estado */}
      <Text style={styles.label}>Qual seu Estado</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu estado"
        value={estado}
        onChangeText={setEstado}
      />

      {/* Campo Objetivo */}
      <Text style={styles.label}>Qual seu objetivo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu objetivo"
        value={objetivo}
        onChangeText={setObjetivo}
      />

      {/* Linha divisória */}
      <View style={styles.divider} />

      {/* Botão Próximo */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("InformacoesUsuarioPasso2")}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
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
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
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
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#FFF0DA",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF9800",
  },
  backButtonText: {
    color: "#FF9800",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});