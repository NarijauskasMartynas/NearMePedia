import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";

import PlaceItem from "./PlaceItem";

export default function PlacesList(props) {
  if (props.isLoading) {
    contextToShow = <ActivityIndicator size="large" color="#FFE4B5" />;
  } else {
    contextToShow = props.places.map(place => (
      <PlaceItem key={place.pageid} place={place} />
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
