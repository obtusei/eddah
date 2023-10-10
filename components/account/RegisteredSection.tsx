import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
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

export default function RegisteredSection({ user }: { user: any }) {
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
              color={user?.data.Adopt.length > 0 ? "black" : "gray"}
              title={user?.data.Adopt.length}
            />
            <EText size={10} title={"adopted"} />
          </View>
          <View style={{ alignItems: "center" }}>
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
          </View>
        </View>

        <View style={{ flex: 1, gap: 20 }}>
          {user?.data.Adopt.length > 0 && (
            <View
              style={{
                backgroundColor: "#FDF1B3",
                borderRadius: 20,
                padding: 14,
              }}
            >
              <EText title="adopted" />
              <ScrollView
                horizontal
                directionalLockEnabled
                style={{
                  flex: 1,
                  minHeight: 100,
                  maxHeight: 100,
                }}
              >
                {user?.data.Adopt.map((item, index) => (
                  <AdoptedCard
                    id={item.pet.id}
                    key={index}
                    name={item.pet.name}
                    age={item.pet.age}
                    image={item.pet.image}
                    from={item.pet.owner ? item.pet.owner.name : ""}
                    status={item.status ? item.status : "pending"}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          {user?.data.Saved && user?.data.Saved.length > 0 && (
            <View
              style={{
                backgroundColor: "#FDF1B3",
                borderRadius: 20,
                padding: 14,
              }}
            >
              <EText title="saved" />
              <ScrollView
                horizontal
                directionalLockEnabled
                style={{
                  flex: 1,
                  minHeight: 100,
                  maxHeight: 250,
                }}
              >
                {user?.data.Saved.map((item, index) => (
                  <DogCard key={index} {...item.Pet} />
                ))}
              </ScrollView>
            </View>
          )}

          {user?.data.communitiesFollowed.length > 0 && <ScrollCard />}
          {user?.data.communitiesFollowed.length > 0 && (
            <View
              style={{
                flex: 1,
                gap: 5,
                backgroundColor: "#FDF1B3",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text
                style={{
                  paddingLeft: 10,
                }}
              >
                contributions
              </Text>
              {[1, 2, 3, 4].map((item, index) => (
                <ContributionCard key={index} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
