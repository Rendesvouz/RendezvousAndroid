import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import React from "react";
import { AppRegistry, Platform, View, Text } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import Toast from "react-native-toast-message";
import { Fragment } from "react";
import { windowHeight, windowWidth } from "./src/utils/Dimensions";
import { COLORS } from "./src/themes/themes";

const RootApp = ({ isHeadless }) => {
  const toastConfig = {
    rendezvousToast: ({ text2 }) => (
      <View
        style={{
          height: Platform.OS == "ios" ? windowHeight / 15 : 60,
          width: windowWidth / 1.1,
          backgroundColor: COLORS.rendezvousRed,
          borderRadius: 5,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
          {text2}
        </Text>
      </View>
    ),
  };

  return (
    <Fragment>
      <App />
      <Toast config={toastConfig} />
    </Fragment>
  );
};
registerRootComponent(RootApp);
