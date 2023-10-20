import React, { useContext, useEffect } from "react";
import { AppNavigator } from "./app.navigation";
import { NavigationContainer } from "@react-navigation/native";

export const Navigator = () => {
	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	)
}
