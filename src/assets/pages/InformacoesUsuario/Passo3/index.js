import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function InformacoesUsuarioPasso3({ navigation, route }) {
  const { peso, altura } = route.params;
  
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [pesoIdealMin, setPesoIdealMin] = useState(0);
  const [pesoIdealMax, setPesoIdealMax] = useState(0);

  useEffect(() => {
    if (peso && altura) {
      calcularIMC();
    }
  }, []);

  const calcularIMC = () => {
    const alturaMetros = altura / 100;
    const imcCalculado = peso / (alturaMetros * alturaMetros);
    const imcFormatado = imcCalculado.toFixed(2);
    
    setImc(imcFormatado);
    
    // Calcular peso ideal (IMC entre 18.5 e 24.9)
    const pesoIdealMinCalc = 18.5 * (alturaMetros * alturaMetros);
    const pesoIdealMaxCalc = 24.9 * (alturaMetros * alturaMetros);
    
    setPesoIdealMin(pesoIdealMinCalc);
    setPesoIdealMax(pesoIdealMaxCalc);
    
    // Determinar categoria
    if (imcCalculado < 18.5) {
      setCategoria("Abaixo");
      const diferenca = pesoIdealMinCalc - peso;
      setQuantidade(diferenca.toFixed(1) + " kg");
    } else if (imcCalculado < 25) {
      setCategoria("Normal");
      setQuantidade("0 kg");
    } else if (imcCalculado < 30) {
      setCategoria("Sobrepeso");
      const diferenca = peso - pesoIdealMaxCalc;
      setQuantidade(diferenca.toFixed(1) + " kg");
    } else {
      setCategoria("Obesidade");
      const diferenca = peso - pesoIdealMaxCalc;
      setQuantidade(diferenca.toFixed(1) + " kg");
    }
  };

  const navegarParaPasso4 = () => {
    navigation.navigate("InformacoesUsuarioPasso4", {
      pesoAtual: peso,
      altura: altura,
      imc: parseFloat(imc),
      categoria: categoria,
      pesoIdealMin: pesoIdealMin,
      pesoIdealMax: pesoIdealMax,
      quantidade: quantidade
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Título */}
      <Text style={styles.title}>Cálculo do IMC</Text>

      {/* Tabela de informações */}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Sua Altura</Text>
          <Text style={styles.cellValue}>{altura} cm</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Seu Peso</Text>
          <Text style={styles.cellValue}>{peso} kg</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.cellLabelBold}>Seu IMC</Text>
          <Text style={styles.cellValueBold}>
            {imc ? `${imc} (${categoria})` : "Calculando..."}
          </Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.cellLabelBold}>
            Quantidade {categoria === "Abaixo" ? "abaixo" : categoria === "Normal" ? "" : "acima"}
          </Text>
          <Text style={styles.cellValueBold}>
            {quantidade || "--"}
          </Text>
        </View>
      </View>

      {/* Linha divisória */}
      <View style={styles.divider} />

      {/* Botão Criar Meta */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={navegarParaPasso4}
      >
        <Text style={styles.primaryButtonText}>Criar Meta</Text>
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
    marginBottom: 30,
    color: "#333",
  },
  table: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  inputContainer: {
    flex: 1,
  },
  cellLabel: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  cellLabelBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  cellValue: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cellValueBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
    flex: 1,
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
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