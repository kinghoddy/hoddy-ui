import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { ListItem } from "./List";
import TextField from "./TextField";

import * as Location from "expo-location";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { LocatorProps } from "../types";

import { getApiKey } from "../config/KeyManager";
import Typography from "./Typography";

setTimeout(() => {
  const { GOOGLE_MAP_API_KEY } = getApiKey();
  if (GOOGLE_MAP_API_KEY) Location.setGoogleApiKey(GOOGLE_MAP_API_KEY);
}, 500);

type predictionType = {
  id: string;
  description: string;
};
export const getPredictionsFromCoords = async (coords: any) => {
  const { GOOGLE_MAP_API_KEY } = getApiKey();

  if (!GOOGLE_MAP_API_KEY)
    console.error(
      "Google map api key needs to be set to use this component \nMake sure to run initialize() with a valid google map api key"
    );
  if (!coords) return [];
  const res = await (
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?radius=200&latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_MAP_API_KEY}`
    )
  ).json();

  const p = [];

  for (let key in res.results) {
    const { formatted_address: description, place_id } = res.results[key];
    p.push({
      description,
      id: place_id,
      latLng: { lst: coords.latitude, lng: coords.longitude },
    });
  }

  return p;
};

export const Locator: React.FC<LocatorProps> = ({
  variant = "contained",
  onLocationSelected,
  label,
  error,
  location = {
    description: null,
  },
  renderInput,
  gutterBottom = 0,
  helperText,
  float = true,
  country = "ng",
}) => {
  const { GOOGLE_MAP_API_KEY } = getApiKey();

  const [changed, setChanged] = useState(false);
  const [value, setValue] = useState("");
  const [prediction, setPrediction] = useState<predictionType[]>([]);
  const colors = useColors();
  const styles: any = ScaledSheet.create({
    list: {
      backgroundColor: colors.white[2],
      elevation: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: float ? 15 : 0,
      shadowOffset: {
        height: 10,
      },
      borderRadius: 10,
      marginBottom: 10,
      width: "100%",
      zIndex: 1000,
      marginTop: float ? 2 : "15@ms",
      top: float ? "100%" : undefined,
      position: float ? "absolute" : "relative",
    },
  });
  const search = async (query: string) => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&components=country:${country}&radius=20000&location=6.465422,3.406448&key=${GOOGLE_MAP_API_KEY}`;
    const res = await (await fetch(endpoint)).json();
    const p = [];
    for (let key in res.predictions) {
      const { description, place_id } = res.predictions[key];
      p.push({
        description,
        id: place_id,
      });
    }
    setPrediction(p);
  };

  const locateMe = () => {
    // Alert.alert(
    //   "Use my location",
    //   "Auto fill this input with my current location",
    //   [{ text: "Cancel" }, { text: "Use Location", onPress: () => getLoc() }]
    // );
    const getLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted")
        return Alert.alert(
          "Error",
          "Permission to access location was denied! "
        );
      try {
        let { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.High,
        });
        const p = await getPredictionsFromCoords(coords);
        setPrediction(p);
      } catch (err) {
        console.log(err);
        Alert.alert(
          "Can't access your location",
          "Make sure your location settings are turned on and you are connected to the internet. "
        );
      }
    };
    getLoc();
  };

  const clear = () => {
    setPrediction([]);
    setValue("");
    onLocationSelected(null);
    setChanged(false);
  };
  const locationPressed = async (loc: predictionType) => {
    setValue(loc.description);
    const res = await (
      await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${loc.id}&fields=formatted_address%2Cgeometry&key=${GOOGLE_MAP_API_KEY}`
      )
    ).json();
    onLocationSelected({
      latitude: res.result?.geometry.location.lat,
      longitude: res.result?.geometry.location.lng,
      description: loc.description,
    });
    setChanged(false);
    setPrediction([]);
  };

  useEffect(() => {
    if (!GOOGLE_MAP_API_KEY)
      console.error(
        "Google map api key needs to be set to use this component \nMake sure to run initialize() with a valid google map api key"
      );
  }, [GOOGLE_MAP_API_KEY]);

  return (
    <View style={{ zIndex: 100 }}>
      {renderInput ? (
        renderInput({
          onFocus: () => search(value),
          onBlur: () => setPrediction([]),
          value: changed ? value : location?.description || value,
          onChangeText: (val) => {
            setChanged(true);
            setValue(val);
            search(val);
          },
          clear,
          locateMe,
        })
      ) : (
        <TextField
          label={label}
          onChangeText={(val) => {
            setChanged(true);
            setValue(val);
            search(val);
          }}
          onBlur={() => {
            setPrediction([]);
          }}
          onFocus={() => {
            search(value);
          }}
          value={changed ? value : location?.description || value}
          gutterBottom={gutterBottom}
          error={error}
          helperText={helperText}
          variant={variant}
          end={
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={locateMe} style={{ marginRight: 10 }}>
                <Ionicons
                  color={colors.primary.main}
                  size={18}
                  name="location"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={clear}>
                <Ionicons color={colors.dark.main} size={18} name="close" />
              </TouchableOpacity>
            </View>
          }
        />
      )}

      {prediction.length > 0 && (
        <View style={styles.list}>
          {prediction.map(
            (cur, i) =>
              i < 5 && (
                <ListItem
                  divider={i < prediction.length - 1}
                  key={cur.id}
                  link
                  onPress={() => locationPressed(cur)}
                >
                  <Ionicons
                    name="location-outline"
                    style={{ marginRight: 10 }}
                    size={16}
                    color={colors.textSecondary.main}
                  />
                  <Typography style={{ flex: 1 }}>{cur.description}</Typography>
                </ListItem>
              )
          )}
        </View>
      )}
    </View>
  );
};
