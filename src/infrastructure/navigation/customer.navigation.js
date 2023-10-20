import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CustomerCarInfoScreen } from '../../features/customer/screens/customer.carinfo.screen'
import { CustomerScreen } from '../../features/customer/screens/customer.screen'

const Stack = createStackNavigator()

export const CustomerNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="CustomerProfile" component={CustomerScreen} />
      <Stack.Screen name="CustomerCarInfoScreen" component={CustomerCarInfoScreen} />
    </Stack.Navigator>
  )
}
