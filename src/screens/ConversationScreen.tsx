import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  ViewStyle,
} from 'react-native';
import { Message } from './ChatScreen';
import axios from 'axios';
import { CHATS_BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux/Reducer';
import { ON_MESSAGE } from '../redux/Actions';

type Chat = {
  item: Message;
  isMe: boolean;
}; 

const ChatItem = ({item, isMe}: Chat): JSX.Element => {
  const style: ViewStyle = isMe
    ? {
        alignSelf: 'flex-end',
        backgroundColor: '#260099',
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        alignItems: 'flex-end',
      }
    : {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#cfbeff',
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
      };
  return (
    <View
      style={[
        {paddingVertical: 10, marginVertical: 5, paddingHorizontal: 10},
        style,
      ]}>
      <Text style={{color: isMe ? 'white' : 'black'}}>{item.content}</Text>
    </View>
  );
};

const ConversationScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<any>): JSX.Element => {
  const [chats, setChats] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const reduxState = useSelector((datas: State  ) => datas);
  const dispatch = useDispatch();

  const getMessages = async () => {
    axios
      .get(CHATS_BASE_URL + `chats/${route.params?.id}/messages`, {
        headers: {Authorization: 'Bearer ' + reduxState.token},
      })
      .then(res => {
        setChats(res.data);
      })
      .catch((err: any) => {
        Alert.alert('Api error', err.message);
      });
  };

  const getMessageWithId = async (messageId: string) => {
    axios
      .get(CHATS_BASE_URL + `message/${messageId}`, {
        headers: {Authorization: `Bearer ${reduxState.token}`}
      }).then( (res: {data: Message}) => {
        let newChats = [...chats];
        newChats.unshift(res.data);
        setChats(newChats);
      }).catch( err => {
        // Alert.alert('Api error', err.message)
      });
  }

  const sendMessage = () => {
    
    axios
      .post(
        CHATS_BASE_URL + 'create_message',
        {content: message, chat_id: route.params?.id},
        {headers: {Authorization: 'Bearer ' + reduxState.token}},
      )
      .then(res => {
        const prev = chats || [];
        setChats([res.data, ...prev]);
        setMessage('');
      })
      .catch((err: any) => {
        Alert.alert('Api error', err.message);
      });
  };

  useEffect(() => {
    if(reduxState.user?.userId && reduxState.message) {
      let newChats = [...chats];
        newChats.unshift(reduxState.message);
        setChats(newChats);
      //getMessageWithId(reduxState.message.id)
      dispatch({
        type: ON_MESSAGE,
        payload: null,
      });
    }
  }, [reduxState.message])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#0d009c',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image
            style={{width: 35, height: 35, tintColor: '#FFF'}}
            source={require('../images/ic_back.png')}
          />
        </TouchableOpacity>

        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginVertical: 10,
            marginStart: 15,
          }}
          source={{uri: reduxState.user?.userProfile}}
        />
      </View>
      <FlatList
        style={{flexGrow: 1}}
        data={chats}
        inverted
        renderItem={({item}) =>
          ChatItem({
            item: item,
            isMe: item.sender_id == reduxState.user?.userId,
          })
        }
      />

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 25,
          backgroundColor: '#c3c1ff',
          marginBottom: 10,
        }}>
        <TextInput
          style={{
            flex: 1,
            borderRadius: 25,
            marginStart: 2,
            marginEnd: 5,
            marginVertical: 2,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 5,
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message"
        />

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            padding: 5,
            backgroundColor: '#1d00a0',
            borderRadius: 30,
            transform: [{rotate: '-45deg'}],
          }}>
          <Image
            style={{width: 35, height: 35, margin: 5, tintColor: '#FFF'}}
            source={require('../images/ic_send.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConversationScreen;
