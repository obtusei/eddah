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

function DogCard({ id, name, age, breed, photo, gender, owner, isSaved }: any) {
  const colors = colorCheck(gender);
  const windowWidth = Dimensions.get("window").width;
  const [isLiked, setIsLiked] = useState(isSaved);
  const { authState } = useAuth();
  const { likeADog } = useDogs();

  useEffect(() => {
    setIsLiked(isSaved);
  }, []);
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: colors.bg(),
        borderRadius: 20,
        marginLeft: 0,
        width: windowWidth - 30,
      }}
    >
      <Image
        source={{ uri: photo }}
        defaultSource={require("../../assets/icon.png")}
        style={{
          width: 90,
          height: "100%",
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flex: 1,
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
          <View
            style={{
              flex: 1,
            }}
          >
            <EText
              size={18}
              weight="S"
              color={colors.accent()}
              title={name}
              style={{ flexWrap: "wrap" }}
            />
            <Spacer />
            <BreedBox
              bgBox={colors.bgBox()}
              accent={colors.accent()}
              breed={breed}
            />
            <Spacer gap={4} />
            <EText size={12} title={`age: ${age}`} />
            <EText size={10} title={owner ? `from ${owner.name}` : ""} />
          </View>
          <Icon name={colors.icon()} size={24} color={colors.accent()} />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <IconButton
            style={{
              width: 44,
            }}
            bg={"white"}
            isActive={isLiked}
            activeBg="red"
            onPress={() => {
              if (authState.authenticated) {
                setIsLiked(!isLiked);
                likeADog(id);
                mutate(SITE_URL + "/user/me");
                alert("like");
              } else {
                alert("login to like");
              }
            }}
            icon={isLiked ? "heart" : "heart-outline"}
            color={"red"}
            size={21}
          />
          <ELink
            bg={colors.accent()}
            href={`/adopt/${id}?gender=${gender}`}
            title="adopt"
          />
        </View>
      </View>
    </View>
  );
}

export default DogCard;
