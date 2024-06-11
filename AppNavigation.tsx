import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
const NativeStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen name="HomeScreen" component={HomeScreen} />
        <NativeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
