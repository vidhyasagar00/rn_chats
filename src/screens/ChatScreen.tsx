import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL, CHATS_BASE_URL } from '../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import LocalStorage from '../utils/LocalStorage';
import { useSelector } from 'react-redux';
import { State } from '../redux/Reducer';
import GlobleStyle from '../utils/GlobleStyle';

const category = ['all', 'favourites', 'groups'];

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ChatContact = {
  id: string;
  name: string;
  image_url: string;
  is_group_chat: Boolean;
  last_message_id: string;
  last_message: Message;
  participant_ids: string[];
  created_at: string;
  updated_at: string;
};

type ChatProp = {chat: ChatContact};
const ChatContainer = ({chat}: ChatProp): JSX.Element => {
  const [imageError, setImageError] = useState(false);
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('conversation_screen', chat)}
      style={{
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}>
      <Image
        style={{width: 65, height: 65}}
        onError={e => {
          setImageError(true);
        }}
        alt="../images/ic_person.png"
        source={
          chat.image_url && !imageError
            ? {uri: chat.image_url}
            : require('../images/ic_person.png')
        }
      />
      <View style={{flex: 1, backgroundColor: '#ded1ff', paddingHorizontal: 10, paddingVertical: 5}}>
        <Text style={[GlobleStyle.titleSmall, {}]}>{chat.name}</Text>
        <Text style={[GlobleStyle.labelMedium, {color: '#000'}]}>{chat.last_message?.content ?? ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ChatScreen = ({navigation}: NativeStackScreenProps<any>): JSX.Element => {
  const [contact, setContact] = useState<ChatContact[]>([]);
  const [filteredContent, setFilteredContent] = useState<ChatContact[]>([])
  const [selectedCategory, setSelectedCategory] = useState(0);

  const localStorage = new LocalStorage();
  const token = useSelector((state: State) => state.token);

  const getContacts = async () => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };      
    
    axios
      .get(CHATS_BASE_URL + 'chats', config)
      .then(res => {
        setContact(res.data);
      })
      .catch(err => {
        getRefreshToken();
      });
  };

  const getRefreshToken = async () => {
    let refreshToken = await localStorage.getValue('refreshToken');
    axios
      .get(BASE_URL + 'refresh_access_token?refresh_token=' + refreshToken)
      .then(res => {
        localStorage.setValue('refreshToken', res.data?.refresh_token);
        localStorage.setValue('accessToken', res.data?.access_token);
        getContacts();
      })
      .catch(err => {
        Alert.alert('Api error', 'unable to fetch contacts\n' + err.message);
      });
  };

  useEffect(() => {
    if(contact.length) {
      if(selectedCategory === 2) {
        setFilteredContent(contact.filter( item => item.is_group_chat))
      } else {
        setFilteredContent(contact)
      }
    }
  }, [contact, selectedCategory])

  useEffect(() => {
    if(token) {
      getContacts();
    }
  }, [token]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#003049',
          paddingTop: 20,
          paddingBottom: 100,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('search_screen')}>
          <Image
            style={{
              width: 30,
              height: 30,
              alignSelf: 'flex-end',
              tintColor: '#FFFFFF',
              marginEnd: 25,
              marginBottom: 10,
            }}
            source={require('../images/ic_search.png')}
          />
        </TouchableOpacity>

        <FlatList
          data={category}
          horizontal
          bounces={false}
          keyExtractor={item => {
            return item;
          }}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
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
                      alignSelf: 'center',
                    },
                    selectedCategory == index && {
                      backgroundColor: '#cec6fa',
                      paddingHorizontal: 18,
                      paddingVertical: 8,
                    },
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
          overflow: 'hidden',
        }}>
        <FlatList
          data={filteredContent}
          contentContainerStyle={{paddingVertical: 20}}
          renderItem={props => {
            return <ChatContainer chat={props.item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
