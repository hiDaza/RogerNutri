import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function InformacoesUsuarioPasso3({ navigation, route }) {
  const { 
    pesoAtual, 
    altura, 
    imc, 
    categoria, 
    pesoIdealMin, 
    pesoIdealMax,
    quantidade 
  } = route.params;

  const [pesoDesejado, setPesoDesejado] = useState("");
  const [duracao, setDuracao] = useState("");

  // Calcular sugestão baseada no IMC
  const calcularSugestao = () => {
    const pesoIdealMedio = (pesoIdealMin + pesoIdealMax) / 2;
    let diferencaPeso, acao, sugestaoTexto, duracaoSugerida;

    if (categoria === "Abaixo") {
      // Precisa ganhar peso
      diferencaPeso = pesoIdealMedio - pesoAtual;
      acao = "Ganhar";
      // Ganho saudável: 0.25-0.5 kg por semana
      duracaoSugerida = Math.max(30, Math.round((diferencaPeso / 0.3) * 7));
    } else if (categoria === "Normal") {
      // Manter o peso
      diferencaPeso = 0;
      acao = "Manter";
      duracaoSugerida = 30; // Período padrão para manutenção
    } else {
      // Precisa perder peso (Sobrepeso ou Obesidade)
      diferencaPeso = pesoAtual - pesoIdealMedio;
      acao = "Perder";
      // Perda saudável: 0.5-1 kg por semana
      duracaoSugerida = Math.max(30, Math.round((diferencaPeso / 0.5) * 7));
    }

    sugestaoTexto = diferencaPeso > 0 ? 
      `${acao} ${diferencaPeso.toFixed(1)} kg em ${duracaoSugerida} dias` : 
      "Manter peso saudável";

    return {
      pesoIdealMin: pesoIdealMin.toFixed(1),
      pesoIdealMax: pesoIdealMax.toFixed(1),
      sugestaoTexto,
      duracaoSugerida,
      pesoDesejadoSugerido: pesoIdealMedio.toFixed(1)
    };
  };

  const sugestao = calcularSugestao();

  // Inicializar campos com valores sugeridos
  useEffect(() => {
    setPesoDesejado(sugestao.pesoDesejadoSugerido);
    setDuracao(sugestao.duracaoSugerida.toString());
  }, []);

  return (
    <View style={styles.container}>
      
      {/* Título */}
      <Text style={styles.title}>Seu Peso Desejado</Text>

      {/* Peso Ideal */}
      <Text style={styles.label}>Seu peso ideal:</Text>
      <Text style={styles.pesoIdeal}>
        {sugestao.pesoIdealMin} - {sugestao.pesoIdealMax} kg
      </Text>

      {/* Sugestão */}
      <Text style={styles.sugestaoLabel}>Nossa Sugestão</Text>
      <Text style={styles.sugestaoTexto}>{sugestao.sugestaoTexto}</Text>

      {/* Instrução */}
      <Text style={styles.instrucao}>Defina o seu caminho ideal</Text>

      {/* Campo Peso Desejado */}
      <Text style={styles.inputLabel}>Peso Desejado (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o peso desejado"
        value={pesoDesejado}
        onChangeText={setPesoDesejado}
        keyboardType="numeric"
      />

      {/* Campo Duração */}
      <Text style={styles.inputLabel}>Duração (dias)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a duração em dias"
        value={duracao}
        onChangeText={setDuracao}
        keyboardType="numeric"
      />

      {/* Botão Vamos lá! */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => {
          // Aqui você pode salvar as metas e navegar para a tela principal
          console.log("Meta definida:", {
            pesoDesejado: pesoDesejado,
            duracao: duracao,
            pesoAtual: pesoAtual,
            altura: altura
          });
          // navigation.navigate("TelaPrincipal");
        }}
      >
        <Text style={styles.primaryButtonText}>Vamos lá!</Text>
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
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  pesoIdeal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF9800",
    textAlign: "center",
    marginBottom: 30,
  },
  sugestaoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  sugestaoTexto: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  instrucao: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  inputLabel: {
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
  primaryButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  primaryButtonText: {
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