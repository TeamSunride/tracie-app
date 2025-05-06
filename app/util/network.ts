import {
  onConnected,
  onDisconnected,
  onTextReceived,
  requestConnection,
  startDiscovery,
  stopDiscovery,
  Strategy,
} from 'expo-nearby-connections';
import uuid from 'react-native-uuid';
import {connectToServer, readFromServer, scanBleDevices} from '../../util/ble';
import { TelemetryData } from './telemetry';
import { Peripheral } from 'react-native-ble-manager';

type DeviceType = 'master' | 'slave' | 'unknown';

export interface NetworkPayload {
    version: 1,
    data: TelemetryData,
};

export class Network {
  private deviceType: DeviceType = 'unknown';
  private deviceId = uuid.v4();
  public connected = false;
  public listenerData: any = {};
  private callback: (payload: TelemetryData) => void;

  async joinNetwork() {
    try {
      await this.tryNetworkConnection();
      this.connected = true;
      this.deviceType = 'slave';
    } catch (error) {
      this.connected = false;
      this.deviceType = 'unknown';
    }
    if (this.connected) {
      return;
    }
    try {
      await this.tryServerConnection();
      this.connected = true;
      this.deviceType = 'master';
    } catch (error) {
      this.connected = false;
      this.deviceType = 'unknown';
    }
  }

  private async tryNetworkConnection() {
    const peerId = await startDiscovery(
      this.deviceId,
      Strategy.P2P_POINT_TO_POINT,
    );
    console.log('PEER ID', peerId);
    // do some stuff
    await stopDiscovery();
    console.log('Stopping discovery...');
    await requestConnection(peerId);
    console.log('Connected...');
  }

  private registerNetworkListenersSlave() {
    console.log('Registering SLAVE listeners');
    this.listenerData.onTextReceived = onTextReceived(({peerId, text}) => {
      if (this.deviceType === 'slave') {
        // data received, we just use the data
        if (!this.callback) {
            throw new Error("Data received, but no callback provided. Please use onPayloadReceived to specify a callback function");
        }
        const payload: NetworkPayload = JSON.parse(text);
        console.log('Received data', payload);
        this.callback(payload.data);
      }
    });
  }

  private removeNetworkListenersSlave() {
    this.listenerData.onTextReceived();
  }

  private registerNetworkListenersMaster() {
    console.log('Registering MASTER listeners');
    this.listenerData.onConnected = onConnected(data => {});
    this.listenerData.onDisconnected = onDisconnected(data => {});
  }

  private removeNetworkListenersMaster() {
    this.listenerData.onConnected();
    this.listenerData.onDisconnected();
  }

  private async tryServerConnection() {
    const devices = await scanBleDevices();
    console.log('RETURNED DEVICES', devices);
    if (devices && devices.length > 0) {
      console.log('connecting to device', devices[0]);
      await connectToServer(devices[0]);
      this.registerServerListeners(devices[0]);
    } else {
      throw new Error('Connection to server failed');
    }
  }

  private registerServerListeners(peripheral: Peripheral) {
    setInterval(async () => {
      const text = await readFromServer(peripheral);
      console.log("raw data", text);
      const payload: TelemetryData = JSON.parse(text);
      console.log('Received data', payload);
      if (this.callback) this.callback(payload);
    }, 1000);
  }

  public onPayloadReceived(callback: (payload: TelemetryData) => void) {
    this.callback = callback;
  }
}

export const network = new Network();