import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "../../../components/elements";
import * as Location from "expo-location";

let camera: Camera;
export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
  };
  const __savePhoto = () => {};
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // const __takePicture = async () => {
  //   const photo: any = await camera.takePictureAsync()
  //   console.log(photo)
  //   setPreviewVisible(true)
  //   //setStartCamera(false)
  //   setCapturedImage(photo)
  // }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onCameraReady={() => {
          // Alert.alert("Are you taking an picture of dog?","Please don't take any other photos")
        }}
        type={type}
        ref={(r) => {
          camera = r;
        }}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <IconButton
              style={{}}
              color="white"
              icon="close"
              onPress={() => {}}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={__takePicture}>
            <View
              style={{
                width: 80,
                height: 80,
                borderColor: "#fff",
                borderWidth: 5,
                borderRadius: 120,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#ffcc02",
                  borderRadius: 120,
                }}
              ></View>
            </View>
          </TouchableOpacity>
          <View style={styles.button}>
            <IconButton
              style={{}}
              color="transparent"
              icon="flash"
              onPress={() => {}}
            />
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    margin: 10,
    marginBottom: 40,
  },
  button: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
