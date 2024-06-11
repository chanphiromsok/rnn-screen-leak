import { StyleSheet } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import BackgroundGeolocation from "react-native-background-geolocation";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { enableScreens, freezeEnabled } from "react-native-screens";
import AppNavigation from "./AppNavigation";
import useBroadcastLocation from "./hook/useBroadcastLocation";

freezeEnabled();
enableScreens(false);
export default function App() {
  useBroadcastLocation();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={style.container}>
        <AppNavigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
const BackgroundGeolocationHeadlessTask = async (event) => {
  console.log("[BackgroundGeolocationHeadlessTask] -", event.name, event);
  switch (event.name) {
    case "heartbeat":
      await BackgroundGeolocation.getCurrentPosition({
        samples: 2,
        persist: true,
        extras: {
          event: "heartbeat",
          headless: true,
        },
      });
  }
};
const registerHeadlessTask = async (event) => {
  if (event.timeout) {
    console.log("[BackgroundFetch] 💀 HeadlessTask TIMEOUT: ", event.taskId);
    BackgroundFetch.finish(event.taskId);
    return;
  }
  await BackgroundGeolocation.getCurrentPosition({
    persist: true,
    extras: { headless: true },
  });
  BackgroundFetch.finish(event.taskId);
};
BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);
BackgroundFetch.registerHeadlessTask(registerHeadlessTask);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
