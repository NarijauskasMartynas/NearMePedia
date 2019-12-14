import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const PlacesContext = createContext();

const PlacesContextProvider = props => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    getCoordinates();
    getNearLocations();
  }, []);

  const getNearLocations = async () => {
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
        setPlaces(response.query.geosearch);
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

  function distance(lat1, lon1, lat2, lon2) {
    console.log(lat1, lat2, lon1, lon2);
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    console.log("ats: " + a);
    return 12742 * Math.asin(Math.sqrt(a));
  }

  return (
    <PlacesContext.Provider value={{ places }}>
      {props.children}
    </PlacesContext.Provider>
  );
};

export default PlacesContextProvider;
