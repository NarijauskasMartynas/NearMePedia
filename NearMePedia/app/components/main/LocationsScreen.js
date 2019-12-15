import React, { useContext, useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import LocationsList from "../LocationsList";
import { PlacesContext } from "../../context/PlacesContext";
import Constants from "expo-constants";
import AddNewLocationForm from "../AddNewLocationForm";

export default function LocationsScreen(props) {
  const { locationsHistory, getNearLocations } = useContext(PlacesContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  getLocationsAndNavigate = async () => {
    await getNearLocations();
    props.navigation.navigate("One");
  };

  return (
    <View style={styles.container}>
      {isModalVisible && <AddNewLocationForm navigation={props.navigation} />}
      <View style={{ width: "100%" }}>
        <Button
          color="#FFE4B5"
          title="Add new location"
          onPress={() => setIsModalVisible(!isModalVisible)}
        />
        <Button
          color="#FFE4B5"
          title="Use current location"
          onPress={async () => getLocationsAndNavigate()}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <LocationsList
          locations={locationsHistory}
          navigation={props.navigation}
        ></LocationsList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "sienna",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    paddingTop: Constants.statusBarHeight
  }
});
