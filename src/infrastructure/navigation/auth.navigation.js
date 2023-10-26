import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SigninScreen } from "../../features/auth/screen/signin.screen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen } from "../../features/auth/auth.screen";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};
