import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addDetails } from './utils/menuSlice';
import crashlytics from '@react-native-firebase/crashlytics';

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
        style={{
          backgroundColor: 'red',
          marginTop: '2%',
          padding: '2%'
        }}>
        <Text style={{ color: 'white' }}>Go to Login page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Test Crash"
        onPress={() => crashlytics().crash()}
        style={{
          backgroundColor: 'brown',
          marginTop: '2%',
          padding: '2%'
        }}>
        <Text style={{ color: 'white' }}>Crash Test</Text>
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
        style={{
          backgroundColor: 'gray',
          marginTop: '2%',
          padding: '2%'
        }}>
        <Text style={{ color: 'white' }}>Crash Logging</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;