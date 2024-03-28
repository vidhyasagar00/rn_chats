import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import GlobleStyle from '../utils/GlobleStyle';
import AuthTextField from '../components/AuthTextField';
import axios from 'axios';
import {BASE_URL} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}: any): JSX.Element => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const signIn = async () => {
    const data = {
      email: name,
      password: password,
    };

    axios
      .post(BASE_URL + 'auth/token', data)
      .then(async response => {
        if (response?.data?.refresh_token && response.data.access_token) {
          await AsyncStorage.setItem('accessToken', response.data.access_token);
          await AsyncStorage.setItem(
            'refreshToken',
            response.data.refresh_token,
          );
          navigation.pop();
          navigation.navigate('chat_screen');
        } else {
          Alert.alert('Sign In Error', 'response is empty');
        }
      })
      .catch(err => {
        Alert.alert(
          'Sign In Error',
          err.message ?? 'Invalid response try again',
        );
      });
  };

  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
      <View style={[style.circle, {right: -25, top: -55, opacity: 0.2}]} />
      <View style={[style.circle, {right: -40, top: -70}]} />

      <View style={[style.circle, {bottom: -90, left: 10, opacity: 0.2}]} />
      <View style={[style.circle, {bottom: -110, left: 0}]} />

      <View style={style.container}>
        <Text style={[GlobleStyle.titleMedium]}>SIGN IN</Text>
        <AuthTextField
          iconSource={require('../images/ic_person.png')}
          value={name}
          onChangeText={value => setName(value)}
          placeholder="Enter your email"
        />
        <AuthTextField
          iconSource={require('../images/ic_lock.png')}
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="password"
        />

        <TouchableOpacity style={style.button} onPress={signIn}>
          <Text style={style.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        <Text
          style={[
            GlobleStyle.labelSmall,
            {alignSelf: 'center', marginBottom: 15},
          ]}>
          Forgot password?{' '}
        </Text>

        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={GlobleStyle.labelSmall}>don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('signup_screen')}>
            <Text style={[GlobleStyle.labelSmall, {color: '#003049'}]}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ActivityIndicator
        size={'large'}
        style={GlobleStyle.loader}
        animating={isLoading}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    rowGap: 25,
    elevation: 5,
    left: -1,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonText: {
    color: '#eae2b7',
    alignSelf: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#003049',
    paddingVertical: 10,
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#003049',
  },
});

export default SignInScreen;
