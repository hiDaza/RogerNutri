import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function CadastroFinalizado({ navigation, route }) {
  const { 
    pesoAtual, 
    pesoDesejado, 
    duracao,
    genero,
    dataNascimento,
    altura,
    movimentacao
  } = route.params;

  // Função para calcular idade a partir da data de nascimento
  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento.split('/').reverse().join('-'));
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  // Função para calcular a Taxa Metabólica Basal (TMB)
  const calcularTMB = (peso, altura, idade, genero) => {
    if (genero === "Masculino") {
      return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
      return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }
  };

  // Função para obter o fator de atividade
  const obterFatorAtividade = (movimentacao) => {
    switch(movimentacao) {
      case "Sedentário (pouco ou nenhum exercício)":
        return 1.2;
      case "Levemente ativo (exercício leve 1-3 dias/semana)":
        return 1.375;
      case "Moderadamente ativo (exercício moderado 3-5 dias/semana)":
        return 1.55;
      case "Muito ativo (exercício intenso 6-7 dias/semana)":
        return 1.725;
      case "Extremamente ativo (exercício muito intenso, trabalho físico)":
        return 1.9;
      default:
        return 1.2;
    }
  };

  // Cálculo das calorias diárias necessárias
  const calcularCaloriasDiarias = () => {
    const idade = calcularIdade(dataNascimento);
    const tmb = calcularTMB(pesoAtual, altura, idade, genero);
    const fatorAtividade = obterFatorAtividade(movimentacao);
    
    // Gasto calórico diário (manutenção)
    const gastoCaloricoDiario = tmb * fatorAtividade;
    
    // Diferença de peso (pode ser positiva para ganho ou negativa para perda)
    const diferencaPeso = pesoDesejado - pesoAtual;
    
    // Cálculo do déficit/superávit calórico necessário
    // 7700 kcal ≈ 1 kg de gordura corporal
    const caloriasTotaisNecessarias = diferencaPeso * 7700;
    const caloriasDiariasAdicionais = caloriasTotaisNecessarias / duracao;
    
    // Calorias diárias totais
    const caloriasDiariasTotais = gastoCaloricoDiario + caloriasDiariasAdicionais;
    
    return Math.round(caloriasDiariasTotais);
  };

  const caloriasDiarias = calcularCaloriasDiarias();

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

      {/* Botão para ir para a tela principal */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          // Aqui você pode navegar para a tela principal do app
          // navigation.navigate("MainApp");
          console.log("Ir para a tela principal");
        }}
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
