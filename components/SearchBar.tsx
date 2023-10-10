import { View, Text, Pressable } from "react-native";
import React from "react";
import { ELink, EText } from "./elements";
import Icon from "react-native-remix-icon";
import { useRouter } from "expo-router";

export default function SearchBar() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        padding: 25,
        flexDirection: "row",
        gap: 4,
        width: "100%",

        justifyContent: "center",
      }}
      onPress={() => {
        router.push("/search");
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          opacity: 0.2,
          borderRadius: 10,
          width: "100%",
          alignItems: "flex-start",
          padding: 12,
        }}
      >
        <EText
          size={14}
          color="white"
          title="search for adoption, communities & care centers"
        />
      </View>
      <View
        style={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 20,
        }}
      >
        <Icon name="search-2-line" size="21" color="white" />
      </View>
    </Pressable>
  );
}
