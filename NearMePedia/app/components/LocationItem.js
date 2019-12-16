import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { PlacesContext } from "../context/PlacesContext";

export default function LocationItem(props) {
  const { getLocationsWithCoordinates } = useContext(PlacesContext);
  showNearPlaces = location => {
    getLocationsWithCoordinates({
      lat: location.lat,
      lon: location.lon
    });
    props.navigation.navigate("Two");
  };

  return (
    <TouchableOpacity
      onPress={() => showNearPlaces(props.location)}
      style={styles.itemView}
    >
      <View style={styles.bigColumn}>
        <Text>
          {props.location.country +
            " " +
            props.location.city +
            " " +
            props.location.street}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    backgroundColor: "#FFE4B5",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 150,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  smallColumn: {
    flexDirection: "column",
    flex: 1
  },
  bigColumn: {
    flexDirection: "column",
    flex: 1
  }
});
