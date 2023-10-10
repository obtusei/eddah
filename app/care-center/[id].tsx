import { View, Text, Image, Button } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { BreedBox, Spacer, colorCheck } from "../../components/LitteViews";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commaArray } from "../../utils/littleHandlers";
import { EButton, EText, IconText } from "../../components/elements";
import { ScrollView } from "react-native-gesture-handler";
import useCareCenters from "../../utils/fetches/careCenters";

export default function CareCenter() {
  const { id, gender } = useGlobalSearchParams();
  const { careCenter: careCenterData, isLoading } = useCareCenters(String(id));
  const colors = colorCheck(String(gender));
  if (careCenterData && careCenterData.data) {
    const careCenter = careCenterData.data;
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
            backgroundColor: "fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              width: "100%",
              padding: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={
                careCenter && careCenter.image
                  ? { uri: careCenter.image }
                  : require("../../assets/icon.png")
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 400,
                borderWidth: 2,
                borderColor: colors.accent(),
              }}
            />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <EText size={21} weight={"B"} title={careCenter.name} />
                {careCenter.isVerified && (
                  <Icon
                    name={"check-decagram"}
                    size={18}
                    color={colors.accent()}
                  />
                )}
              </View>
              <EText size={16} weight={"R"} title={careCenter.email} />
            </View>
          </View>
          <Spacer />
          <IconText
            bg={colors.bgBox()}
            size={24}
            color={colors.accent()}
            icon={"map-marker"}
            title={careCenter.location}
          />
          <Spacer />
          <IconText
            bg={colors.bgBox()}
            size={24}
            color={colors.accent()}
            icon={"phone"}
            title={careCenter.phone}
          />
          <View>
            <EText title={careCenter.bio} />
          </View>
        </View>
      </ScrollView>
    );
  } else if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.bg(),
        }}
      >
        <Icon name={"paw"} size={48} color={colors.accent()} />
      </View>
    );
  else return;
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg(),
    }}
  >
    <Text>ERROR</Text>
  </View>;
}
