import { View, Text, Alert, Image } from "react-native";
import React from "react";
import { Link, Tabs, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useAuth } from "../../utils/context/AuthContext";
import { EButton } from "../../components/elements";
import Icon from "react-native-remix-icon";

const Layout = () => {
  const { authState, onLogout } = useAuth();
  const router = useRouter();
  return (
    <Tabs
      initialRouteName={authState.type === "org" ? "account" : "index"}
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#FFF8EA",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: "Comfortaa-R",
        },

        tabBarIconStyle: {
          backgroundColor: "red",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
        options={{
          headerTitle: "eddah",
          title: "home",
          headerTitleAlign: "left",
          tabBarLabelStyle: {
            fontFamily: "Comfortaa-B",
          },
          headerTitleStyle: {
            fontFamily: "Comfortaa-B",
            letterSpacing: 3,
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#ffcc02",
          },
          headerRight: () =>
            authState?.authenticated && (
              <Link
                href={"/notifications"}
                style={{
                  marginRight: 20,
                }}
              >
                <Icon name="notification-3-fill" size="18" color="black" />
                {/* <View style={{
                backgroundColor:"red",
                borderRadius:20,
                width:8,
                height:8
              }}>
              </View> */}
              </Link>
            ),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#ffcc02" : "#FFF8EA",
                width: "50%",
                alignItems: "center",
                borderRadius: 40,
                paddingVertical: 4,
              }}
            >
              <Icon name="home-line" size="18" color="black" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="communities"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            if (!authState.authenticated || authState.type == "org") {
              e.preventDefault();
              Alert.alert("not authorized", "please login to view the content");
            }
          },
        }}
        options={{
          headerTitleStyle: {
            fontFamily: "Comfortaa-B",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#ffcc02" : "#FFF8EA",
                width: "50%",
                alignItems: "center",
                borderRadius: 40,
                paddingVertical: 4,
              }}
            >
              <Icon name="team-line" size="18" color="black" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="rescues"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            e.preventDefault();
            authState?.authenticated
              ? authState.type == "user"
                ? router.push("/help")
                : router.push("/add")
              : alert("login to rescue");
          },
        }}
        options={{
          headerTitle: "rescue",
          headerTitleStyle: {
            fontFamily: "Comfortaa-B",
          },
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: "#ffcc02",
                top: -10,
                width: 60,
                justifyContent: "center",
                height: 60,
                alignItems: "center",
                borderRadius: 40,
                padding: 8,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 4,
                shadowOpacity: 0.2,
              }}
            >
              <Image
                source={require("../../assets/icon.png")}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 40,
                }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="adopt"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
        options={{
          headerTitleStyle: {
            fontFamily: "Comfortaa-B",
          },
          tabBarLabel:
            authState.token && authState.type == "org" ? "rescue" : "adopt",
          title:
            authState.token && authState.type == "org" ? "rescue" : "adopt",
          headerRight: () =>
            authState.token &&
            authState.type == "user" && (
              <EButton
                color={"red"}
                bg="white"
                onPress={() => {
                  router.push("/rescue");
                }}
                title="rescue"
              />
            ),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#ffcc02" : "#FFF8EA",
                width: "50%",
                alignItems: "center",
                borderRadius: 40,
                paddingVertical: 4,
              }}
            >
              <Icon name="service-line" size="18" color="black" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
        options={{
          headerTitleStyle: {
            fontFamily: "Comfortaa-B",
          },
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerRight: () =>
            authState?.authenticated && (
              <EButton
                color={"red"}
                bg="white"
                onPress={onLogout}
                title="logout"
              />
            ),

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#ffcc02" : "#FFF8EA",
                width: "50%",
                alignItems: "center",
                borderRadius: 40,
                paddingVertical: 4,
              }}
            >
              <Icon name="user-line" size="18" color="black" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
