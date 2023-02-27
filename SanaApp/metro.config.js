// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/* Define file types for bundler to accept when compiling. */
defaultConfig.resolver.assetExts.push('db');

module.exports = defaultConfig;
