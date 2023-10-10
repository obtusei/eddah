import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { EButton } from "./elements";

function ScrollCom({ bg, title, isOwnProfile }) {
  return (
    <View
      style={{
        backgroundColor: bg ? "white" : "#FDF1B3",
        borderRadius: bg ? 0 : 20,
        height: 200,
        position: "relative",
        margin: 10,
      }}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 20,
        }}
      />
      {!isOwnProfile && (
        <View>
          <View
            style={{
              position: "absolute",
              opacity: 0.2,
              borderRadius: 20,

              backgroundColor: "black",
              width: "100%",
              height: "100%",
            }}
          ></View>
          <View
            style={{
              padding: 10,
              position: "absolute",
              alignItems: "center",
              gap: 5,
              bottom: 10,
              left: 10,
              right: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                gap: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/icon.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 200,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  john dolittle
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "gray",
                  }}
                >
                  john dolittle
                </Text>
              </View>
            </View>
            <EButton title="follow" />
          </View>
        </View>
      )}
    </View>
  );
}

export default ScrollCom;
