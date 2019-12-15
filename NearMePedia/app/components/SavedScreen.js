import React, { useContext } from "react";
import { View, Text } from "react-native";
import PlacesList from "./PlacesList";
import { PlacesContext } from "../context/PlacesContext";

export default function SavedScreen(props) {
  const { savedPlaces, loading } = useContext(PlacesContext);

  return <PlacesList places={savedPlaces} isLoading={loading}></PlacesList>;
}
