import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SigninScreen } from "../../features/signin/screen/signin.screen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export const SigninNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Signin" component={SigninScreen} />
		</Stack.Navigator>
	);
}