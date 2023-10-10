import { View, Text } from "react-native";
import React from "react";
import { EText } from "./elements";

export default function LoadingView() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EText title="Loading..." />
    </View>
  );
}
