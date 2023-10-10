import React, { RefObject, createRef, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { EButton, EText, IconText } from "../../../components/elements";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

interface ICoordinate {
  coordinate: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
}
export default function App() {
  const [markerCoordinate, setMarkerCoordinate] = useState<ICoordinate>(null);
  const router = useRouter();
  const mapRef: RefObject<MapView> = createRef();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setMarkerCoordinate({
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    })();
  }, []);

  let text = "Waiting..";
  if (markerCoordinate != null)
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude:
              markerCoordinate != null
                ? markerCoordinate.coordinate.latitude
                : 1,
            longitude:
              markerCoordinate != null
                ? markerCoordinate.coordinate.longitude
                : 1,
            latitudeDelta:
              markerCoordinate != null
                ? markerCoordinate.coordinate.latitudeDelta
                : 1,
            longitudeDelta:
              markerCoordinate != null
                ? markerCoordinate.coordinate.longitudeDelta
                : 1,
          }}
          style={styles.map}
          pitchEnabled
          tintColor="orange"
          showsUserLocation
        >
          <Marker
            coordinate={{
              latitude:
                markerCoordinate != null
                  ? markerCoordinate.coordinate.latitude
                  : 1,
              longitude:
                markerCoordinate != null
                  ? markerCoordinate.coordinate.longitude
                  : 1,
            }}
            title={"rescue here"}
            pinColor="#ffcc02"
            description={"hold and drag to point"}
            draggable
            onDragEnd={(event) => {
              setMarkerCoordinate({
                coordinate: event.nativeEvent.coordinate,
              });
            }}
          />
        </MapView>
        <SafeAreaView>
          <View
            style={{
              position: "absolute",
              bottom: 60,
              left: 20,
              right: 20,
            }}
          >
            <EButton
              color="black"
              bg="#ffcc02"
              pv={20}
              title="Set location"
              onPress={() => {
                if (markerCoordinate == null) alert(text);
                else {
                  alert(markerCoordinate.coordinate.latitude);
                  // alert(markerCoordinate.coordinate.longitude)
                  router.push({
                    pathname: "/help",
                    params: {
                      lat: markerCoordinate.coordinate.latitude,
                      lon: markerCoordinate.coordinate.longitude,
                    },
                  });
                }
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  else
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffcc02",
        }}
      >
        <EText title="Loading Maps..." />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
