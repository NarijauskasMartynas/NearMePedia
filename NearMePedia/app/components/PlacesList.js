import React, { useContext } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { PlacesContext } from "../context/PlacesContext";
import PlaceItem from "./PlaceItem";

export default function PlacesList() {
  const { places } = useContext(PlacesContext);
  //console.log(places);
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
      style={styles.scrollView}
    >
      {places.map(place => (
        <PlaceItem key={place.pageid} place={place} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "red",
    width: "100%"
  }
});
