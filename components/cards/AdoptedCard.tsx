import React from "react";
import { Alert, Button, Image, Text, View } from "react-native";
import { EButton, EText } from "../../components/elements";

type AdoptedCardProps = {
  id: string;
  name: string;
  age: number;
  from: string;
  image: string;
  status: "pending" | "adopted" | null;
};

function AdoptedCard({ id, name, age, from, image, status }: AdoptedCardProps) {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/icon.png")}
        style={{
          width: 60,
          height: 60,
          borderRadius: 200,
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 4,
        }}
      >
        <EText size={12} color="red" title={`${status}`} />
        <EText title={name} />
        <EText size={12} title={`age: ${age}`} />
        {from && <EText size={10} title={`from ${from}`} />}
        <EButton
          title="cancel"
          onPress={() => {
            Alert.alert(
              "Cancel Adoption",
              "Are you sure you want to cancel this adoption process?",
              [
                {
                  text: "No",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "Remove",
                  onPress: () => {
                    Alert.alert(
                      "Adoption Cancelled",
                      "The adoption process has been cancelled successfully."
                    );
                  },
                  style: "destructive",
                },
              ]
            );
          }}
        />
      </View>
    </View>
  );
}

export default AdoptedCard;
