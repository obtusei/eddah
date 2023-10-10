import React from "react";
import { Image, Text, View } from "react-native";

function ContributionCard() {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={require("../../assets/icon.png")}
        style={{
          width: 80,
          height: 80,
          borderRadius: 30,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 4,
        }}
      >
        <Text
          style={{
            fontSize: 14,
          }}
        >
          john dolittle
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          age:02
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: "gray",
          }}
        >
          from sneha'scare
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          color: "green",
        }}
      >
        rescued
      </Text>
    </View>
  );
}

export default ContributionCard;
