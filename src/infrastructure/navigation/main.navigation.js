import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../features/main/screen/home.screen";
import { CustomerNavigation } from "./customer.navigation";
// import { MapNavigator } from "./map.navigation";
// import { DetailsScreen } from "../../features/main/screen/details.screen";
// import { ProfileScreen } from "../../features/profile_picture_upload/screens/profile.screen";
import { CustomerContext } from "../service/customer/context/customer.context";
import styled from "styled-components/native";
import { MainScreen } from "../../features/main/screen/main.screen";
import { ServiceNavigation } from "./service.navigation";
import { OrderDetailsScreen } from "../../features/order_info/screens/order.details.screen";
import { ValetDetailsScreen } from "../../features/order_info/screens/valet.details.screen";
import { MapScreen } from "../../features/navigation_service/screen/map.screen";

const Stack = createStackNavigator();

const txt = styled.Text`
  color: red;
`;

export const MainNavigator = () => {
  // const { profile, loading } = useContext(CustomerContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={CustomerNavigation} />
        <Stack.Screen name="Service" component={ServiceNavigation} />
        <Stack.Screen name="Details" component={OrderDetailsScreen} />
        <Stack.Screen name="ValetDetails" component={ValetDetailsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </>
    </Stack.Navigator>
  );
};
