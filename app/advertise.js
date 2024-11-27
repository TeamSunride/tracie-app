import BleAdvertise from "react-native-ble-advertise";

// BleAdvertise.setCompanyId("00E0");

const uuid = "44C13E43-097A-9C9F-537F-5666A6840C08";
const major = parseInt("CD00", 16);
const minor = parseInt("0003", 16);

export default function advertise() {
  BleAdvertise.broadcast(uuid, major, minor)
    .then((success) => {
      console.log("broadcast started");
    })
    .catch((error) => {
      console.log("broadcast failed with: " + error);
    });
}
