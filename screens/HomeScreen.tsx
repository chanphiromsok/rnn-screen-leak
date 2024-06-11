import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import BackgroundGeolocation from "react-native-background-geolocation";
import { backgroundLocationCommonConfigs } from "../hook/useBroadcastLocation";

const HomeScreen = () => {
  const [start, setStart] = useState(false);
  const previousTask = useRef<number>();
  useEffect(() => {
    BackgroundFetch.start();
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        enableHeadless: true,
        startOnBoot: true,
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false,
        requiresBatteryNotLow: true,
        requiresStorageNotLow: false, // Default
      },
      async (taskId) => {
        console.log("[js] Received background-fetch event: ", taskId);
        BackgroundGeolocation.getCurrentPosition({
          persist: true,
          extras: { headless: false },
        });
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log("[js] RNBackgroundFetch failed to start", error);
      }
    );
    BackgroundGeolocation.startBackgroundTask(async (taskKey) => {
      previousTask.current = taskKey;
      BackgroundGeolocation.setConfig(
        {
          ...backgroundLocationCommonConfigs,
          stopOnTerminate: false,
          url: "http://localhost:4000",
          headers: {
            "Content-Type": "application/json",
          },
        },
        () => {
          BackgroundGeolocation.start();
          BackgroundGeolocation.stopBackgroundTask(taskKey);
          previousTask.current = undefined;
        },
        (error: any) => {
          console.log(error);
          BackgroundGeolocation.stopBackgroundTask(taskKey);
          previousTask.current = undefined;
        }
      );
    });
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ padding: 10, fontWeight: "600", fontSize: 18 }}>
        HomeScreen{" "}
        <Text
          style={{
            color: start ? "blue" : "red",
          }}
        >
          {start ? "Start" : "Stop"}
        </Text>
      </Text>
    </View>
  );
};

export default HomeScreen;
const style = StyleSheet.create({
  start: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },
  stop: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
  },
});
