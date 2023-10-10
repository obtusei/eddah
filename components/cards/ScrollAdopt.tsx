import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import DogCard from "./DogCard";
import Skeleton, { AdoptSkeleton } from "../Skeleton";
import { EText } from "../elements";
function ScrollAdopt({ data, bg }) {
  return (
    <View
      style={{
        backgroundColor: bg ? "white" : "#FDF1B3",
        borderRadius: bg ? 0 : 20,
        padding: 14,
        height: 250,
      }}
    >
      <EText weight="B" title="adopt" />
      <ScrollView
        horizontal
        centerContent
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        style={{
          flex: 1,
          paddingVertical: 10,
          minHeight: 200,
          gap: 10,
        }}
      >
        {data
          ? data.data.map((item: any, index: number) => (
              <DogCard key={index} {...item.dog} />
            ))
          : AdoptSkeleton()}
      </ScrollView>
    </View>
  );
}

export default ScrollAdopt;
