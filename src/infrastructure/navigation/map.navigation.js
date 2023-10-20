import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen } from "../../features/navigation_service/screen/map.screen";

const Stack = createStackNavigator();

export const MapNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}
