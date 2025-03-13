/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
// import App from "react-native-ble-manager/example/App";
import {name as appName} from './app.json';
import './globals.js';

AppRegistry.registerComponent(appName, () => App);
