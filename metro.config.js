const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const exportConfig = mergeConfig(getDefaultConfig(__dirname), config);

const nativeWindConfig = withNativeWind(exportConfig, {input: './global.css'});

module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
