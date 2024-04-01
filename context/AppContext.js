import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { View, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "../NotificationService";
import { getDataVal, storeDataVal } from "../utils/AsyncStorageFunctions";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState("loading");
  const [pushToken, setPushToken] = useState("loading");
  const notificationListener = useRef();
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
    }),
  });

  const loadToken = async () => {
    const storedToken = await getDataVal("token");
    setToken(storedToken || null);
  };

  const loadPushToken = async () => {
    const storedPushToken = await getDataVal("pushToken");
    if (storedPushToken) {
      setPushToken(storedPushToken);
    } else {
      const newToken = await registerForPushNotificationsAsync();
      if (newToken) {
        await storeDataVal("pushToken", newToken.data);
        setPushToken(newToken.data);
      } else {
        setPushToken(null);
      }
    }
  };

  useEffect(() => {
    loadToken();
    loadPushToken();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  const changeToken = async (newToken) => {
    setToken(newToken);
    await storeDataVal("token", newToken);
  };

  if (token === "loading" || pushToken === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={70} color="grey" />
      </View>
    );
  }

  return (
    <AppContext.Provider value={{ token, changeToken, signOut, pushToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
