import React, { useEffect } from "react";
import { View, Text } from "react-native";
import PlacesList from "./PlacesList";

export default function NearMeScreen(props) {
  useEffect(() => {
    console.log("allala");
  }, []);

  return <PlacesList></PlacesList>;
}
