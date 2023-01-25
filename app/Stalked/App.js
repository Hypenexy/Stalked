import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";

import LoginScreen from "react-native-login-screen";

import "./languages/i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("en");

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  console.log("app launched");

  var email, password;

  const sosBtn = () => {
    console.log("kur appears");
    // changeLanguage("en");
  };

  var loggedIn = false;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LoginScreen
          signupTextStyle="bonjour"
          disableSocialButtons="false"
          logoImageSource={require("./assets/Running-Man.png")}
          onLoginPress={() => {}}
          onSignupPress={() => {}}
          // onEmailChange={(email: string) => {}}
          // onPasswordChange={(password: string) => {}}
        />

        <Pressable style={styles.sos} onPress={sosBtn}>
          <Text style={styles.sosText}>SOS</Text>
        </Pressable>

        <View style={styles.div}>
          <Text style={styles.divTitle}>{t("yourData")}</Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.divTitle}>{t("loggedWith")}</Text>
        </View>
        <Text>About</Text>

        <Pressable onPress={() => changeLanguage("en")}>
          <Text>En</Text>
        </Pressable>
        <Pressable onPress={() => changeLanguage("bg")}>
          <Text>Bg</Text>
        </Pressable>

        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "scroll", // what
  },
  sos: {
    width: 99,
    height: 99,
    marginTop: "50%",
    marginBottom: 20,
    zIndex: 2,

    borderRadius: 50,
    backgroundColor: "#65baff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  sosText: {
    fontSize: 32,
    textAlign: "center",
    lineHeight: 97, //Vertically aligns the text since textAlignVertical doesn't work on my iPhone
  },
  div: {
    backgroundColor: "#f5f5f5",
    width: "90%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  divTitle: {
    fontWeight: "700",
    color: "#555",
    textTransform: "capitalize",
  },
});
