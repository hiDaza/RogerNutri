import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";

export default function InformacoesUsuarioPasso2({ navigation }) {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const calcularIMC = () => {
    if (altura && peso) {
      const alturaMetros = parseFloat(altura) / 100;
      const pesoNum = parseFloat(peso);
      const imcCalculado = pesoNum / (alturaMetros * alturaMetros);
      const imcFormatado = imcCalculado.toFixed(2);
      
      setImc(imcFormatado);
      
      // Determinar categoria
      if (imcCalculado < 18.5) {
        setCategoria("Abaixo");
        const pesoIdealMin = 18.5 * (alturaMetros * alturaMetros);
        setQuantidade((pesoIdealMin - pesoNum).toFixed(1) + " kg");
      } else if (imcCalculado < 25) {
        setCategoria("Normal");
        setQuantidade("0 kg");
      } else if (imcCalculado < 30) {
        setCategoria("Sobrepeso");
        const pesoIdealMax = 24.9 * (alturaMetros * alturaMetros);
        setQuantidade((pesoNum - pesoIdealMax).toFixed(1) + " kg");
      } else {
        setCategoria("Obesidade");
        const pesoIdealMax = 24.9 * (alturaMetros * alturaMetros);
        setQuantidade((pesoNum - pesoIdealMax).toFixed(1) + " kg");
      }
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Título */}
      <Text style={styles.title}>Cálculo do IMC</Text>

      {/* Tabela de informações */}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Sua Altura</Text>
          <TextInput
            style={styles.cellValue}
            placeholder="cm"
            value={altura}
            onChangeText={setAltura}
            keyboardType="numeric"
            onBlur={calcularIMC}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Seu Peso</Text>
          <TextInput
            style={styles.cellValue}
            placeholder="kg"
            value={peso}
            onChangeText={setPeso}
            keyboardType="numeric"
            onBlur={calcularIMC}
          />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.cellLabelBold}>Seu IMC</Text>
          <Text style={styles.cellValueBold}>
            {imc ? `${imc} (${categoria})` : "--"}
          </Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.cellLabelBold}>Quantidade {categoria === "Abaixo" ? "abaixo" : "acima"}</Text>
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
        onPress={() => {
          // Aqui você pode adicionar a lógica para criar a meta
          // e navegar para a próxima tela (ex: Tela Principal)
          // navigation.navigate("TelaPrincipal");
        }}
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
    marginBottom: 20,
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
    flex: 1,
  },
  cellValueBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
    flex: 1,
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
