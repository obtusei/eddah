import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { BreedBox, Spacer, colorCheck } from "../LitteViews";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { EButton, ELink, EText, IconButton } from "../elements";
import { mutate } from "swr";
import { useAuth } from "../../utils/context/AuthContext";
import { SITE_URL } from "../../utils/constant";
import useDogs from "../../utils/fetches/pets";
import useAdoption from "../../utils/fetches/adoption";

function DogCardAdopt({ dog }: any) {
  const colors = colorCheck(String(dog?.pet?.gender));
  const windowWidth = Dimensions.get("window").width;
  const [isLiked, setIsLiked] = useState(dog?.pet.isSaved);
  const { authState } = useAuth();
  const { acceptAdoption } = useAdoption();

  useEffect(() => {
    setIsLiked(dog?.pet.isSaved);
  }, []);
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        flexDirection: "row",
        gap: 10,

        backgroundColor: colors.bg(),
        borderRadius: 20,
        marginLeft: 0,
        width: windowWidth - 30,
      }}
    >
      <Image
        source={{ uri: dog?.pet.photo }}
        defaultSource={require("../../assets/icon.png")}
        style={{
          width: 90,
          height: 200,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flex: 1,
          height: 200,
        }}
      >
        <View
          style={{
            flex: 2,
            gap: 4,
            flexDirection: "row",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <View style={{}}>
            <EText
              size={18}
              weight="S"
              color={colors.accent()}
              title={dog?.pet.name}
              style={{ flexWrap: "wrap" }}
            />
            <Spacer />
            <BreedBox
              bgBox={colors.bgBox()}
              accent={colors.accent()}
              breed={dog?.pet.breed}
            />
            <Spacer gap={4} />
            <EText size={12} title={`age: ${dog?.pet?.age}`} />
            <EText size={10} title={dog?.pet ? `from ${dog?.pet.name}` : ""} />
          </View>
          <Icon name={colors.icon()} size={24} color={colors.accent()} />
        </View>

        <EButton
          bg={colors.accent()}
          title="accept"
          onPress={() => {
            acceptAdoption(dog?.id);
          }}
        />
      </View>
    </View>
  );
}

export default DogCardAdopt;
