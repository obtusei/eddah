import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import SearchBar from "../../components/SearchBar";
import ScrollCard from "../../components/cards/ScrollCard";
import useCommunities from "../../utils/fetches/communities";
import useCareCenters from "../../utils/fetches/careCenters";
import ScrollAdopt from "../../components/cards/ScrollAdopt";
import useDogs from "../../utils/fetches/pets";
import useVets from "../../utils/fetches/vets";
import VetCard from "../../components/cards/VetCard";

export default function Home() {
  const { communities } = useCommunities();
  const { careCenter } = useCareCenters();
  const { dogs } = useDogs();
  const { vets } = useVets();
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#ffce02" }}
      >
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              width: "100%",
              padding: 16,
              backgroundColor: "#ffcc02",
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
            }}
          >
            <SearchBar />
          </View>
        </View>
        <ScrollCard
          title={"communities"}
          href={"communities"}
          data={communities ? communities?.data : null}
          bg
        />
        <ScrollAdopt data={dogs} bg />
        <ScrollCard
          title={"care center"}
          href={"care-center"}
          data={careCenter?.data}
          bg
        />

        {vets && <VetCard data={vets.data} bg />}
      </ScrollView>
    </SafeAreaView>
  );
}
