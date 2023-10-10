import React, { useState } from "react";
import { Image, TextInput, StyleSheet, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../utils/context/AuthContext";
import { EButton, EText } from "../../components/elements";
import { Spacer } from "../../components/LitteViews";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async (type: "user" | "org") => {
    const res = await onRegister(type, name, email, password);
    if (res.error) {
      alert(res.message);
    } else {
      setLoading(false);
      alert("Successfully registered");
      router.push("/login");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#ffcc02",
      }}
    >
      <View style={styles.container}>
        {/* ICONS AND MOTTO */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 100, height: 100, borderRadius: 200 }}
          />
          <EText size={21} weight="B" title="eddah" />
          <EText size={14} weight="B" title="a voice for the voiceless" />
        </View>

        {/*  */}
        <View style={{ width: "100%" }}>
          <EText size={24} weight="B" title="register" />
          <Spacer gap={20} />
          <View>
            <EText size={14} opacity={0.8} title="  full name" />
            <Spacer gap={4} />
            <TextInput
              placeholder="your name"
              autoCapitalize="none"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />
          </View>

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
              onPress={() => {
                setLoading(true);
                register("org");
              }}
              title={loading ? "loading..." : "register as care center"}
              disabled={loading}
            />
          </View>

          <Spacer />
          <EButton
            pv={20}
            onPress={() => {
              setLoading(true);
              register("user");
            }}
            title={loading ? "loading..." : "register"}
            disabled={loading}
          />
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
            <EText weight="L" title="already have an account?" />
            <Link
              href={"/login"}
              style={{ fontFamily: "Comfortaa-B", fontSize: 16 }}
            >
              login
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
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
    fontFamily: "Comfortaa-R",
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
