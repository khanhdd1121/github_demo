import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import LoginScreens from './Screens/LoginScreens';
import RegistrationScreens from './Screens/RegistrationScreens';
import SplashScreen from './Screens/SplashScreen';
import Basic from './Screens/Basic';
import Advanced from './Screens/Advanced';
import Xemay from './Screens/xemay';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="plashScreen"
          component={SplashScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="registrationScreens"
          component={RegistrationScreens}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="loginScreens"
          component={LoginScreens}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="basic"
          component={Basic}
          options={{header: () => null}}
        />

        <Stack.Screen
          name="advanced"
          component={Advanced}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="xemay"
          component={Xemay}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
