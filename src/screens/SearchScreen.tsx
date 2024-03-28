import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useState, useCallback } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChatContact } from './ChatScreen';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { useSelector } from 'react-redux';
import { State } from '../redux/Reducer';
import GlobleStyle from '../utils/GlobleStyle';

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<any>): JSX.Element => {

  const [searchTxt, setSearchTxt] = useState<string>('');
  const [result, setResult] = useState<ChatContact[]>([]);
  const token = useSelector((state: State) => state.token);

  const {debounce} = require('lodash');

  const searchUser = (val: string) => {
    axios
      .get(`${BASE_URL}retrieve_user_with_name/?name=${val}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => setResult(res.data))
      .catch(err => Alert.alert('Api error', err.message));
  };

  const searchDebounce = useCallback(debounce(searchUser, 500), []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: '#f3edff',
          borderWidth: 1,
          borderColor: '#0d0d0f',
          borderRadius: 55,
          flexDirection: 'row',
        }}>
        <TextInput
          style={{flex: 1}}
          value={searchTxt ?? ''}
          onChangeText={val => {
            setSearchTxt(val);
            searchDebounce(val);
          }}
          placeholder="Search"
        />
        <Image
          style={{
            width: 25,
            height: 25,
            end: 0,
            bottom: 0,
            top: 0,
            alignSelf: 'center',
          }}
          source={require('../images/ic_search.png')}
        />
      </View>
      <FlatList
        style={{flex: 1}}
        data={result}
        renderItem={({index, item}) => {
          return (
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 25,
                overflow: 'hidden',
                backgroundColor: '#d3c5ff',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{width: 45, height: 45, backgroundColor: '#e6dac8'}}
                    alt="../images/ic_person.png"
                    source={
                      item.image_url
                        ? {uri: item.image_url}
                        : require('../images/ic_person.png')
                    }
                  />
                  <Text
                    style={[
                      GlobleStyle.bodyMedium,
                      {alignSelf: 'center', marginStart: 10},
                    ]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;