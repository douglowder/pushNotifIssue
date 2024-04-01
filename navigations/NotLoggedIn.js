import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/Landing";
import Signin from "../screens/Signin";

const NotLoggedIn = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" component={Landing} />
      <Stack.Screen name="signin" component={Signin} />
    </Stack.Navigator>
  );
};

export default NotLoggedIn;
