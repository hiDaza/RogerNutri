import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Onboarding1 from "../pages/Onboarding/Onboarding1";
import Onboarding2 from "../pages/Onboarding/Onboarding2";
import Onboarding3 from "../pages/Onboarding/Onboarding3";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import EsqueceuSenha from "../pages/EsqueceuSenha";
import Inicial from "../pages/Tela Inicial";
import Favoritos from "../pages/Favoritos";
import DetalhesAlimento from "../components/DetalhesAlimento";
import InformacoesUsuarioPasso1 from "../pages/InformacoesUsuario/Passo1";
import InformacoesUsuarioPasso2 from "../pages/InformacoesUsuario/Passo2";
import InformacoesUsuarioPasso3 from "../pages/InformacoesUsuario/Passo3"; 
import InformacoesUsuarioPasso4 from "../pages/InformacoesUsuario/Passo4";
import InformacoesUsuarioPasso5 from "../pages/InformacoesUsuario/Passo5";

import CadastroFinalizado from "../pages/CadastroFinalizado";
import Progresso from "../pages/Progresso";
import Perfil from "../pages/Perfil";
import AdicionarAlimento from '../pages/Progresso/AdicionarAlimento';
import Comunidade from "../pages/Comunidade";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
       
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
        <Stack.Screen name="InformacoesUsuarioPasso1" component={InformacoesUsuarioPasso1} />
        <Stack.Screen name="InformacoesUsuarioPasso2" component={InformacoesUsuarioPasso2} />
        <Stack.Screen name="InformacoesUsuarioPasso3" component={InformacoesUsuarioPasso3} />
        <Stack.Screen name="InformacoesUsuarioPasso4" component={InformacoesUsuarioPasso4} />
        <Stack.Screen name="InformacoesUsuarioPasso5" component={InformacoesUsuarioPasso5} />
        <Stack.Screen name="CadastroFinalizado" component={CadastroFinalizado} />
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Progresso" component={Progresso} />
         <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Comunidade" component={Comunidade} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="AdicionarAlimento" component={AdicionarAlimento} />
        <Stack.Screen
          name="DetalhesAlimento"
          component={DetalhesAlimento}
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
