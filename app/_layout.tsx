import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "../utils/context/AuthContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Comfortaa-L": require("../assets/fonts/Comfortaa-Light.ttf"),
    "Comfortaa-R": require("../assets/fonts/Comfortaa-Regular.ttf"),
    "Comfortaa-M": require("../assets/fonts/Comfortaa-Medium.ttf"),
    "Comfortaa-S": require("../assets/fonts/Comfortaa-SemiBold.ttf"),
    "Comfortaa-B": require("../assets/fonts/Comfortaa-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="adopt/[id]"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="notifications/index"
          options={{
            headerTitle: "notifications",
            headerShown: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="communities/[id]"
          options={{
            headerTitle: "",
            headerShown: true,
            headerStyle: {
              backgroundColor: "white",
            },
            headerShadowVisible: false,
            headerTintColor: "#ffcc02",
          }}
        />
        <Stack.Screen
          name="post/index"
          options={{
            headerTitle: "Add Post",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
            headerShadowVisible: false,
            headerTintColor: "#000000",
          }}
        />
        <Stack.Screen
          name="care-center/[id]"
          options={{
            headerTitle: "",
            headerShown: true,
            headerStyle: {
              backgroundColor: "white",
            },
            headerShadowVisible: false,
            headerTintColor: "#ffcc02",
          }}
        />

        <Stack.Screen
          name="help/index"
          options={{
            headerTitle: "rescues",
            headerShown: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="add/index"
          options={{
            headerTitle: "add and create",
            headerShown: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="add/adoption/index"
          options={{
            headerTitle: "add and create",
            headerShown: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="add/com/index"
          options={{
            headerTitle: "add and create",
            headerShown: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="help/map/index"
          options={{
            headerTitle: "select location",
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="help/camera/index"
          options={{
            headerShown: false,
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        />
        {/* <Stack.Screen
          name="rescue/index"
          options={{
            headerTitle: "rescues",
            headerTitleStyle: {
              fontFamily: "Comfortaa-B",
            },
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#ffcc02",
            },
            presentation: "modal",
          }}
        /> */}
      </Stack>
    </AuthProvider>
  );
}
