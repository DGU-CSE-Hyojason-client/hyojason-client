import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import WebView from "react-native-webview";
import HomeIcon from "@expo/vector-icons/MaterialCommunityIcons";
import GroupIcon from "@expo/vector-icons/FontAwesome6";
import ChatIcon from "@expo/vector-icons/Ionicons";
import VoiceModule from "./Voice";

const route = [
  { name: "홈", path: "/", Icon: HomeIcon, iconName: "home-variant" },
  { name: "매칭", path: "/matching", Icon: GroupIcon, iconName: "user-group" },
  {
    name: "채팅",
    path: "/chat",
    Icon: ChatIcon,
    iconName: "chatbubble-ellipses",
  },
];

const routeItems =
  route.length > 5
    ? route
    : // @ts-expect-error ts-ignore
      route.concat(Array.from({ length: 5 - route.length }).fill(route[0]));

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [here, setHere] = useState("/");

  const webviewRef = useRef(null);

  const injectJavaScript = (text) => {
    const script = `
      document.getElementById('root').dispatchEvent(new CustomEvent('changeInput', { detail: ${text} }));
    `;
    webviewRef.current.injectJavaScript(script);
  };

  return (
    // <View
    //   style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    // >
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: "center", justifyContent: "center" }}>
    //     <WebView
    //       style={styles.container}
    //       originWhitelist={["*"]}
    //       source={{ uri: process.env.EXPO_PUBLIC_WEBVIEW_URL }}
    //     />
    //     <Text>
    //       Title: {notification && notification.request.content.title}{" "}
    //     </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>
    //       Data:{" "}
    //       {notification && JSON.stringify(notification.request.content.data)}
    //     </Text>
    //   </View>
    //   <Button
    //     title="Press to Send Notification"
    //     onPress={async () => {
    //       await sendPushNotification(expoPushToken);
    //     }}
    //   />
    // </View>
    <>
      <View style={{ marginTop: __DEV__ ? 30 : 0 }}></View>

      <WebView
        ref={webviewRef}
        style={styles.container}
        originWhitelist={["*"]}
        source={{
          uri: `${
            process.env.EXPO_PUBLIC_WEBVIEW_URL ||
            "https://hyojason-client.vercel.app"
          }${here}`,
        }}
        javaScriptEnabled={true}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: 0,
        }}
      >
        {here === "/chat" && (
          <VoiceModule injectJavaScript={injectJavaScript} />
        )}
        <View
          style={{
            backgroundColor: "#1E293B",
            display: "flex",
            paddingRight: 16,
            paddingLeft: 16,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {routeItems
            .map(({ path, name, Icon, iconName }) => ({
              to: path,
              name,
              Icon,
              iconName,
            }))
            .map(({ to, name, Icon, iconName }, i) => {
              const color = to === here ? "#ffffff" : "#909090";
              const size = name === "매칭" ? 15 : 20;
              return (
                <TouchableOpacity
                  id={`${name}-${i}`}
                  key={`${name}-${i}`}
                  style={{ padding: 4 }}
                  onPress={() => {
                    setHere(to);
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={{ height: 20, width: 20 }}>
                      <Icon name={iconName} size={size} color={color} />
                    </View>
                    <Text style={{ color, fontSize: 16 }}>{name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
