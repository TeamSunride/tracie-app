const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const exportConfig = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = withNativeWind(exportConfig, { input: "./global.css" });
