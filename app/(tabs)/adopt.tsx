import { View, ScrollView, Text, Image } from "react-native";
import React from "react";
import DogCard from "../../components/cards/DogCard";
import { AdoptSkeleton } from "../../components/Skeleton";
import useDogs from "../../utils/fetches/pets";
import { useAuth } from "../../utils/context/AuthContext";
import useRescues from "../../utils/fetches/rescues";
import { FlatList } from "react-native-gesture-handler";
import { EText } from "../../components/elements";

export default function Adopt() {
  const { dogs, isLoading } = useDogs();
  const { rescues } = useRescues();
  const { authState } = useAuth();
  if (authState.authenticated && authState.type === "user")
    return (
      <ScrollView
        style={{
          flex: 0,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 10,
            padding: 10,
          }}
        >
          {!isLoading
            ? dogs
              ? dogs.data.map((dogs, index) => (
                  <DogCard key={index} {...dogs.dog} isSaved={dogs.isSaved} />
                ))
              : AdoptSkeleton(6)
            : AdoptSkeleton(6)}
        </View>
      </ScrollView>
    );
  else if (authState.authenticated && authState.type === "org") {
    if (isLoading) {
      return <EText title="Loading.." />;
    } else if (rescues) {
      return (
        <View>
          <FlatList
            data={rescues?.data}
            style={{
              gap: 10,
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderColor: "black",
                  borderWidth: 0.2,
                  padding: 10,
                  gap: 10,
                }}
              >
                <Image
                  source={{ uri: `https://cdn.leftshape.com/${item.image}` }}
                  defaultSource={require("../../assets/icon.png")}
                  width={100}
                  height={100}
                />
                <View>
                  <EText title={item.description} weight="B" size={18} />
                  <EText
                    title={`Location\nLat:${item.location.lat},\n Lon:${item.location.lon}`}
                  />
                </View>
              </View>
            )}
          />
        </View>
      );
    }
  } else {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
}
