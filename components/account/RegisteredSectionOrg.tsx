import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { EText } from "../elements";
import pickImage from "../../utils/imagePicker";
import { Spacer } from "../LitteViews";
import AdoptedCard from "../cards/AdoptedCard";
import DogCard from "../cards/DogCard";
import ContributionCard from "../cards/ContributionCard";
import ScrollCard from "../cards/ScrollCard";
import { mutate } from "swr";
import { SITE_URL } from "../../utils/constant";
import DogCardAdopt from "../cards/DogCardAdopt";

export default function RegisteredSectionOrg({ user }: { user: any }) {
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    mutate(SITE_URL + "/user/me");
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flex: 0,
          justifyContent: "center",
          padding: 16,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => pickImage((data) => setImage(data))}>
          <Image
            source={image ? { uri: image } : require("../../assets/icon.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 200,
            }}
          />
        </Pressable>
        <Spacer />
        <EText size={18} weight="B" title={user?.data?.name} />
        <EText color="gray" title={user?.data?.email} />

        <View style={{ flex: 0, gap: 16, padding: 15, flexDirection: "row" }}>
          <View style={{ alignItems: "center" }}>
            <EText
              weight="B"
              color={user?.data.adopt.length > 0 ? "black" : "gray"}
              title={user?.data.adopt.length}
            />
            <EText size={10} title={"adoption"} />
          </View>
          {/* <View style={{ alignItems: "center" }}>
            <EText
              weight="B"
              color={
                user?.data.communitiesFollowed.length > 0 ? "black" : "gray"
              }
              title={user?.data.communitiesFollowed.length}
            />
            <EText size={10} title={"communities"} />
          </View>
          <View style={{ alignItems: "center" }}>
            <EText weight="B" title={user?.data.Saved.length} />
            <EText size={10} title={"contributions"} />
          </View> */}
        </View>

        <View>
          {user?.data.adopt.map((dog, index) => (
            <View key={index}>
              <DogCardAdopt dog={dog} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
