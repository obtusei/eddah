import {
  View,
  Text,
  Image,
  Pressable,
  Button,
  useWindowDimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import pickImage from "../../utils/imagePicker";
import { EButton, EText } from "../../components/elements";
import { Spacer } from "../../components/LitteViews";
import { useGlobalSearchParams } from "expo-router";
import useComPosts from "../../utils/fetches/comPosts";

export default function AddPost() {
  const { id } = useGlobalSearchParams();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const { width } = useWindowDimensions();
  const { createCommunityPost } = useComPosts(String(id));
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Pressable onPress={() => pickImage((data) => setImage(data))}>
        {image ? (
          <Image
            source={image ? { uri: image } : require("../../assets/icon.png")}
            style={{
              width: width,
              height: 250,
            }}
          />
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <EText
              title="Pick an image from camera roll"
              color="black"
              weight="B"
            />
          </View>
        )}
      </Pressable>
      <Spacer gap={40} />
      <View>
        <EText title="captions" />
        <Spacer />
        <TextInput
          placeholder="enter your caption"
          autoCapitalize="none"
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={{
            width: "100%",
            padding: 16,
            fontSize: 16,
            marginBottom: 16,
            color: "black",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 20,
          }}
        />
      </View>

      <Spacer />
      <EButton
        title="post"
        onPress={() => {
          createCommunityPost({
            id: String(id),
            image: image,
            content: caption,
          });
          alert("posted your post successfully");
        }}
      />
    </View>
  );
}
