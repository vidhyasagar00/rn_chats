import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CHATS_BASE_URL} from '../utils/Constants';

const category = ['all', 'favourites', 'groups'];

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type ChatContact = {
  id: string;
  name: string;
  image_url: string;
  is_group_chat: Boolean;
  last_message_id: string;
  lastMessage: Message;
  participant_ids: string[];
  created_at: string;
  updated_at: string;
};

const ChatScreen = ({navigation}: NativeStackScreenProps<any>): JSX.Element => {
  const [contact, setContact] = useState<ChatContact[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const getContacts = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log(token);
    if (token != null && token.length > 0) {
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      axios
        .get(CHATS_BASE_URL + 'chats', config)
        .then(res => {
          console.log('chat response ----> \n\n\n\n' + res.data);
          setContact(res.data);
        })
        .catch(err => {
          console.log(err);
          Alert.alert('Api error', 'unable to fetch contacts\n' + err.message);
        });
    }
  };

  useEffect(() => {
    getUser();
    getContacts();
  }, []);

  const getUser = () => {
    try {
      AsyncStorage.getItem('accessToken').then(value => {
        if (value == null) {
          navigation.pop();
          navigation.navigate('intro_screen');
        }
      });
    } catch (e) {
      navigation.pop();
      navigation.navigate('intro_screen');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#003049',
          paddingTop: 20,
          paddingBottom: 100,
        }}>
        <Image
          style={{width: 35, height: 35, alignSelf: 'flex-end'}}
          source={require('../images/ic_search.png')}
        />
        <FlatList
          data={category}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedCategory(index)}>
                <View
                  style={[
                    {
                      backgroundColor: '#FFFFFF',
                      marginHorizontal: 10,
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 10,
                    },
                    selectedCategory == index
                      ? {
                          backgroundColor: '#cec6fa',
                          paddingHorizontal: 18,
                          paddingVertical: 8,
                        }
                      : {},
                  ]}>
                  <Text style={{fontWeight: 'bold'}}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderTopStartRadius: 50,
          borderTopEndRadius: 50,
          marginTop: -50,
          backgroundColor: '#FFFFFF',
        }}>
        <FlatList
          data={contact}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  marginHorizontal: 15,
                  borderRadius: 15,
                  backgroundColor: '#ffffff',
                  overflow: 'hidden'
                }}>
                <Image
                  style={{width: 65, height: 65}}
                  source={{uri: item.image_url}}
                />
                <View style={{flex: 1, backgroundColor: '#ded1ff'}}>
                  <Text>{item.name}</Text>
                  <Text>{item.lastMessage?.content ?? ''}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
