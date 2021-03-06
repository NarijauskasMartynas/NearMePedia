import React from "react";
import { View, StyleSheet } from "react-native";
import NearMeScreen from "../components/main/NearMeScreen";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

const NavigationIcon = props => (
  <Ionicons
    name={"md-navigate"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

export default class ScreenA extends React.Component {
  static navigationOptions = {
    tabBarIcon: NavigationIcon
  };

  render() {
    return (
      <View style={styles.container}>
        <NearMeScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  }
});
