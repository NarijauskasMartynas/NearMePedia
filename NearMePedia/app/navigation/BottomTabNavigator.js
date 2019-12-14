import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ScreenA from "../screens/ScreenA";
import ScreenB from "../screens/ScreenB";
import ScreenC from "../screens/ScreenC";

const BottomTabNavigator = createBottomTabNavigator(
  {
    One: ScreenA,
    Two: ScreenB,
    Three: ScreenC
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default BottomTabNavigator;
