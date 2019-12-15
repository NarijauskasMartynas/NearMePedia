import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export const PlacesContext = createContext();

const PlacesContextProvider = props => {
  const [places, setPlaces] = useState([]);
  const [locationsHistory, setLocationsHistory] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [loading, setLoading] = useState(true);
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    getCoordinates();
    getNearLocations();
  }, []);

  addlocationToLocationHistory = async enteredAddress => {
    setLoading(true);
    let result = await Location.geocodeAsync(enteredAddress);
    getAddressFromCoord(result[0]);
  };

  getAddressFromCoord = async location => {
    let addr = await Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude
    });

    if (addr[0].country !== undefined) {
      let locationToSave = {
        lat: location.latitude,
        lon: location.longitude,
        country: addr[0].country,
        city: addr[0].city,
        street: addr[0].street
      };

      var index = locationsHistory.findIndex(
        location =>
          location.country == locationToSave.country &&
          location.city == locationToSave.city &&
          location.street == locationToSave.street
      );

      if (index === -1) {
        setLocationsHistory([...locationsHistory, locationToSave]);
      }
      await getLocationsWithCoordinates(locationToSave);
    }
  };

  getLocationsWithCoordinates = async locationToSave => {
    await getNearLocations({
      latitude: locationToSave.lat,
      longitude: locationToSave.lon
    });
    setLoading(false);
  };

  addPlaceToSavedPlaces = place => {
    if (place.isSaved) {
      place.isSaved = false;
      setSavedPlaces(savedPlaces.filter(item => item.title !== place.title));
    } else {
      place.isSaved = true;
      setSavedPlaces([...savedPlaces, place]);
    }
  };

  getNearLocations = async coordinates => {
    setLoading(true);
    if (!coordinates) {
      coordinates = await getCoordinates();
      await getAddressFromCoord(coordinates);
    }
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
          let contains = false;
          savedPlaces.forEach(savedPlace => {
            if (x.lat == savedPlace.lat && x.lon == savedPlace.lon) {
              contains = true;
            }
          });

          x.isSaved = contains;
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
        locationsHistory,
        addPlaceToSavedPlaces,
        addlocationToLocationHistory,
        getLocationsWithCoordinates,
        getNearLocations
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
};

export default PlacesContextProvider;
