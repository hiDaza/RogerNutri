import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@RogerNutri:users';
const CURRENT_USER_KEY = '@RogerNutri:currentUser';

export const AuthService = {
  // Registrar novo usuário
  async register(nome, email, senha) {
    try {
      // Buscar usuários existentes
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      // Verificar se email já existe
      const userExists = users.find(user => user.email === email);
      if (userExists) {
        return { success: false, message: 'Email já cadastrado' };
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        senha,
        createdAt: new Date().toISOString()
      };

      // Adicionar à lista
      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao realizar cadastro' };
    }
  },

  // Login
  async login(email, senha, lembrar = false) {
    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      // Buscar usuário
      const user = users.find(u => u.email === email && u.senha === senha);
      
      if (!user) {
        return { success: false, message: 'Email ou senha incorretos' };
      }

      // Salvar usuário atual se "lembrar"
      if (lembrar) {
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      }

      return { success: true, user, message: 'Login realizado com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao fazer login' };
    }
  },

  // Verificar se há usuário logado
  async getCurrentUser() {
    try {
      const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
};
