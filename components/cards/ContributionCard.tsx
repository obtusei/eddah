import React from "react";
import { Image, Text, View } from "react-native";

function ContributionCard({
  image,
  status,
  id,
}: {
  image: string;
  status: string;
  id: string;
}) {
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
        source={image ? { uri: image } : require("../../assets/icon.png")}
        defaultSource={require("../../assets/icon.png")}
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
        ></Text>
        <Text
          style={{
            fontSize: 12,
          }}
        ></Text>
        <Text
          style={{
            fontSize: 10,
            color: "gray",
          }}
        ></Text>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          color: "green",
        }}
      >
        {status}
      </Text>
    </View>
  );
}

export default ContributionCard;
