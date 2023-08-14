import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import notifee from '@notifee/react-native';

const Notifee = () => {

  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    const notificationId = await notifee.displayNotification({
      id: '123',
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      },
    });

    // Sometime later...
    await notifee.displayNotification({
      id: '1234',
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View>
      <Text>Notifee Page</Text>
      <TouchableOpacity
        onPress={onDisplayNotification}
        style={{
          backgroundColor: '#4032a8',
          marginTop: '2%',
          padding: '2%'
        }}>
        <Text style={{ color: 'white' }}>Display Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Notifee;