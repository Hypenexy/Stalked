// const server = "http://10.0.2.2/Stalked/api/";
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

import * as $ from 'jquery';

import { LinearGradient } from "expo-linear-gradient";

import "./languages/i18n";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("bg");

  const sendData = (url, data, successAction, rejectAction) => {
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then(response => response.json())
    .then(data => {
      successAction(data)
    })
    .catch(error => {
      rejectAction(error)
    });
  }

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

  const [ISshowWelcome, setISshowWelcome] = useState(true);
  const showWelcome = () => {
    setISshowWelcome(true);
  };
  const hideWelcome = () => {
    setISshowWelcome(false);
  };

  const [ISshowRegister, setISshowRegister] = useState(false);
  const showRegister = () => {
    setISshowRegister(true);
  };
  const hideRegister = () => {
    setISshowRegister(false);
  };

  const [ISshowLogin, setISshowLogin] = useState(false);
  const showLogin = () => {
    setISshowLogin(true);
  };
  const hideLogin = () => {
    setISshowLogin(false);
  };

  const client = async () => {
    await CookieManager.clearAll(); //clearing cookies stored
    //natively before each
    //request
    const cookie = await AsyncStorage.getItem("cookie");
    return await fetch("api/data", {
      headers: {
        cookie: cookie,
      },
    });
  };

  const loginButton = () => {
    if (
      onEmail !== undefined ||
      onPassword !== undefined
    ) {
      var data = {
        type: "login",
        email: onEmail,
        password: onPassword,
      };

      console.log(data)

      sendData("https://midelight.net/Stalked/api/account/", data,
        function(data){
          console.log(data)
          console.log(data.status)
          if(data.status==201){
            hideWelcome()
          }
        },
        function(data){
          console.log(data)
        }
      )
    }
  }

  const registerButton = () => {
    // I don't know how to check for a timeout
    if (
      onEmail !== undefined ||
      onUsername !== undefined ||
      onPassword !== undefined
    ) {
      var data = {
        type: "register",
        email: onEmail,
        username: onUsername,
        password: onPassword,
      };

      sendData("https://midelight.net/Stalked/api/account/", data,
        function(data){
          console.log(data)
          console.log(data.status)
          if(data.status==201){
            hideWelcome()
          }
        },
        function(data){
          console.log(data)
        }
      )
    }
  };

  //https://www.npmjs.com/package/react-native-bluetooth-devices

  const [errText, seterrText] = useState("");

  var loggedIn = false;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {ISshowWelcome ? (
        <LinearGradient colors={[theme["b"], theme[6]]} style={styles.loginDiv}>
          <Image
            style={styles.loginImage}
            source={require("./assets/Running-Man.png")}
          />
          {ISshowLogin ? (
            <View style={styles.registerForm}>
              <Text style={styles.loginWelcome}>{t("signIn")}</Text>
              <View style={styles.divCenter}>
                <TextInput
                  autoComplete="email"
                  inputMode="email"
                  keyboardType="email-address"
                  style={styles.loginInput}
                  onChangeText={(e) => {
                    onEmail = e;
                  }}
                  placeholder={t("emailOrUsername")}
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
                <Text style={styles.loginInputError}>{errText}</Text>
              </View>
              <View style={styles.divCenter}>
                <Pressable style={styles.login} onPress={hideLogin}>
                  <Text style={styles.loginText}>{t("createAnAccountInstead")}</Text>
                </Pressable>
                <Pressable style={styles.register} onPress={loginButton}>
                  <Text style={styles.registerText}>
                    {t("signIn")}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}
          {ISshowRegister ? (
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
                    if (reg.test(onEmail) === false) {
                      seterrText("Email is incorrect format");
                    } else {
                      if (errText == "Email is incorrect format") {
                        // there are some cases where the error message will be removed but im too lazy to fix
                        seterrText("");
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
                      seterrText("Username must be between 3 and 30 characters");
                    } else {
                      if (
                        errText == "Username must be between 3 and 30 characters"
                      ) {
                        seterrText("");
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
                <Text style={styles.loginInputError}>{errText}</Text>
              </View>
              <View style={styles.divCenter}>
                <Pressable style={styles.login} onPress={hideRegister}>
                  <Text style={styles.loginText}>{t("signInInstead")}</Text>
                </Pressable>
                <Pressable style={styles.register} onPress={registerButton}>
                  <Text style={styles.registerText}>
                    {t("createAnAccount")}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}
          <View style={styles.bottomWelcome}>
            <Text style={styles.loginWelcome}>{t("welcome")}</Text>
            <Text style={styles.loginWelcome2}>{t("welcomeDescription")}</Text>
            <Pressable style={styles.register} onPress={showRegister}>
              <Text style={styles.registerText}>{t("createAnAccount")}</Text>
            </Pressable>
            <Pressable style={styles.login} onPress={showLogin}>
              <Text style={styles.loginText}>{t("signIn")}</Text>
            </Pressable>
          </View>
        </LinearGradient>) : null}

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
    overflow: "hidden",
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
  registerFormHidden: {
    display: "none",
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
