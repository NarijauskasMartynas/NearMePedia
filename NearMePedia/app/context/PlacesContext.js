import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";

export const PlacesContext = createContext();

const PlacesContextProvider = props => {
  const [places, setPlaces] = useState([]);
  const [locationsHistory, setLocationsHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    checkStorage();
  }, []);

  addlocationToLocationHistory = async enteredAddress => {
    setLoading(true);
    let result = await Location.geocodeAsync(enteredAddress);
    if (result.length != 0) {
      getAddressFromCoord(result[0]);
    }
    setLoading(false);
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
        try {
          await AsyncStorage.setItem(
            "@LocationHistory",
            JSON.stringify([...locationsHistory, locationToSave])
          );
        } catch (e) {
          console.log(e);
        }
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

  addPlaceToSavedPlaces = async place => {
    if (place.isSaved) {
      place.isSaved = false;
      setSavedPlaces(savedPlaces.filter(item => item.title !== place.title));
    } else {
      place.isSaved = true;
      setSavedPlaces([...savedPlaces, place]);
    }
    try {
      if (place.isSaved) {
        await AsyncStorage.setItem(
          "@SavedPlaces",
          JSON.stringify([...savedPlaces, place])
        );
      } else {
        await AsyncStorage.setItem(
          "@SavedPlaces",
          JSON.stringify(savedPlaces.filter(item => item.title !== place.title))
        );
      }
    } catch (e) {}
  };

  getNearLocations = async coordinates => {
    setLoading(true);
    if (!coordinates) {
      coordinates = await getCoordinates();
      await getAddressFromCoord(coordinates);
    }
    setSavedPlacesDistance(coordinates);
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

    return coordinates;
  };

  distance = (lat1, lon1, lat2, lon2) => {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
  };

  setSavedPlacesDistance = coordinates => {
    savedPlaces.forEach(
      savedPlace =>
        (savedPlace.dist = distance(
          coordinates.latitude,
          coordinates.longitude,
          savedPlace.lat,
          savedPlace.lon
        ))
    );
    setSavedPlaces(savedPlaces);
  };

  checkStorage = async () => {
    try {
      const savedPlaces = await AsyncStorage.getItem("@SavedPlaces");
      if (savedPlaces !== null && savedPlaces.length != 0) {
        // We have data!!
        let parsedPlaces = JSON.parse(savedPlaces);
        setSavedPlaces(parsedPlaces);
      }
    } catch (error) {
      // Error retrieving data
    }

    try {
      const locationHistory = await AsyncStorage.getItem("@LocationHistory");
      if (locationHistory !== null && locationHistory.length != 0) {
        // We have data!!
        let parsedLocations = JSON.parse(locationHistory);
        setLocationsHistory(parsedLocations);
      }
    } catch (error) {
      // Error retrieving data
    }
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
