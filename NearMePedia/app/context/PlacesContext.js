import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const PlacesContext = createContext();

const PlacesContextProvider = props => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [loading, setLoading] = useState(true);
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    getCoordinates();
    getNearLocations();
  }, []);

  addPlaceToSavedPlaces = place => {
    if (place.isSaved) {
      place.isSaved = false;
      setSavedPlaces(savedPlaces.filter(item => item.title !== place.title));
    } else {
      place.isSaved = true;
      setSavedPlaces([...savedPlaces, place]);
    }
  };

  saveNewCoordinates = coordinates => {
    console.log("set");
  };

  const getNearLocations = async () => {
    setLoading(true);
    let coordinates = await getCoordinates();
    var url = "https://en.wikipedia.org/w/api.php";
    let params = {
      action: "query",
      format: "json",
      list: "geosearch",
      gscoord: coordinates.latitude + "|" + coordinates.longitude,
      gsradius: "10000",
      gslimit: "10"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=" + params[key];
    });

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        setLoading(false);
        let modifiedArray = response.query.geosearch.map(x => {
          x.isSaved = false;
          return x;
        });
        setPlaces(modifiedArray);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getCoordinates = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission not granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    let coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    setCoordinates(coordinates);
    return coordinates;
  };

  return (
    <PlacesContext.Provider
      value={{
        places,
        loading,
        savedPlaces,
        addPlaceToSavedPlaces,
        setNewCoordinates
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
};

export default PlacesContextProvider;
