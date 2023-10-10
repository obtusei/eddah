import { View, Text, Image, Button } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import useDogs from "../../utils/fetches/pets";
import { BreedBox, Spacer, colorCheck } from "../../components/LitteViews";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commaArray } from "../../utils/littleHandlers";
import { EButton, EText } from "../../components/elements";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../utils/context/AuthContext";
import { mutate } from "swr";
import { SITE_URL } from "../../utils/constant";

export default function AdoptDog() {
  const { id, gender } = useGlobalSearchParams();
  const { dogs: dogData, isLoading, adoptADog } = useDogs(String(id));
  const colors = colorCheck(String(gender));
  const { authState } = useAuth();

  if (dogData) {
    const dog = dogData.data;
    return (
      <ScrollView
        style={{
          flex: 0,
          backgroundColor: colors.bg(),
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.bg(),
          }}
        >
          <Image
            source={{ uri: dog.image }}
            defaultSource={require("../../assets/icon.png")}
            style={{
              width: "100%",
              height: 240,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />
          <Icon name={colors.icon()} size={24} color={colors.accent()} />
          <View
            style={{
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <View style={{ gap: 10 }}>
                <EText size={21} weight={"B"} title={dog?.name} />
                <BreedBox
                  bgBox={colors.bgBox()}
                  accent={colors.accent()}
                  breed={dog.breed}
                />
              </View>
              <View>
                <EButton
                  bg={colors.accent()}
                  title="Adopt Me"
                  onPress={() => {
                    if (!authState.authenticated) {
                      alert("You need to login first");
                    } else {
                      adoptADog(dog.id);
                    }
                  }}
                />
              </View>
            </View>
            <EText size={21} opacity={0.75} weight={"R"} title={dog.bio} />
            <Spacer />
            <EText size={21} weight={"S"} title={"details"} />
            <Spacer />
            <EText size={18} weight={"R"} title={`age: ${dog.age}`} />
            <Spacer />
            <EText
              size={18}
              weight={"R"}
              title={`characters: ${commaArray(dog.characters)}`}
            />
            <Spacer />
            <EText
              size={18}
              weight={"R"}
              title={`disease: ${commaArray(dog.dieases)}`}
            />
            <Spacer />
            <EText
              size={18}
              weight={"R"}
              title={`vaccinations: ${commaArray(dog.vaccinations)}`}
            />
            <Spacer />
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: colors.bgBox(),
                borderRadius: 20,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Image
                  source={require("../../assets/icon.png")}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <View>
                  <EText
                    color={colors.accent()}
                    size={18}
                    weight={"S"}
                    title={`from sneha'scare`}
                  />
                  <EText
                    color={colors.accent()}
                    size={14}
                    opacity={0.6}
                    weight={"R"}
                    title={`abhishekbhatta02@gmail.com`}
                  />
                </View>
              </View>
              <Icon name={"chevron-right"} size={24} color={colors.accent()} />
            </View> */}
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
