import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addDetails } from './utils/menuSlice';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(addDetails('popu'));
  }, [])

  const changeVal = async () => {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute('credits', String(user.credits)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: user.email,
        username: user.username,
      }),
    ]);
  }

  return (
    <View style={styles.Container}>
      <Text>Home Page</Text>
      <TouchableOpacity
        title="Navigate Login"
        onPress={() => navigation.navigate('Login')}
        style={[
          styles.buttonStyle, 
          { backgroundColor: 'red'}
        ]}>
        <Text style={styles.buttonColor}>Go to Login page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Test Crash"
        onPress={() => crashlytics().crash()}
        style={[
          styles.buttonStyle, 
          { backgroundColor: 'brown'}
        ]}>
        <Text style={styles.buttonColor}>Crash Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Crash logging"
        onPress={() =>
          changeVal({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          })
        }
        style={[
          styles.buttonStyle, 
          { backgroundColor: 'gray'}
        ]}>
        <Text style={styles.buttonColor}>Crash Logging</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Custom Events"
        onPress={async () =>
          await analytics().logEvent('basket', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }
        style={[
          styles.buttonStyle, 
          { backgroundColor: 'black'}
        ]}>
        <Text style={styles.buttonColor}>Custom Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Predefined Events"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={async () =>
          await analytics().logSelectContent({
            content_type: 'clothing',
            item_id: 'abcd',
          })
        }
        style={[
          styles.buttonStyle, 
          { backgroundColor: 'orange'}
        ]}>
        <Text style={styles.buttonColor}>Predefined Events</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    marginTop: '2%',
    padding: '2%'
  },
  buttonColor: {
    color: 'white' 
  }
});

export default HomeScreen;