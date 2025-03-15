import { Image, View } from "react-native";
import logo from "../../logo.png";

export default function Logo() {
  return (
    <View style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        backgroundColor: "#000",
    }}>
      <Image source={logo} style={{ width: 300, height: 127, backgroundColor: "#000" }} />
    </View>
  );
}
