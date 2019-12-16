import React from "react";
import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";

import LocationItem from "./LocationItem";

export default function PlacesList(props) {
  if (props.isLoading) {
    contextToShow = <ActivityIndicator size="large" color="#FFE4B5" />;
  } else {
    contextToShow = props.locations.map(location => (
      <LocationItem
        navigation={props.navigation}
        key={location.country + " " + location.street + " " + location.lat}
        location={location}
      />
    ));
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"
      }}
      style={styles.scrollView}
    >
      {contextToShow}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "sienna",
    width: "100%"
  }
});
