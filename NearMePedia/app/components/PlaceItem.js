import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PlacesContext } from "../context/PlacesContext";

export default function PlaceItem(props) {
  const { addPlaceToSavedPlaces } = useContext(PlacesContext);
  openWebView = () => {
    Linking.openURL("https://en.wikipedia.org/?curid=" + props.place.pageid);
  };

  return (
    <TouchableOpacity onPress={this.openWebView} style={styles.itemView}>
      <View style={styles.bigColumn}>
        <Text>{props.place.title}</Text>
        <Text style={{ marginTop: 10 }}>{props.place.dist} m.</Text>
      </View>
      <TouchableOpacity
        onPress={() => addPlaceToSavedPlaces(props.place)}
        style={styles.heartStyle}
      >
        <Ionicons
          name={props.place.isSaved ? "md-heart" : "md-heart-empty"}
          size={60}
          color={props.focused ? "red" : "darkred"}
        />
      </TouchableOpacity>
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
