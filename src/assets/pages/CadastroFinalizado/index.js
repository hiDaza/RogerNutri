import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from "react-native";
import { auth } from "../../services/auth";
import { UserService } from "../../services/UserService";

export default function CadastroFinalizado({ navigation, route }) {
  // Recebe os dados completos com fallback seguro
  const { dadosCompletos = {} } = route.params || {};
  
  console.log("Dados recebidos:", dadosCompletos);

  // Extrai os parâmetros com valores padrão
  const { 
    peso: pesoAtual = 70, 
    pesoDesejado = 70, 
    duracao = 90,
    genero = "Masculino",
    dataNascimento = "01/01/1990",
    altura = 170,
    movimentacao = "Moderadamente ativo"
  } = dadosCompletos;

  // Cálculo simplificado e robusto das calorias
  const calcularCaloriasDiarias = () => {
    try {
      // Cálculo base simples para demonstração
      const diferencaPeso = pesoDesejado - pesoAtual;
      const caloriasBase = 2000; // Calorias base para manutenção
      
      // Ajuste baseado na diferença de peso e duração
      const ajusteCalorico = (diferencaPeso * 7700) / duracao;
      const caloriasTotais = caloriasBase + ajusteCalorico;
      
      // Limitar a um range razoável
      const cals = Math.max(1200, Math.min(4000, Math.round(caloriasTotais)))
      UserService.updateUserData({caloriasMeta: cals});
      return cals;

    } catch (error) {
      console.error("Erro no cálculo:", error);
      return 2000; // Valor padrão
    }
  };

  const caloriasDiarias = calcularCaloriasDiarias();

  const handleComecar = () => {
    // Navega para a Tela Inicial
    navigation.navigate("Inicial");
    
    // Opcional: Mostrar mensagem de sucesso
    Alert.alert("Bem-vindo!", "Cadastro concluído com sucesso!");
    console.log("Navegando para Tela Inicial");
  };

  return (
    <View style={styles.container}>
      
      {/* Título de boas-vindas */}
      <Text style={styles.title}>Você finalizou o</Text>
      <Text style={styles.title}>processo de registro com</Text>
      <Text style={styles.title}>sucesso!</Text>

      {/* Espaçamento */}
      <View style={styles.spacer} />

      {/* Informação de calorias */}
      <Text style={styles.subtitle}>Você deve consumir</Text>
      
      <View style={styles.calorieContainer}>
        <Text style={styles.calorieValue}>{caloriasDiarias}</Text>
        <Text style={styles.calorieUnit}>kcal</Text>
      </View>
      
      <Text style={styles.subtitle}>por dia para</Text>
      <Text style={styles.subtitle}>atingir sua meta</Text>

      {/* Botão para ir para a Tela Inicial - CORRIGIDO */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleComecar}
      >
        <Text style={styles.buttonText}>Começar</Text>
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    lineHeight: 32,
  },
  spacer: {
    height: 40,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
    marginBottom: 5,
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginVertical: 20,
  },
  calorieValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF9800",
    marginRight: 5,
  },
  calorieUnit: {
    fontSize: 24,
    color: "#FF9800",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 40,
    width: "100%",
    maxWidth: 200,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});