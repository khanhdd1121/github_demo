import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import React from 'react';
import {COLORS} from './Theme';
import Input from '../component/input';
import Button from '../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../component/Loader';

const LoginScreens = ({navigation}) => {
  const [input, setinput] = React.useState({email: '', fullname: ''});
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!input.email) {
      handleError('Please input email', 'email');
      valid = false;
    }

    if (!input.password) {
      handleError('Please input password', 'password');
      valid = false;
    }
    if (valid) {
      login();
    }
  };
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          input.email == userData.email &&
          input.password == userData.password
        ) {
          navigation.navigate('homeScreen');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          );
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
      }
      console.log(userData);
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setinput(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setError(prevState => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 40,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          EDU.IO
        </Text>

        <Text
          style={{
            color: COLORS.black,
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Login
        </Text>

        <View style={{marginVertical: 20}}>
          <Input
            placeholder="Enter your email address"
            label={'Email'}
            error={error.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={text => handleOnchange(text, 'email')}

            // error="Input email"
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            error={error.password}
            password
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={text => handleOnchange(text, 'password')}
            // error="Input email"
          />
          <Button onPress={validate} title={'Login'} />
          <Text
            onPress={() => navigation.navigate('registrationScreens')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Sign up for an account?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreens;
