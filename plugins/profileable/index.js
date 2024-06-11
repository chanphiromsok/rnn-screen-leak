const { withAndroidManifest } = require('@expo/config-plugins');
const { withPlugins } = require('@expo/config-plugins');

const withProfileableAndroid = (config, { mode }) => {
  if (!!mode && mode === 'development') {
    config = withAndroidManifest(config, async (newConfig) => {
      newConfig.modResults.manifest.application[0]['profileable'] = {
        $: { 'android:shell': 'true', 'android:enabled': 'true' },
      };

      return newConfig;
    });
  }

  return config;
};

module.exports = (config, props) => {
  return withPlugins(config, [[withProfileableAndroid, props]]);
};
