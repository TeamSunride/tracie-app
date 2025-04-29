import {
  onConnected,
  onDisconnected,
  onTextReceived,
  requestConnection,
  startDiscovery,
  stopDiscovery,
  Strategy,
} from 'expo-nearby-connections';
import {randomUUID} from 'crypto';
import {connectToServer, scanBleDevices} from '../../util/ble';
import { TelemetryData } from './telemetry';

type DeviceType = 'master' | 'slave' | 'unknown';

export interface NetworkPayload {
    version: 1,
    data: TelemetryData,
};

export class Network {
  private deviceType: DeviceType = 'unknown';
  private deviceId = randomUUID();
  public connected = false;
  public listenerData: any = {};
  private callback: (payload: NetworkPayload) => void;

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
    } else {
      throw new Error('Connection to server failed');
    }
  }

  private registerServerListeners() {}

  public onPayloadReceived(callback: (payload: NetworkPayload) => void) {
    this.callback = callback;
  }
}
