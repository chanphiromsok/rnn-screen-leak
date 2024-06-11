import { useEffect } from "react";
import { Platform } from "react-native";
import BackgroundGeolocation, {
  Config,
} from "react-native-background-geolocation";
export const backgroundLocationCommonConfigs: Config = {
  url: undefined,
  debug: false,
  isMoving: true,
  autoSync: true,
  enableHeadless: true,
  startOnBoot: true,
  preventSuspend: true,
  distanceFilter: 5,
  disableElasticity: true,
  batchSync: true,
  maxBatchSize: 2,
  speedJumpFilter: 50,
  maxRecordsToPersist: 2,
  disableAutoSyncOnCellular: false,
  allowIdenticalLocations: false,
  persistMode: BackgroundGeolocation.PERSIST_MODE_LOCATION,
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  heartbeatInterval: 120, //2 minutes
  backgroundPermissionRationale: {
    message: "Your location will be traced",
  },
  notification: {
    title: "RNN SCREEN",
    text: "Running foreground service",
    sticky: true,
  },
  stopTimeout: Platform.select({
    android: 15,
    ios: 30,
  }),
};
const useBroadcastLocation = () => {
  // Config and Start Foreground service
  useEffect(() => {
    BackgroundGeolocation.ready(backgroundLocationCommonConfigs);
  }, []);
};
export default useBroadcastLocation;
