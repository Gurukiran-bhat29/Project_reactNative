/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import HomeScreen from './src/HomeScreen';
import Login from './src/Login';
import store from './src/utils/store';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  useEffect(() => {

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      >
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
});

export default App;
