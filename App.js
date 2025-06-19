import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxStoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MainNavigator from "./src/navigation/MainNavigator";
import AppNavigation from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/Context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ReduxStoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </PersistGate>
        </ReduxStoreProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
