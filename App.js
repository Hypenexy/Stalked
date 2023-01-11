import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";

export default function App() {
  console.log("app launched");

  const sosBtn = () => console.log("kur appears");

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.sos} onPress={sosBtn}>
        <Text style={styles.sosText}>SOS</Text>
      </Pressable>

      <View style={styles.div}>
        <Text style={styles.divTitle}>your data</Text>
      </View>
      <View style={styles.div}>
        <Text style={styles.divTitle}>logged with</Text>
      </View>
      <Text>About</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sos: {
    width: 99,
    height: 99,
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
