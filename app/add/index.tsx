import { View, Text } from "react-native";
import React from "react";
import { EButton, EText } from "../../components/elements";
import { Spacer } from "../../components/LitteViews";
import { Link } from "expo-router";

export default function Add() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Link href="/add/adoption">
        <EText title="Add Post" />
      </Link>
      <Spacer gap={40} />
      <Link href="/add/com">
        <EText title="Create Community" />
      </Link>
    </View>
  );
}
