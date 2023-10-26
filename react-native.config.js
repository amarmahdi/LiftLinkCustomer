module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./assets/fonts/"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow $(PRODUCT_NAME) to use your location.",
      },
    ],
  ],
  dependencies: {
    "react-native-config": {
      platforms: {
        ios: null,
      },
    },
  },
};
