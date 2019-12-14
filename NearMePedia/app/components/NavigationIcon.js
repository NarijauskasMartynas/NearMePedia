import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default NavigationIcon = props => (
  <Ionicons
    name={props.iconName}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);
