import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { PlacesContext } from "../context/PlacesContext";
import { Keyboard } from "react-native";

export default function AddNewLocationForm(props) {
  const [enteredAddress, setEnteredAddress] = useState();
  const { addlocationToLocationHistory } = useContext(PlacesContext);

  searchButtonPressed = () => {
    addlocationToLocationHistory(enteredAddress);
    Keyboard.dismiss();
    props.navigation.navigate("Two");
  };

  return (
    <View>
      <Text style={{ color: "#FFE4B5" }}>Enter address</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={text => setEnteredAddress(text)}
        placeholder={"Your address"}
      />
      <Button
        color="#FFE4B5"
        title="Find address"
        onPress={async () => searchButtonPressed()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    width: 300,
    borderColor: "#FFE4B5",
    borderWidth: 1
  }
});
