import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { EButton, ELink, EText } from "../../components/elements";
import { useGlobalSearchParams, useRouter, useSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Spacer } from "../../components/LitteViews";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useAuth } from "../../utils/context/AuthContext";
import { SITE_URL } from "../../utils/constant";
import useRescues from "../../utils/fetches/rescues";

export default function Rescue() {
  const { lat, lon } = useGlobalSearchParams();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { authState } = useAuth();
  const router = useRouter();
  const { rescueADog } = useRescues();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "#ffcc02",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffcc02",
          flex: 1,
          padding: 16,
          height: "100%",
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: "#000",
            borderRadius: 20,
            padding: 5,
            justifyContent: "center",
          }}
        >
          <ELink href="/help/map" title="select on map" />
          {lat != null && lon != null && (
            <View style={{ padding: 20 }}>
              <EText title={`Latitude: ${lat}`} />
              <EText title={`Longitude: ${lon}`} />
              <Spacer />
              <MapView
                pointerEvents="none"
                region={{
                  latitude: Number(lat),
                  longitude: Number(lon),
                  latitudeDelta: 0.12,
                  longitudeDelta: 0.56,
                }}
                tintColor="orange"
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 20,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: Number(lat),
                    longitude: Number(lon),
                  }}
                  title={"rescue here"}
                  pinColor="#ffcc02"
                  description={"hold and drag to point"}
                />
              </MapView>
            </View>
          )}
        </View>
        <Spacer />
        <View
          style={{
            borderWidth: 2,
            borderColor: "#000",
            borderRadius: 20,
            padding: 5,
            justifyContent: "center",
          }}
        >
          <Button
            title="Pick an image from camera roll"
            color={"#fff"}
            onPress={pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: 20 }}
            />
          )}
        </View>
        <Spacer gap={40} />
        <EText title="Description" />
        <Spacer />
        <TextInput
          placeholder="give a sweet description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          autoCapitalize="none"
          style={{
            width: "100%",
            padding: 16,
            fontSize: 16,
            marginBottom: 16,
            backgroundColor: "#D1B002",
            borderRadius: 20,
          }}
        />
        <EButton
          pv={20}
          title="Rescue"
          onPress={() => {
            rescueADog({
              image: image,
              lat: Number(lat),
              lon: Number(lon),
              description: description,
              callback: () => {
                Alert.alert("Rescued!", "Your rescue request has been sent!");
                router.push("/");
              },
            });
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
