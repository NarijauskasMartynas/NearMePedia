import React from "react";
import { View, StyleSheet } from "react-native";
import HistoryScreen from "../components/HistoryScreen";
import Constants from "expo-constants";

import { Ionicons } from "@expo/vector-icons";

const NavigationIcon = props => (
  <Ionicons
    name={"md-bookmark"}
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
        <HistoryScreen name={"History"}></HistoryScreen>
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
