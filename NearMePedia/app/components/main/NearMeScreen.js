import React, { useContext } from "react";
import { View, Text } from "react-native";
import PlacesList from "../PlacesList";
import { PlacesContext } from "../../context/PlacesContext";

export default function NearMeScreen(props) {
  const { places, loading } = useContext(PlacesContext);

  return <PlacesList places={places} isLoading={loading}></PlacesList>;
}
