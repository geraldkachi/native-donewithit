import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import expoPushTokensApi from "../api/expoPushTokens";
import logger from "../utility/logger";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export default useNotifications = (notificationResponseListener) => {
	const registerForPushNotifications = async () => {
		try {
			const permission = await Notifications.getPermissionsAsync();
			if (!permission.granted) return;

			const token = await Notifications.getExpoPushTokenAsync({
				experienceId: "@tropicolx/DoneWithIt",
			});
			expoPushTokensApi.register(token.data);

			if (Platform.OS === "android") {
				Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: "#FF231F7C",
				});
			}
		} catch (error) {
			logger.log(error);
		}
	};

	useEffect(() => {
		registerForPushNotifications();

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		if (notificationResponseListener)
			Notifications.addNotificationResponseReceivedListener(
				notificationResponseListener
			);
	}, []);
};
