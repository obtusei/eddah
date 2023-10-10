import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { EText } from "../elements";

export default function AccountSection() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <ScrollView
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 0,
            padding: 16,
            minHeight: "100%",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <EText size={24} weight="B" title="profile" />
          <EText title="login to adopt and connect with other dog lovers" />
          <View
            style={{
              backgroundColor: "#ffcc02",
              alignItems: "center",
              padding: 20,
              borderRadius: 15,
            }}
          >
            <Link
              href={"/login"}
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Comfortaa-R",
              }}
            >
              login
            </Link>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 4,
              paddingVertical: 20,
            }}
          >
            <Text></Text>
            <EText title="don't have an account?" />
            <Link
              style={{
                textDecorationLine: "underline",
                fontFamily: "Comfortaa-B",
                fontSize: 16,
              }}
              href={"/register"}
            >
              register
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
