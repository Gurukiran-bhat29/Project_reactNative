import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";

const Login = ({ navigation }) => {

  const menuVal = useSelector(store => store.menu.userDetails);
  console.log('menu', menuVal);

  return (
    <View>
      <Text>Login Page</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          backgroundColor: 'red',
          marginTop: '2%',
          padding: '2%'
        }}>
        <Text style={{ color: 'white' }}>Go to Home page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notifee')}
        style={{
          backgroundColor: '#4032a8',
          marginTop: '2%',
          padding: '2%'
        }}>
        <Text style={{ color: 'white' }}>Go to Notifee page</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;