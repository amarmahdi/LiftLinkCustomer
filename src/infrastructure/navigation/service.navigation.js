import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoryScreen } from "../../features/create_order/screens/category.screen";
import { DealershipScreen } from "../../features/create_order/screens/dealership.screen";
import { ServiceDetailsScreen } from "../../features/create_order/screens/service.details.screen";

const Stack = createStackNavigator();

export const ServiceNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Dealership" component={DealershipScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailsScreen} />
    </Stack.Navigator>
  );
}
