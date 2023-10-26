import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomerScreen } from "../../features/customer/customer.screen";
import { MainNavigator } from "./main.navigation";

const Stack = createStackNavigator();

export const CustomerNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerProfile" component={CustomerScreen} />
      <Stack.Screen name="MainNavigation" component={MainNavigator} />
    </Stack.Navigator>
  );
};
