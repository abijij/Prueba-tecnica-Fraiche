import { useState, useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


export const NotificationPush = () => {

  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification(expoPushToken: string, title: string, body: string) {
    console.log(expoPushToken)
    console.log(title)
    console.log(body)
    console.log('Entro a send pushnotification')
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        if (Platform.OS === 'ios') {
          alert('Please enable push notifications for this app in the device settings.');
        } else if (Platform.OS === 'android') {
          alert('Favor de activar las notificaciones en la configuración del teléfono');
          // Linking.openSettings();
        }
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Utils/NotificationToken' + token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  return {
    notification,
    notificationListener,
    responseListener,
    setNotification,
    registerForPushNotificationsAsync,
    sendPushNotification
  }
}