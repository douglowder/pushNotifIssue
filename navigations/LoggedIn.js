import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const LoggedIn = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" component={Home} />
    </Stack.Navigator>
  );
};

export default LoggedIn;
