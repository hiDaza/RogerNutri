import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import BottomNavigation from "../../components/Botao/BottomNavigation";

export default function Perfil({ navigation, route }) {
  const [userData, setUserData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    estado: "",
    objetivo: "",
    peso: "",
    altura: "",
    movimentacao: "",
    genero: "",
    dataNascimento: "",
    pesoDesejado: "",
    duracao: ""
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingField, setEditingField] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  useEffect(() => {
    if (route.params) {
      console.log("Dados recebidos via route.params:", route.params);
      handleIncomingData(route.params);
    }
    loadUserData();
  }, [route.params]);

  const handleIncomingData = (data) => {
    if (data && (data.email || data.nome)) {
      console.log("Processando dados recebidos:", data);
      const formattedData = {
        nomeCompleto: data.nomeCompleto || data.nome || "",
        email: data.email || "",
        telefone: data.telefone || "",
        estado: data.estado || "",
        objetivo: data.objetivo || "",
        peso: data.peso ? data.peso.toString() : "",
        altura: data.altura ? data.altura.toString() : "",
        movimentacao: data.movimentacao || "",
        genero: data.genero || "",
        dataNascimento: data.dataNascimento || "",
        pesoDesejado: data.pesoDesejado ? data.pesoDesejado.toString() : "",
        duracao: data.duracao ? data.duracao.toString() : ""
      };
      setUserData(formattedData);
      saveToAsyncStorage(formattedData);
    }
  };

  const saveToAsyncStorage = async (data) => {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(data));
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      console.log("Dados salvos no AsyncStorage");
    } catch (error) {
      console.error("Erro ao salvar no AsyncStorage:", error);
    }
  };

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      console.log("Buscando dados do usuario...");

      const userDataString = await AsyncStorage.getItem('currentUser');
      if (userDataString) {
        console.log("Dados encontrados no AsyncStorage:", userDataString);
        const userDataFromStorage = JSON.parse(userDataString);
        handleIncomingData(userDataFromStorage);
        return;
      }

      const allKeys = await AsyncStorage.getAllKeys();
      console.log("Todas as chaves:", allKeys);
      
      for (const key of allKeys) {
        if (key.toLowerCase().includes('user') || key.toLowerCase().includes('cadastro')) {
          const data = await AsyncStorage.getItem(key);
          if (data) {
            try {
              const parsedData = JSON.parse(data);
              if (parsedData && (parsedData.email || parsedData.nome)) {
                console.log("Dados encontrados na chave " + key + ":", parsedData);
                handleIncomingData(parsedData);
                return;
              }
            } catch (e) {
              // Ignora erro de parse
            }
          }
        }
      }

      console.log("Nenhum dado de usuario encontrado");
      
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (field, value) => {
    setEditingField(field);
    setTempValue(value);
    setEditModalVisible(true);
  };

  const saveEdit = async () => {
    const updatedUserData = {
      ...userData,
      [editingField]: tempValue
    };
    
    setUserData(updatedUserData);
    setEditModalVisible(false);

    try {
      await saveToAsyncStorage(updatedUserData);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      Alert.alert("Erro", "Nao foi possivel salvar as alteracoes.");
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      nomeCompleto: "Nome Completo",
      email: "Email",
      telefone: "Telefone",
      estado: "Estado",
      objetivo: "Objetivo",
      peso: "Peso (Kg)",
      altura: "Altura (cm)",
      movimentacao: "Movimentacao",
      genero: "Genero",
      dataNascimento: "Data de Nascimento",
      pesoDesejado: "Peso Desejado (Kg)",
      duracao: "Duracao (dias)"
    };
    return labels[field] || field;
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9800" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image 
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Text style={styles.cameraIcon}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.nomeCompleto || "Usuario"}</Text>
          <Text style={styles.userEmail}>{userData.email || "email@exemplo.com"}</Text>
        </View>

        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("nomeCompleto", userData.nomeCompleto)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <Text style={styles.infoValue}>{userData.nomeCompleto || "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("email", userData.email)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{userData.email || "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("telefone", userData.telefone)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{userData.telefone || "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("peso", userData.peso)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Peso:</Text>
              <Text style={styles.infoValue}>{userData.peso ? `${userData.peso} Kg` : "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("altura", userData.altura)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Altura:</Text>
              <Text style={styles.infoValue}>{userData.altura ? `${userData.altura} cm` : "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("pesoDesejado", userData.pesoDesejado)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Peso Desejado:</Text>
              <Text style={styles.infoValue}>{userData.pesoDesejado ? `${userData.pesoDesejado} Kg` : "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("estado", userData.estado)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Estado:</Text>
              <Text style={styles.infoValue}>{userData.estado || "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => openEditModal("objetivo", userData.objetivo)}
          >
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Objetivo:</Text>
              <Text style={styles.infoValue}>{userData.objetivo || "Nao definido"}</Text>
            </View>
            <View style={styles.editButton}>
              <Text style={styles.editButtonIcon}>Editar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Editar {getFieldLabel(editingField)}
            </Text>
            
            <TextInput
              style={styles.textInput}
              value={tempValue}
              onChangeText={setTempValue}
              autoFocus={true}
              placeholder={`Digite ${getFieldLabel(editingField).toLowerCase()}`}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveEdit}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNavigation navigation={navigation} activeScreen="Perfil" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF9800",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  placeholder: {
    width: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  profileImageWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF5E6",
  },
  cameraButton: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "#FF9800",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  cameraIcon: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  infoCard: {
    backgroundColor: "#FFF5E6",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FFD699",
  },
  infoContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    textAlign: "right",
    marginRight: 15,
  },
  editButton: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  editButtonIcon: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FF9800",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#FF9800",
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});