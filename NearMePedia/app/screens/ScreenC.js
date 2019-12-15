import React from "react";
import { View, StyleSheet } from "react-native";
import SavedScreen from "../components/main/SavedScreen";
import Constants from "expo-constants";

import { Ionicons } from "@expo/vector-icons";

const NavigationIcon = props => (
  <Ionicons
    name={"md-save"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

export default class ScreenC extends React.Component {
  static navigationOptions = {
    tabBarIcon: NavigationIcon
  };

  render() {
    return (
      <View style={styles.container}>
        <SavedScreen name={"Saved"}></SavedScreen>
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
