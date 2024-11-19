import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// import CameraScreen from '@/components/CameraScreen';
import Camera from "@/components/Camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import StandardBackground from "@/components/StandardBackground";

export default function HomeScreen() {
  return (
    <StandardBackground>
      <Text className="mt-16 text-center text-3xl">TRACIE APP</Text>
      <Image src={"https://yt3.googleusercontent.com/ieOUgEyL7jOdm9LnvbHhGJIBwlK1T7IpGo6SXR4z6XosOM5hPeHtAmeean78g-upblKNJXc4_Jc=s900-c-k-c0x00ffffff-no-rj"} className="h-56 w-full" />
    </StandardBackground>
  );
}
