import React, { useEffect, useState } from "react";
import MicIcon from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import Voice from "@react-native-voice/voice";
export default function VoiceModule({ injectJavaScript }) {
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const speechStartHandler = (e) => {
    console.log("speechStart successful", e);
  };
  const speechEndHandler = (e) => {
    setLoading(false);
    console.log("stop handler", e);
  };
  const speechResultsHandler = (e) => {
    const text = e.value[0];
    setResult(text);
  };
  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start("ko-Kr");
    } catch (error) {
      console.log("error", error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const clear = () => {
    setResult("");
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#10172A",
      }}
    >
      <SafeAreaView
        style={{
          alignSelf: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: 16,
          backgroundColor: "white",
        }}
      >
        <View>
          <TextInput
            value={result}
            multiline={true}
            placeholder="말씀하세요!"
            style={{
              flex: 1,
              width: 200,
              height: "100%",
              backgroundColor: "white",
              padding: 8,
              fontSize: 20,
            }}
            onChangeText={(text) => setResult(text)}
          />
        </View>

        <TouchableOpacity onPress={clear}>
          <Text
            style={{
              backgroundColor: "#1E293B",
              color: "#909090",
              padding: 8,
              borderRadius: 20,
              fontSize: 20,
            }}
          >
            지우기
          </Text>
        </TouchableOpacity>
        <View style={{ padding: 10 }}>
          <Button
            title="보내기"
            onPress={() => {
              injectJavaScript(result);
              clear();
            }}
          />
        </View>
      </SafeAreaView>
      <View>
        <TouchableOpacity
          style={{ alignSelf: "center", width: 120, height: 110 }}
          activeOpacity={0.7}
          onPress={() => {
            if (isRecording) {
              setIsRecording(false);
              stopRecording();
            } else {
              setIsRecording(true);
              startRecording();
            }
          }}
        >
          {isLoading ? (
            <FontAwesome
              style={{
                backgroundColor: "#1E293B",
                paddingHorizontal: 28,
                paddingVertical: 19,
                borderRadius: 50,
                margin: 20,
              }}
              name="stop"
              size={25}
              color="#F76364"
            />
          ) : (
            <MicIcon
              style={{
                backgroundColor: "#1E293B",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 50,
                margin: 20,
              }}
              name="mic-none"
              size={48}
              color="#909090"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
