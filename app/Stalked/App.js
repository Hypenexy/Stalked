import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import "./languages/i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("en");

  var onEmail, onUsername, onPassword;

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  const sosBtn = () => {
    // sos button actions here
  };

  const registerButton = () => {
    console.log(onEmail);
    console.log(onUsername);
    console.log(onPassword);
  };

  const [myText, setMyText] = useState("");

  var loggedIn = false;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={[theme["b"], theme[6]]} style={styles.loginDiv}>
          <Image
            style={styles.loginImage}
            source={require("./assets/Running-Man.png")}
          />
          <View style={styles.registerForm}>
            <Text style={styles.loginWelcome}>{t("createAnAccount")}</Text>
            <View style={styles.divCenter}>
              <TextInput
                autoComplete="email"
                inputMode="email"
                keyboardType="email-address"
                style={styles.loginInput}
                onChangeText={(e) => {
                  if (e.toString() != "undefined") {
                    // it's undefined sometimes?? Only on emulator and not my iphone 12
                    onEmail = e;
                  }
                }}
                onBlur={() => {
                  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                  console.log(onEmail);
                  if (reg.test(onEmail) === false) {
                    setMyText("Email is incorrect format");
                  } else {
                    if (myText == "Email is incorrect format") {
                      // there are some cases where the error message will be removed but im too lazy to fix
                      setMyText("");
                    }
                  }
                }}
                placeholder={t("email")}
                placeholderTextColor={theme["ch"]}
              />
              <TextInput
                autoComplete="username"
                style={styles.loginInput}
                onChangeText={(e) => {
                  onUsername = e;
                  if (e.length < 4 || e.length > 29) {
                    setMyText("Username must be between 3 and 30 characters");
                  } else {
                    if (
                      myText == "Username must be between 3 and 30 characters"
                    ) {
                      setMyText("");
                    }
                  }
                }}
                placeholder={t("username")}
                placeholderTextColor={theme["ch"]}
              />
              <TextInput
                autoComplete="password"
                secureTextEntry={true}
                style={styles.loginInput}
                onChangeText={(e) => {
                  onPassword = e;
                }}
                placeholder={t("password")}
                placeholderTextColor={theme["ch"]}
              />
              <Text style={styles.loginInputError}>{myText}</Text>
            </View>
            <View style={styles.divCenter}>
              <Pressable style={styles.login} onPress={registerButton}>
                <Text style={styles.loginText}>{t("signInInstead")}</Text>
              </Pressable>
              <Pressable style={styles.register} onPress={registerButton}>
                <Text style={styles.registerText}>{t("createAnAccount")}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.bottomWelcome}>
            <Text style={styles.loginWelcome}>{t("welcome")}</Text>
            <Text style={styles.loginWelcome2}>{t("welcomeDescription")}</Text>
            <Pressable style={styles.register} onPress={sosBtn}>
              <Text style={styles.registerText}>{t("createAnAccount")}</Text>
            </Pressable>
            <Pressable style={styles.login} onPress={sosBtn}>
              <Text style={styles.loginText}>{t("signIn")}</Text>
            </Pressable>
          </View>
        </LinearGradient>

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

var theme = {
  1: "#AEECEF",
  2: "#ED1D69",
  3: "#6D9DC5",
  4: "#56203D",
  5: "#483A58",

  c: "#000",
  ch: "#00000055",
  b: "#fff",
  6: "#efd1f3",
};

// theme = {
//   1: "#AEECEF",
//   2: "#ED1D69",
//   3: "#6D9DC5",
//   4: "#56203D",
//   5: "#483A58",

//   c: "#fff",
//   ch: "#eeeeee55",
//   b: "#000",
//   6: "#2e1f30",
// };

const styles = StyleSheet.create({
  loginDiv: {
    zIndex: 99,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // backgroundColor: "#353a3f",
    // backgroundColor: "#dddddddd",
    width: "100%",
    height: "95%",
    flex: 1,
    alignItems: "center",
  },
  loginWelcome: {
    color: theme["c"],
    fontSize: 32,
    marginBottom: 8,
  },
  loginWelcome2: {
    color: theme["c"],
    fontSize: 16,
    marginBottom: 24,
  },
  loginImage: {
    height: 220,
    resizeMode: "contain",
  },
  loginInput: {
    color: theme["c"],
    borderWidth: 2,
    borderRadius: 12,
    borderColor: theme[4],
    width: "90%",
    maxWidth: 300,
    padding: 12,
    fontSize: 16,

    marginBottom: 16,
  },
  loginInputError: {
    color: theme["b"],
    fontWeight: "600",
    borderRadius: 12,
    backgroundColor: theme[4],
    width: "90%",
    maxWidth: 300,
    padding: 12,
    fontSize: 16,
  },
  bottomWelcome: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  register: {
    borderRadius: 12,
    backgroundColor: theme[2],
    padding: 16,
    width: "90%",
    maxWidth: 300,

    marginBottom: 10,
  },
  registerText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme["b"],
    textAlign: "center",
  },
  login: {
    borderRadius: 12,
    backgroundColor: theme["b"],
    padding: 16,
    width: "90%",
    maxWidth: 300,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  registerForm: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme["b"],
  },
  divCenter: {
    alignItems: "center",
    width: "100%",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: theme["b"],
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
