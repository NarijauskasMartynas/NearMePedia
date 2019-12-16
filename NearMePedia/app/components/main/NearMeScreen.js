import React, { useContext, useEffect } from "react";
import PlacesList from "../PlacesList";
import { PlacesContext } from "../../context/PlacesContext";

export default function NearMeScreen(props) {
  const { places, loading, getNearLocations } = useContext(PlacesContext);

  useEffect(() => {
    getNearLocations();
  }, []);

  return <PlacesList places={places} isLoading={loading}></PlacesList>;
}
