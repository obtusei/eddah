import { View, Text, FlatList } from "react-native";
import React from "react";
import { EText } from "../../components/elements";

export default function Notifications() {
  const data = true;
  if (data)
    return (
      <FlatList
        style={{
          backgroundColor: "white",
        }}
        data={[
          {
            key: "1",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "2",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "3",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "4",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "5",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "6",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "8",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
          {
            key: "9",
            title: "You are liked",
            desc: "You are now ready to adopt. You can pick up your pet from our store today or whenever you are free.",
          },
        ]}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#DDDDDD",
            }}
          >
            <EText size={10} opacity={0.5} title="29 May, 2023" />
            <EText weight="B" title={item.title} />
            <EText size={14} opacity={0.6} title={item.desc} />
          </View>
        )}
      />
    );
  else
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: "100%",
        }}
      >
        <EText title="loading..." />
      </View>
    );
}
