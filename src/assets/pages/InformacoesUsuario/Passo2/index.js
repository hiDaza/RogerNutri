import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";

export default function InformacoesUsuarioPasso2({ navigation, route }) {
  const { dadosCadastro } = route.params || {};
  const [alimentos, setAlimentos] = useState([]);
  const [alergias, setAlergias] = useState([]);
  
  const [modalAlimentosVisible, setModalAlimentosVisible] = useState(false);
  const [modalAlergiasVisible, setModalAlergiasVisible] = useState(false);

  const opcoesAlimentos = [
    "Frutas",
    "Legumes e Verduras",
    "Carnes (bovina, suína, frango)",
    "Peixes e Frutos do Mar",
    "Laticínios (leite, queijo, iogurte)",
    "Ovos",
    "Grãos e Cereais (arroz, trigo, aveia)",
    "Leguminosas (feijão, lentilha, grão-de-bico)",
    "Nozes e Sementes",
    "Alimentos Integrais",
    "Alimentos Processados",
    "Fast Food",
    "Doces e Sobremesas",
    "Alimentos Vegetarianos/Veganos"
  ];

  const opcoesAlergias = [
    "lactose",
    "gluten", 
    "frutose",
    "sacarose",
    "nozes",
    "fruto do mar",
    "não"
  ];

  const toggleAlimento = (alimento) => {
    setAlimentos(prev => {
      if (prev.includes(alimento)) {
        return prev.filter(item => item !== alimento);
      } else {
        return [...prev, alimento];
      }
    });
  };

  const toggleAlergia = (alergia) => {
    if (alergia === "não") {
      setAlergias(["não"]);
    } else {
      setAlergias(prev => {
        const filtered = prev.filter(item => item !== "não");
        if (filtered.includes(alergia)) {
          return filtered.filter(item => item !== alergia);
        } else {
          return [...filtered, alergia];
        }
      });
    }
  };

  const handleProximo = () => {
    const dadosParaPasso3 = {
      ...dadosCadastro,
      alimentos: alimentos.length > 0 ? alimentos : [],
      alergias: alergias.length > 0 ? alergias : ["não"]
    };
    
    navigation.navigate("InformacoesUsuarioPasso3", {
      dadosCadastro: dadosParaPasso3
    });
  };

  const formatarAlimentosSelecionados = () => {
    if (alimentos.length === 0) return "Selecione os alimentos que consome";
    if (alimentos.length <= 3) return alimentos.join(", ");
    return `${alimentos.slice(0, 3).join(", ")} +${alimentos.length - 3} mais`;
  };

  const formatarAlergiasSelecionadas = () => {
    if (alergias.length === 0) return "Selecione suas alergias";
    if (alergias.includes("não")) return "Nenhuma alergia";
    return alergias.join(", ");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferências Alimentares</Text>
      <Text style={styles.subtitle}>Passo 2/4</Text>

      <Text style={styles.label}>Quais tipos de alimentos você consome?</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setModalAlimentosVisible(true)}
      >
        <Text style={alimentos.length > 0 ? styles.dropdownText : styles.dropdownPlaceholder}>
          {formatarAlimentosSelecionados()}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Você possui alguma alergia alimentar?</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setModalAlergiasVisible(true)}
      >
        <Text style={alergias.length > 0 ? styles.dropdownText : styles.dropdownPlaceholder}>
          {formatarAlergiasSelecionadas()}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        💡 Estas informações nos ajudam a criar um plano alimentar personalizado.
      </Text>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.button} onPress={handleProximo}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Modal Alimentos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlimentosVisible}
        onRequestClose={() => setModalAlimentosVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalAlimentosVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione os alimentos que você consome</Text>
                <Text style={styles.modalSubtitle}>Pode selecionar várias opções</Text>
                <ScrollView style={styles.modalList}>
                  {opcoesAlimentos.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.modalItem, alimentos.includes(item) && styles.modalItemSelected]}
                      onPress={() => toggleAlimento(item)}
                    >
                      <Text style={[styles.modalItemText, alimentos.includes(item) && styles.modalItemTextSelected]}>
                        {item}
                      </Text>
                      {alimentos.includes(item) && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalAlimentosVisible(false)}>
                  <Text style={styles.modalCloseText}>Confirmar ({alimentos.length} selecionados)</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal Alergias */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlergiasVisible}
        onRequestClose={() => setModalAlergiasVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalAlergiasVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione suas alergias</Text>
                <Text style={styles.modalSubtitle}>Pode selecionar mais de uma opção</Text>
                <ScrollView style={styles.modalList}>
                  {opcoesAlergias.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.modalItem, alergias.includes(item) && styles.modalItemSelected]}
                      onPress={() => toggleAlergia(item)}
                    >
                      <Text style={[styles.modalItemText, alergias.includes(item) && styles.modalItemTextSelected]}>
                        {item}
                      </Text>
                      {alergias.includes(item) && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalAlergiasVisible(false)}>
                  <Text style={styles.modalCloseText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    fontStyle: "italic",
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: "#888",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    color: "#666",
  },
  modalList: {
    maxHeight: 400,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalItemSelected: {
    backgroundColor: "#FFF0DA",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  modalItemTextSelected: {
    color: "#FF9800",
    fontWeight: "600",
  },
  checkmark: {
    color: "#FF9800",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  modalCloseText: {
    fontSize: 16,
    color: "#FF9800",
    fontWeight: "600",
  },
});
