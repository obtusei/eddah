import * as ImagePicker from "expo-image-picker";

const pickImage = async (callback: (image: any) => void) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);
  if (!result.canceled) {
    callback(result.assets[0].uri);
  }
};

export default pickImage;
