import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { SafeAreaView, View } from "react-native";

export default function StandardBackground({ children }) {
  const { setColorScheme } = useColorScheme();
  setColorScheme("system");

  return (
    <View className="flex-[1] dark:text-white text-black dark:bg-black bg-white bg-fixed bg-cover bg-no-repeat">
      <StatusBar style="auto" />
      <SafeAreaView />
      {children}
    </View>
  );
}
