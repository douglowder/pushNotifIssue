import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigations/MainStack";
import { AppProvider } from "./context/AppContext";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar translucent={true} style="auto" />

      <AppProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </AppProvider>
    </>
  );
}
