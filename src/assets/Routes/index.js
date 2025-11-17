import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding1 from "../pages/Onboarding/Onboarding1";
import Onboarding2 from "../pages/Onboarding/Onboarding2";
import Onboarding3 from "../pages/Onboarding/Onboarding3";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import EsqueceuSenha from "../pages/EsqueceuSenha";
import InformacoesUsuarioPasso1 from "../pages/InformacoesUsuario/Passo1";
import InformacoesUsuarioPasso2 from "../pages/InformacoesUsuario/Passo2";


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}