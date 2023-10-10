import React from "react";
import {
  FlatList,
  useWindowDimensions,
  TextInput,
  Image,
  RefreshControl,
} from "react-native";
import { EButton, EText } from "../../components/elements";
import { View } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import axios from "axios";
import { SITE_URL } from "../../utils/constant";
import PostCard from "../../components/cards/PostCard";
import useComPosts from "../../utils/fetches/comPosts";
import { mutate } from "swr";

const FirstRoute = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { commPosts, isLoading } = useComPosts(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    mutate(SITE_URL + "/post");
    setRefreshing(false);
  }, []);

  if (isLoading) {
    return <EText title="loading..." />;
  } else {
    if (commPosts?.data.length > 0) {
      return (
        <FlatList
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={{
            marginTop: 20,
            padding: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={commPosts.data}
          renderItem={({ item, index }) => (
            <PostCard
              key={index}
              image={item.image}
              name={item.community.name}
              date={item.createdAt}
              onPress={() => {
                alert(item.communityId);
              }}
              isFollowing={true}
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
  }
};

const SecondRoute = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { commPosts, isLoading } = useComPosts(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // mutate(SITE_URL + "/user/me");
    setRefreshing(false);
  }, []);
  if (isLoading) {
    return <EText title="loading..." />;
  } else {
    if (commPosts && commPosts?.data.length > 0) {
      return (
        <FlatList
          keyExtractor={(item) => item.key}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={{
            marginTop: 20,
            padding: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={commPosts?.data}
          renderItem={({ item }) => (
            <PostCard
              key={item}
              image={item.image}
              name={item.community.name}
              date={item.createdAt}
              onPress={() => {
                alert(item.communityId);
              }}
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
    { key: "first", title: "following" },
    { key: "second", title: "discover" },
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fffff",
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "first":
              return <FirstRoute />;
            case "second":
              return <SecondRoute />;
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
            style={{}}
            indicatorContainerStyle={{
              backgroundColor: "white",
            }}
            indicatorStyle={{
              backgroundColor: "black",
            }}
            activeColor="black"
            labelStyle={{
              color: "gray",
              textTransform: "lowercase",
              fontFamily: "Comfortaa-B",
            }}
          />
        )}
      />
    </View>
  );
}

export default Search;
