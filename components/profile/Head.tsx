import { View, Text, Image } from "react-native";
import React from "react";
import { EButton, EText } from "../elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Spacer } from "../LitteViews";

export default function ProfileHead({
  name,
  image,
  bio,
  email,
  isVerified,
  followers,
}) {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={image ? { uri: image } : require("../../assets/icon.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 400,
            borderWidth: 2,
            borderColor: "black",
          }}
        />

        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
            <EText size={21} weight={"B"} title={name} />
            {isVerified && (
              <Icon name={"check-decagram"} size={18} color={"orange"} />
            )}
          </View>
          <EText opacity={0.5} size={16} weight={"R"} title={email} />
          <Spacer />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 4,
              }}
            >
              <EText opacity={1} size={16} weight={"B"} title={followers} />
              <EText opacity={0.5} size={16} weight={"R"} title={`Followers`} />
            </View>
            <EButton
              title="follow us"
              onPress={() => {
                alert("following");
              }}
            />
          </View>
        </View>
      </View>
      <Spacer />
      <Spacer />
      <EText opacity={0.8} title={bio} />
    </View>
  );
}
