const { getDefaultConfig } = require("expo/metro-config");
module.exports = (() => {
  const configs = getDefaultConfig(__dirname);
  configs.transformer = {
    ...configs.transformer,
    getTransformOptions: async () => ({
      transform: {
        inlineRequires: true,
      },
    }),
  };
  return configs;
})();
