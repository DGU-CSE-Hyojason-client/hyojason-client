import { TouchableOpacity, View } from "react-native";
import MicIcon from "@expo/vector-icons/MaterialIcons";

export default function Recording() {
  return (
    <View>
      <TouchableOpacity style={{ alignSelf: "center" }} activeOpacity={0.7}>
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
      </TouchableOpacity>
    </View>
  );
}
