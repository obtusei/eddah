import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Skeleton from "../Skeleton";
import { EText } from "../elements";

function ScrollCard({ bg, href, title, data }: any) {
  return (
    <View
      style={{
        backgroundColor: bg ? "white" : "#FDF1B3",
        borderRadius: bg ? 0 : 20,
        padding: 14,
        height: 150,
      }}
    >
      <EText weight="B" title={title} />
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
        {data
          ? data.map((item, index: number) => (
              <Link key={index} href={`/${href}/${item.id}`}>
                <View
                  style={{
                    padding: 10,
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    defaultSource={require("../../assets/icon.png")}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 200,
                    }}
                  />
                  <EText size={12} color="gray" title={item.name} />
                </View>
              </Link>
            ))
          : Skeleton()}
      </ScrollView>
    </View>
  );
}

export default ScrollCard;
