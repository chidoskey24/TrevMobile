const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const extraNodeModules = {
  crypto : path.resolve(__dirname, 'node_modules/react-native-quick-crypto'),
  stream : path.resolve(__dirname, 'node_modules/stream-browserify'),
  buffer : path.resolve(__dirname, 'node_modules/buffer'),
  // plus every other Node-core shim you might need later
};


/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), {
    resolver: { extraNodeModules },
}, config);
