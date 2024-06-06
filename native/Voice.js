import React, { useEffect, useState } from "react";
import MicIcon from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import Tts from "react-native-tts";

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

  useEffect(() => {
    // TTS 초기화 및 언어 설정
    Tts.setDefaultLanguage("ko-KR");
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fef9f7",
      }}
    >
      <SafeAreaView
        style={{
          alignSelf: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: 16,
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
              padding: 8,
              backgroundColor: "#f3eee8",
              fontSize: 20,
            }}
            onChangeText={(text) => setResult(text)}
          />
        </View>

        <TouchableOpacity onPress={clear}>
          <Text
            style={{
              backgroundColor: "#a39e98",
              color: "white",
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
        <View>
          <Button
            title="tts"
            onPress={() => {
              Tts.speak("안녕하세요");
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
                backgroundColor: "#e5be8f",
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
                backgroundColor: "#e5be8f",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 50,
                margin: 20,
              }}
              name="mic-none"
              size={48}
              color="white"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
