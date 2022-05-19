import {View, Text, SafeAreaView, ScrollView, Keyboard} from 'react-native';
import React from 'react';
import Input from '../component/input';
import {COLORS} from './Theme';
import Button from '../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../component/Loader';
const RegistrationScreens = ({navigation}) => {
  const [input, setinput] = React.useState({
    email: '',
    fullname: '',
    phonenumber: '',
    password: '',
  });
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!input.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      valid = false;
    }
    if (!input.fullname) {
      handleError('Please input fullname', 'fullname');
      valid = false;
    }

    if (!input.phonenumber) {
      handleError('Please input phonenumber', 'phonenumber');
      valid = false;
    }

    if (!input.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (input.password.length < 5) {
      handleError('Min password legth of 5', 'password');
    }

    if (valid) {
      register();
    }
  };
  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem('userData', JSON.stringify(input));
        navigation.navigate('loginScreens');
      } catch (error) {
        alert('Error', 'Something went wrong');
      }
      console.log(input);
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
          Registration
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
            placeholder="Enter your fullname"
            label="FullName"
            error={error.fullname}
            onFocus={() => {
              handleError(null, 'fullname');
            }}
            onChangeText={text => handleOnchange(text, 'fullname')}

            // error="Input email"
          />
          <Input
            keyboardType="numeric"
            placeholder="Enter your phone number"
            label="Phone Number"
            error={error.phonenumber}
            onFocus={() => {
              handleError(null, 'phonenumber');
            }}
            onChangeText={text => handleOnchange(text, 'phonenumber')}
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
          <Button onPress={validate} title={'Registration'} />
          <Text
            onPress={() => navigation.navigate('loginScreens')}
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Already have account?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreens;
