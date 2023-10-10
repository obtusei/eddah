import { View, Text, Image } from "react-native";
import React from "react";
import { EButton, EText } from "../elements";

export default function PostCard({
  image,
  name,
  date,
  onPress,
  isFollowing,
}: {
  image: string;
  name: string;
  date: string;
  onPress: () => void;
  isFollowing?: boolean;
}) {
  return (
    <View
      style={{
        position: "relative",
        borderRadius: 20,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: "100%",
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        defaultSource={require("../../assets/icon.png")}
        height={250}
        alt="dog"
        style={{
          borderRadius: 20,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "100%",
          padding: 16,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <EText color="white" size={21} weight="S" title={name} />
          <EText
            color="white"
            opacity={0.5}
            title={new Date(date).toLocaleDateString()}
          />
        </View>
        {isFollowing ? (
          <></>
        ) : (
          <EButton title="Follow" bg="white" color="black" onPress={onPress} />
        )}
      </View>
    </View>
  );
}
