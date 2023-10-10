import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import ProfileHead from "../../components/profile/Head";
import { Link, useGlobalSearchParams } from "expo-router";
import { useAuth } from "../../utils/context/AuthContext";
import ScrollCom from "../../components/ScrollCom";
import { ELink, EText } from "../../components/elements";
import useCommunities from "../../utils/fetches/communities";
import RemixIcon from "react-native-remix-icon";

export default function Community() {
  const { id } = useGlobalSearchParams();
  const { communities } = useCommunities(String(id));
  const { authState } = useAuth();
  if (authState.authenticated) {
    if (communities) {
      const community = communities.data;
      return (
        <SafeAreaView>
          <ScrollView
            style={{
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <ProfileHead
                name={community.name}
                isVerified={true}
                email={`@${community.username}`}
                image={""}
                bio={community.bio}
                followers={community._count.members}
              />
              <View
                style={{
                  padding: 10,
                }}
              >
                <EText size={21} weight="B" title="posts" />
                <View>
                  {community.posts.length > 0 ? (
                    community.posts.map((item, index) => (
                      <ScrollCom
                        key={index}
                        bg={"red"}
                        title={"asd"}
                        isOwnProfile={true}
                      />
                    ))
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        height: 200,
                        alignItems: "center",
                      }}
                    >
                      <EText color="gray" title="no posts" />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <Link href={`/post?id=${id}`}>
              <RemixIcon name="add-circle-fill" size={60} color="#ffcc02" />
            </Link>
          </View>
        </SafeAreaView>
      );
    } else {
      return <Text>Loading</Text>;
    }
  } else {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ELink bg="#ffcc02" href="login" title="Login" />
      </View>
    );
  }
}
