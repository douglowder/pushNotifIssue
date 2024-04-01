import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("ltsChannel", {
      name: "ltsChannel",
      sound: "sound.wav",
      importance: Notifications.AndroidImportance.MAX,
      audioAttributes: {
        usage: Notifications.AndroidAudioUsage.ALARM,
        contentType: Notifications.AndroidAudioContentType.SONIFICATION,
      },
    });
    await Notifications.setNotificationChannelAsync("fcm_fallback_notification_channel", {
      name: "fcm_fallback_notification_channel",
      sound: "sound.wav",
      importance: Notifications.AndroidImportance.MAX,
      audioAttributes: {
        usage: Notifications.AndroidAudioUsage.ALARM,
        contentType: Notifications.AndroidAudioContentType.SONIFICATION,
      },
    });
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      sound: "sound.wav",
      importance: Notifications.AndroidImportance.MAX,
      audioAttributes: {
        usage: Notifications.AndroidAudioUsage.ALARM,
        contentType: Notifications.AndroidAudioContentType.SONIFICATION,
      },
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  return token;
}
