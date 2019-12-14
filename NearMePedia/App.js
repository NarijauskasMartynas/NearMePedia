import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator";
import PlacesContextProvider from "./app/context/PlacesContext";
import Constants from "expo-constants";

export default function App() {
  return (
    <PlacesContextProvider>
      <AppNavigator style={styles.container}></AppNavigator>
    </PlacesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  }
});
