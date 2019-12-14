import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from "react-native";

export default function PlaceItem(props) {
  openWebView = () => {
    Linking.openURL("https://en.wikipedia.org/?curid=" + props.place.pageid);
  };
  console.log(props.place);
  return (
    <TouchableOpacity onPress={this.openWebView} style={styles.itemView}>
      <View>
        <Text>{props.place.title}</Text>
        <Text>{props.place.dist} meters</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    backgroundColor: "green",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    marginTop: 5,
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
  }
});
