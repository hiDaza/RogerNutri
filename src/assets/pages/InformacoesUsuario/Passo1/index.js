import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";

export default function InformacoesUsuarioPasso1({ navigation, route }) {
  const { dadosCadastro } = route.params || {};
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [errors, setErrors] = useState({});
  
  // Estados para os modais
  const [modalEstadoVisible, setModalEstadoVisible] = useState(false);
  const [modalObjetivoVisible, setModalObjetivoVisible] = useState(false);

  // Lista de estados brasileiros
  const estadosBrasileiros = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", 
    "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", 
    "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", 
    "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", 
    "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", 
    "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ];

  // Lista de objetivos
  const objetivos = [
    "Perder Peso",
    "Ganhar Peso", 
    "Manter Peso",
    "Dieta Fitness",
    "Melhorar Saúde",
    "Ganhar Massa Muscular",
    "Reduzir Percentual de Gordura"
  ];

  const validarTelefone = (telefone) => {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length >= 10;
  };

  const validarCampos = () => {
    const novosErros = {};

    if (!nomeCompleto.trim()) {
      novosErros.nomeCompleto = "Nome completo é obrigatório";
    }

    if (!telefone.trim()) {
      novosErros.telefone = "Telefone é obrigatório";
    } else if (!validarTelefone(telefone)) {
      novosErros.telefone = "Telefone inválido (mínimo 10 dígitos)";
    }

    if (!estado.trim()) {
      novosErros.estado = "Estado é obrigatório";
    }

    if (!objetivo.trim()) {
      novosErros.objetivo = "Objetivo é obrigatório";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleProximo = () => {
    if (validarCampos()) {
        navigation.navigate("InformacoesUsuarioPasso2", {
          dadosCadastro: {
            ...dadosCadastro,
            nomeCompleto,
            telefone,
            estado,
            objetivo
          }
        });
    }
  };

  const selecionarEstado = (estadoSelecionado) => {
    setEstado(estadoSelecionado);
    setModalEstadoVisible(false);
    if (errors.estado) setErrors({...errors, estado: null});
  };

  const selecionarObjetivo = (objetivoSelecionado) => {
    setObjetivo(objetivoSelecionado);
    setModalObjetivoVisible(false);
    if (errors.objetivo) setErrors({...errors, objetivo: null});
  };

  return (
    <View style={styles.container}>
      
      {/* Título e Subtítulo */}
      <Text style={styles.title}>Suas Informações</Text>
      <Text style={styles.subtitle}>Passo 1/4</Text>

      {/* Campo Nome Completo */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={[styles.input, errors.nomeCompleto && styles.inputError]}
        placeholder="Digite seu nome completo"
        value={nomeCompleto}
        onChangeText={(text) => {
          setNomeCompleto(text);
          if (errors.nomeCompleto) setErrors({...errors, nomeCompleto: null});
        }}
      />
      {errors.nomeCompleto && <Text style={styles.errorText}>{errors.nomeCompleto}</Text>}

      {/* Campo Telefone */}
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={[styles.input, errors.telefone && styles.inputError]}
        placeholder="Digite seu telefone"
        value={telefone}
        onChangeText={(text) => {
          setTelefone(text);
          if (errors.telefone) setErrors({...errors, telefone: null});
        }}
        keyboardType="phone-pad"
      />
      {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

      {/* Campo Estado - AGORA COM DROPDOWN */}
      <Text style={styles.label}>Qual seu Estado</Text>
      <TouchableOpacity 
        style={[styles.dropdown, errors.estado && styles.inputError]}
        onPress={() => setModalEstadoVisible(true)}
      >
        <Text style={estado ? styles.dropdownText : styles.dropdownPlaceholder}>
          {estado || "Selecione seu estado"}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {errors.estado && <Text style={styles.errorText}>{errors.estado}</Text>}

      {/* Campo Objetivo - AGORA COM DROPDOWN */}
      <Text style={styles.label}>Qual seu objetivo</Text>
      <TouchableOpacity 
        style={[styles.dropdown, errors.objetivo && styles.inputError]}
        onPress={() => setModalObjetivoVisible(true)}
      >
        <Text style={objetivo ? styles.dropdownText : styles.dropdownPlaceholder}>
          {objetivo || "Selecione seu objetivo"}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {errors.objetivo && <Text style={styles.errorText}>{errors.objetivo}</Text>}

      {/* Linha divisória */}
      <View style={styles.divider} />

      {/* Botão Próximo */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleProximo}
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

      {/* Modal para Seleção de Estado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEstadoVisible}
        onRequestClose={() => setModalEstadoVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalEstadoVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione seu estado</Text>
                <ScrollView style={styles.modalList}>
                  {estadosBrasileiros.map((estadoItem, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalItem}
                      onPress={() => selecionarEstado(estadoItem)}
                    >
                      <Text style={styles.modalItemText}>{estadoItem}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setModalEstadoVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal para Seleção de Objetivo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalObjetivoVisible}
        onRequestClose={() => setModalObjetivoVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalObjetivoVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione seu objetivo</Text>
                <ScrollView style={styles.modalList}>
                  {objetivos.map((objetivoItem, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalItem}
                      onPress={() => selecionarObjetivo(objetivoItem)}
                    >
                      <Text style={styles.modalItemText}>{objetivoItem}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setModalObjetivoVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Fechar</Text>
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
    marginBottom: 10,
    marginLeft: 5,
  },
  // Estilos para o dropdown
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: "#888",
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
  // Estilos para os modais
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "50%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
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
