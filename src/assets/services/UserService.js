// services/UserService.js
// services/UserService.js - DEVE existir:
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = '@RogerNutri:userData';

export const UserService = {
  async saveUserData(userData) {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      console.log('UserService - Dados salvos:', userData);
      return true;
    } catch (error) {
      console.error('❌ UserService - Erro ao salvar:', error);
      return false;
    }
  },

  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('UserService - Erro ao buscar:', error);
      return null;
    }
  },

  async updateUserData(updatedFields) {
    try {
      const currentData = await this.getUserData();
      const newData = { ...currentData, ...updatedFields };
      await this.saveUserData(newData);
      return true;
    } catch (error) {
      console.error('UserService - Erro ao atualizar:', error);
      return false;
    }
  },
  
  // Limpar dados do usuário (logout)
  async clearUserData() {
    try {
      await AsyncStorage.removeItem(USER_DATA_KEY);
      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }
  }
};