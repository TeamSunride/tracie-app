import { Button } from "react-native";
import { Image, Text, View } from "react-native";
import advertise from "./advertise";
// import { Appearance, useColorScheme } from 'react-native';
// import { useColorScheme } from "nativewind";

export default function HomeScreen() {
  //     const { setColorScheme } = useColorScheme();
  //   setColorScheme("dark");

  return (
    <View className="bg-black">
      <Text className="mt-16 text-center text-3xl text-white">
        TRACIE APP 2
      </Text>
      <Image
        src={
          "https://yt3.googleusercontent.com/ieOUgEyL7jOdm9LnvbHhGJIBwlK1T7IpGo6SXR4z6XosOM5hPeHtAmeean78g-upblKNJXc4_Jc=s900-c-k-c0x00ffffff-no-rj"
        }
        className="h-56 w-full"
      />
      <Button title="Advertise" onPress={advertise} />
    </View>
  );
}
