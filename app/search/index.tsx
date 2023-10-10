import React from "react";
import { FlatList, useWindowDimensions, TextInput } from "react-native";
import { EButton, EText } from "../../components/elements";
import { View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DogCard from "../../components/cards/DogCard";
import axios from "axios";
import { SITE_URL } from "../../utils/constant";

const FirstRoute = ({ data }: any) => {
  if (data.length > 0) {
    return (
      <FlatList
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={{
          marginTop: 20,
        }}
        data={data}
        renderItem={({ item }) => (
          <DogCard
            key={item.id}
            name={item.name}
            age={item.age}
            breed={item.breed}
            owner={{ name: "Amres" }}
            gender={item.gender}
          />
        )}
      />
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <EText opacity={0.5} title="No data found" />
      </View>
    );
  }
};

const SecondRoute = ({ data }: any) => {
  if (data.length > 0) {
    return (
      <FlatList
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={{
          marginTop: 20,
        }}
        data={data}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              padding: 16,
              borderRadius: 20,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            <EText size={21} weight="S" title={item.name} />
            <EText opacity={0.5} title={`@${item.username}`} />
          </View>
        )}
      />
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <EText opacity={0.5} title="No data found" />
      </View>
    );
  }
};

const ThirdRoute = ({ data }: any) => {
  if (data.length > 0) {
    return (
      <FlatList
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={{
          marginTop: 20,
        }}
        data={data}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              padding: 16,
              borderRadius: 20,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            <EText size={21} weight="S" title={item.name} />
            <EText opacity={0.5} title={item.location} />
          </View>
        )}
      />
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <EText opacity={0.5} title="No data found" />
      </View>
    );
  }
};

function Search() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchDogs, setDogs] = React.useState([]);
  const [searchComs, setComs] = React.useState([]);
  const [searchCareCenter, setCareCenter] = React.useState([]);
  const terms = ["dogs", "coms", "center"];
  const searchHandler = async () => {
    if (searchTerm.length > 0) {
      const res = await axios.get(
        `${SITE_URL}/search?q=${searchTerm}&type=${terms[index]}`
      );
      const data = res.data;
      switch (index) {
        case 0:
          setDogs(data.data);
          break;
        case 1:
          setComs(data.data);
          break;
        case 2:
          setCareCenter(data.data);
          break;
        default:
          break;
      }
    }
  };

  const [routes] = React.useState([
    { key: "first", title: "dogs" },
    { key: "second", title: "coms" },
    { key: "third", title: "center" },
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffcc02",
        padding: 12,
      }}
    >
      <TextInput
        placeholder="Enter the term"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{
          width: "100%",
          padding: 16,
          fontSize: 16,
          marginBottom: 16,
          backgroundColor: "#D1B002",
          borderRadius: 20,
        }}
      />
      <EButton pv={18} bg={"black"} title="Search" onPress={searchHandler} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "first":
              return <FirstRoute data={searchDogs ? searchDogs : []} />;
            case "second":
              return <SecondRoute data={searchComs ? searchComs : []} />;
            case "third":
              return (
                <ThirdRoute data={searchCareCenter ? searchCareCenter : []} />
              );
            default:
              return null;
          }
        }}
        onIndexChange={(index) => {
          setIndex(index);
          searchHandler();
        }}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              marginTop: 20,
            }}
            indicatorContainerStyle={{
              backgroundColor: "#ffcc02",
            }}
            indicatorStyle={{
              backgroundColor: "black",
            }}
            activeColor="black"
            labelStyle={{
              color: "gray",
            }}
          />
        )}
      />
    </View>
  );
}

export default Search;
