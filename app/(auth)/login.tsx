import React, { useState } from "react";
import { Image, TextInput, SafeAreaView, StyleSheet, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../utils/context/AuthContext";
import { EButton, EText } from "../../components/elements";
import { Spacer } from "../../components/LitteViews";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();
  const router = useRouter();

  const login = async (type: "user" | "org") => {
    // alert(`email: ${email} password: ${password}`);
    const res = await onLogin!(type, email, password);
    if (res.error) {
      alert(res.msg);
    }
    router.push("/account");
  };

  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: "#ffcc02" }}>
      <KeyboardAwareScrollView
        style={{
          flex: 0,
          height: "100%",
          backgroundColor: "#ffcc02",
        }}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", gap: 0 }}>
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 100, height: 100, borderRadius: 200 }}
            />
            <EText size={21} weight="B" title="eddah" />
            <EText size={14} weight="B" title="a voice for the voiceless" />
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <EText size={24} weight="B" title="login" />
            <Spacer gap={20} />
            <View>
              <EText size={14} opacity={0.8} title="  email" />
              <Spacer gap={4} />
              <TextInput
                placeholder="email or phone number"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
            </View>

            <View>
              <EText size={14} opacity={0.8} title="  password" />
              <Spacer gap={4} />
              <TextInput
                placeholder="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
              />
            </View>
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <EButton
                color="black"
                bg="transparent"
                onPress={() => {}}
                title="forget password?"
              />
            </View>
            <Spacer />
            <EButton pv={20} onPress={() => login("user")} title="login" />
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                padding: 20,
                gap: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <EText weight="L" title="don't have an account?" />
              <Link
                href={"/register"}
                style={{ fontFamily: "Comfortaa-B", fontSize: 16 }}
              >
                sign up
              </Link>
            </View>
          </View>
          <EButton
            color="black"
            bg="#D1B002"
            onPress={() => login("org")}
            title="login as care center"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    flexGrow: 1,
    minHeight: "100%",
    backgroundColor: "#ffcc02",
    gap: 5,
  },
  input: {
    width: "100%",
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#D1B002",
    borderRadius: 20,
  },
  button: {
    width: "100%",
    textDecorationColor: "red",
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default LoginPage;
