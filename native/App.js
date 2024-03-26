import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function App() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: process.env.EXPO_PUBLIC_WEBVIEW_URL }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
