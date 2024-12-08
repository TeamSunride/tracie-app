import {NativeEventEmitter, NativeModules} from 'react-native';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';
import {Buffer} from 'buffer';

const SECONDS_TO_SCAN_FOR = 3;
const SERVICE_UUIDS: string[] = ['B370'];
const ALLOW_DUPLICATES = false;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export function scanBleDevices(
  serviceUuids = SERVICE_UUIDS,
  secondsToScanFor = SECONDS_TO_SCAN_FOR,
) {
  return new Promise(async (resolve, reject) => {
    try {
      console.debug('[startScan] starting scan...');
      const peripherals: Peripheral[] = [];
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        (peripheral: Peripheral) => {
          console.debug('[startScan] discovered peripheral', peripheral);
          // do something with the discovered peripheral
          peripherals.push(peripheral);
        },
      );
      bleManagerEmitter.addListener('BleManagerStopScan', () => {
        console.debug('[startScan] scan stopped.');
        bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
        bleManagerEmitter.removeAllListeners('BleManagerStopScan');
        console.log(peripherals);
        return resolve(peripherals);
      });

      BleManager.scan(serviceUuids, secondsToScanFor, ALLOW_DUPLICATES, {
        matchMode: BleScanMatchMode.Sticky,
        scanMode: BleScanMode.LowLatency,
        callbackType: BleScanCallbackType.AllMatches,
      })
        .then(() => {
          console.debug('[startScan] scan promise returned successfully.');
        })
        .catch((err: any) => {
          console.error('[startScan] ble scan returned in error', err);
          bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
          bleManagerEmitter.removeAllListeners('BleManagerStopScan');
          return reject(err);
        });
    } catch (error) {
      console.error('[startScan] ble scan error thrown', error);
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      return reject();
    }
  });
}

const connectPeripheral = async (peripheral: Peripheral) => {
  try {
    await BleManager.connect(peripheral.id);
    console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

    // before retrieving services, it is often a good idea to let bonding & connection finish properly
    await sleep(900);

    /* Test read current RSSI value, retrieve services first */
    const peripheralData = await BleManager.retrieveServices(peripheral.id);
    console.debug(
      `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
      peripheralData,
    );

    const rssi = await BleManager.readRSSI(peripheral.id);
    console.debug(
      `[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
    );

    if (peripheralData.characteristics) {
      for (let characteristic of peripheralData.characteristics) {
        if (characteristic.descriptors) {
          for (let descriptor of characteristic.descriptors) {
            try {
              let data = await BleManager.readDescriptor(
                peripheral.id,
                characteristic.service,
                characteristic.characteristic,
                descriptor.uuid,
              );
              console.debug(
                `[connectPeripheral][${peripheral.id}] ${characteristic.service} ${characteristic.characteristic} ${descriptor.uuid} descriptor read as:`,
                data,
              );
            } catch (error) {
              console.error(
                `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                error,
              );
            }
          }
        }
      }
    }

    return Promise.resolve(peripheralData);
  } catch (error) {
    console.error(
      `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
      error,
    );
  }
};

export async function connectToServer(peripheral: Peripheral) {
  console.log('CONNECTING TO PERIPHERAL', peripheral.id);
  await connectPeripheral(peripheral);
  // send data to newly connected peripheral
  console.log(peripheral);
  try {
    const response = await BleManager.read(peripheral.id, 'B370', 'B371');
    console.log('read data:', Buffer.from(response, 'base64').toString('utf8'));
  } catch (error) {
    console.error('Error reading data from peripheral', error);
  }
}
