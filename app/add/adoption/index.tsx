import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { EButton, EText } from "../../../components/elements";
import { Spacer } from "../../../components/LitteViews";
import { Picker } from "@react-native-picker/picker";
import pickImage from "../../../utils/imagePicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useDogs from "../../../utils/fetches/pets";

export default function PostForAdoption() {
  const dogBreeds = [
    { label: "Labrador Retriever", value: "Labrador Retriever" },
    { label: "German Shepherd", value: "German Shepherd" },
    { label: "Golden Retriever", value: "Golden Retriever" },
    { label: "Bulldog", value: "Bulldog" },
    { label: "Poodle", value: "Poodle" },
    { label: "Beagle", value: "Beagle" },
    { label: "Rottweiler", value: "Rottweiler" },
    { label: "Boxer", value: "Boxer" },
    { label: "Dachshund", value: "Dachshund" },
    { label: "Siberian Husky", value: "Siberian Husky" },
    { label: "Doberman Pinscher", value: "Doberman Pinscher" },
    { label: "Great Dane", value: "Great Dane" },
    { label: "Shih Tzu", value: "Shih Tzu" },
    { label: "Chihuahua", value: "Chihuahua" },
    { label: "Border Collie", value: "Border Collie" },
  ];

  const [data, setData] = useState({
    name: "",
    bio: "",
    age: "",
    breed: dogBreeds[0].value,
    gender: "male",
    diseases: "",
    vaccinations: "",
  });
  const [image, setImage] = useState(null);
  const { postForAdoption } = useDogs();
  return (
    <KeyboardAwareScrollView
      style={{
        paddingBottom: 100,
      }}
    >
      <View style={{ padding: 20 }}>
        <EText title="Post for Adoption" size={23} />
        <Spacer />
        {/* NAME */}
        <EText title="name" />
        <TextInput
          placeholder="name"
          style={styles.input}
          value={data.name}
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <Spacer />
        {/* BIO */}
        <EText title="bio" />
        <TextInput
          placeholder="bio"
          style={styles.input}
          value={data.bio}
          onChangeText={(text) => setData({ ...data, bio: text })}
        />
        <Spacer />
        {/* AGE */}
        <EText title="age" />
        <TextInput
          placeholder="age"
          inputMode="numeric"
          style={styles.input}
          value={data.age}
          onChangeText={(text) => setData({ ...data, age: text })}
        />
        <Spacer />
        {/* Breed */}
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: "#ccc",
          }}
        >
          <EText title="breed" />
          <Picker
            selectedValue={data.breed}
            onValueChange={(itemValue, itemIndex) =>
              setData({ ...data, breed: itemValue })
            }
          >
            {dogBreeds.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
        <Spacer />
        {/* Gender */}
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: "#ccc",
          }}
        >
          <EText title="gender" />
          <Picker
            selectedValue={data.gender}
            onValueChange={(itemValue, itemIndex) =>
              setData({ ...data, breed: itemValue })
            }
          >
            <Picker.Item label="male" value="male" />
            <Picker.Item label="female" value="female" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>
        <Spacer />
        <EText title="diseases" />
        <TextInput
          placeholder="diseases"
          style={styles.input}
          value={data.diseases}
          onChangeText={(text) => setData({ ...data, diseases: text })}
        />
        <Spacer />
        {/* Vaccinations */}
        <EText title="vaccinations" />
        <TextInput
          placeholder="vaccinations"
          style={styles.input}
          value={data.vaccinations}
          onChangeText={(text) => setData({ ...data, vaccinations: text })}
        />
        <Spacer />
        <Pressable
          onPress={() =>
            pickImage((data) => {
              setImage(data);
            })
          }
        >
          {image ? (
            <Image
              source={
                image ? { uri: image } : require("../../../assets/icon.png")
              }
              style={{
                width: "100%",
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
        <EButton
          pv={20}
          title="post"
          onPress={async () => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("bio", data.bio);
            formData.append("age", data.age);
            formData.append("breed", data.breed);
            formData.append("gender", data.gender);
            formData.append("diseases", data.diseases);
            formData.append("vaccinations", data.vaccinations);
            const response = await fetch(image);
            const blob = await response.blob();
            const rand = Math.floor(Math.random() * 1000000000);
            const imageName = `${rand}.jpg`;
            const file = new File([blob], imageName, { type: "image/jpg" });
            formData.append("image", file);
            postForAdoption(formData);
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
  },
});
