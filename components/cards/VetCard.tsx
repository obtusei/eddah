import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

function VetCard({ data, bg }) {
  return (
    <View
      style={{
        backgroundColor: bg ? "white" : "#FDF1B3",
        borderRadius: bg ? 0 : 20,
        padding: 14,
        height: 150,
      }}
    >
      <Text style={{}}>vet</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        directionalLockEnabled
        style={{
          flex: 1,
          minHeight: 100,
          maxHeight: 100,
        }}
      >
        {data ? (
          data.map((item, index: number) => (
            <View
              key={index}
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginRight: 5,
                borderRadius: 20,
                backgroundColor: "#FEF6CC",
              }}
            >
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../assets/icon.png")
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 200,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {item.location}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default VetCard;
