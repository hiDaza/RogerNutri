import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function InformacoesUsuarioPasso2({ navigation, route }) {
  const { dadosCadastro } = route.params || {};
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [movimentacao, setMovimentacao] = useState("");
  const [genero, setGenero] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Estados para os modais
  const [modalMovimentacaoVisible, setModalMovimentacaoVisible] = useState(false);
  const [modalGeneroVisible, setModalGeneroVisible] = useState(false);

  // Opções para movimentação semanal
  const opcoesMovimentacao = [
    "Sedentário (pouco ou nenhum exercício)",
    "Levemente ativo (exercício leve 1-3 dias/semana)",
    "Moderadamente ativo (exercício moderado 3-5 dias/semana)",
    "Muito ativo (exercício intenso 6-7 dias/semana)",
    "Extremamente ativo (exercício muito intenso, trabalho físico)"
  ];

  // Opções para gênero
  const opcoesGenero = [
    "Masculino",
    "Feminino",
    "Prefiro não informar"
  ];

  // Função para formatar a data no formato DD/MM/AAAA
  const formatarData = (data) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função chamada quando a data é selecionada
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setDataNascimento(selectedDate);
      if (errors.dataNascimento) setErrors({...errors, dataNascimento: null});
    }
  };

  const validarCampos = () => {
    const novosErros = {};

    if (!peso.trim()) {
      novosErros.peso = "Peso é obrigatório";
    } else if (isNaN(peso) || parseFloat(peso) <= 0) {
      novosErros.peso = "Peso deve ser um número válido";
    }

    if (!altura.trim()) {
      novosErros.altura = "Altura é obrigatória";
    } else if (isNaN(altura) || parseFloat(altura) <= 0) {
      novosErros.altura = "Altura deve ser um número válido";
    }

    if (!movimentacao.trim()) {
      novosErros.movimentacao = "Movimentação semanal é obrigatória";
    }

    if (!genero.trim()) {
      novosErros.genero = "Gênero é obrigatório";
    }

    if (!dataNascimento) {
      novosErros.dataNascimento = "Data de nascimento é obrigatória";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleProximo = () => {
    if (validarCampos()) {
      // Navega para a tela do IMC passando os dados
      navigation.navigate("InformacoesUsuarioPasso3", {
        dadosCadastro: {
          ...dadosCadastro,
          peso: parseFloat(peso),
          altura: parseFloat(altura),
          movimentacao,
          genero,
          dataNascimento: formatarData(dataNascimento)
        }
      });
    }
  };

  const selecionarMovimentacao = (movimentacaoSelecionada) => {
    setMovimentacao(movimentacaoSelecionada);
    setModalMovimentacaoVisible(false);
    if (errors.movimentacao) setErrors({...errors, movimentacao: null});
  };

  const selecionarGenero = (generoSelecionado) => {
    setGenero(generoSelecionado);
    setModalGeneroVisible(false);
    if (errors.genero) setErrors({...errors, genero: null});
  };

  return (
    <View style={styles.container}>
      
      {/* Título e Subtítulo */}
      <Text style={styles.title}>Suas Informações</Text>
      <Text style={styles.subtitle}>Passo 2/2</Text>

      {/* Campo Peso */}
      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={[styles.input, errors.peso && styles.inputError]}
        placeholder="Digite seu peso"
        value={peso}
        onChangeText={(text) => {
          setPeso(text);
          if (errors.peso) setErrors({...errors, peso: null});
        }}
        keyboardType="numeric"
      />
      {errors.peso && <Text style={styles.errorText}>{errors.peso}</Text>}

      {/* Campo Altura */}
      <Text style={styles.label}>Altura (cm)</Text>
      <TextInput
        style={[styles.input, errors.altura && styles.inputError]}
        placeholder="Digite sua altura"
        value={altura}
        onChangeText={(text) => {
          setAltura(text);
          if (errors.altura) setErrors({...errors, altura: null});
        }}
        keyboardType="numeric"
      />
      {errors.altura && <Text style={styles.errorText}>{errors.altura}</Text>}

      {/* Campo Movimentação Semanal */}
      <Text style={styles.label}>Movimentação Semanal</Text>
      <TouchableOpacity 
        style={[styles.dropdown, errors.movimentacao && styles.inputError]}
        onPress={() => setModalMovimentacaoVisible(true)}
      >
        <Text style={movimentacao ? styles.dropdownText : styles.dropdownPlaceholder}>
          {movimentacao || "Selecione sua movimentação"}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {errors.movimentacao && <Text style={styles.errorText}>{errors.movimentacao}</Text>}

      {/* Campo Gênero */}
      <Text style={styles.label}>Gênero</Text>
      <TouchableOpacity 
        style={[styles.dropdown, errors.genero && styles.inputError]}
        onPress={() => setModalGeneroVisible(true)}
      >
        <Text style={genero ? styles.dropdownText : styles.dropdownPlaceholder}>
          {genero || "Selecione seu gênero"}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {errors.genero && <Text style={styles.errorText}>{errors.genero}</Text>}

      {/* Campo Data de Nascimento */}
      <Text style={styles.label}>Data de Nascimento</Text>
      <TouchableOpacity 
        style={[styles.dropdown, errors.dataNascimento && styles.inputError]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dropdownText}>
          {formatarData(dataNascimento)}
        </Text>
        {/* <Text style={styles.dropdownArrow}>📅</Text> */}
      </TouchableOpacity>
      {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento}</Text>}

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={dataNascimento}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          maximumDate={new Date()}
          locale="pt-BR"
        />
      )}

      {/* iOS: Botão para fechar o date picker */}
      {showDatePicker && Platform.OS === 'ios' && (
        <TouchableOpacity 
          style={styles.closeDatePickerButton}
          onPress={() => setShowDatePicker(false)}
        >
          <Text style={styles.closeDatePickerText}>Confirmar</Text>
        </TouchableOpacity>
      )}

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

      {/* Modal para Movimentação Semanal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMovimentacaoVisible}
        onRequestClose={() => setModalMovimentacaoVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalMovimentacaoVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione sua movimentação</Text>
                <ScrollView style={styles.modalList}>
                  {opcoesMovimentacao.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalItem}
                      onPress={() => selecionarMovimentacao(item)}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setModalMovimentacaoVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal para Gênero */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalGeneroVisible}
        onRequestClose={() => setModalGeneroVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalGeneroVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione seu gênero</Text>
                <ScrollView style={styles.modalList}>
                  {opcoesGenero.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalItem}
                      onPress={() => selecionarGenero(item)}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setModalGeneroVisible(false)}
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
  closeDatePickerButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  closeDatePickerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
