import { CameraView, useCameraPermissions } from "expo-camera";
import { Pressable, Text } from "react-native";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <>
      {!isPermissionGranted && (
        <Pressable onPress={requestPermission}>
          <Text>Request Camera Permission</Text>
        </Pressable>
      )}
      {isPermissionGranted && (
        <CameraView
          facing="back"
          onBarcodeScanned={(scanData) => console.log(scanData)}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </>
  );
}
