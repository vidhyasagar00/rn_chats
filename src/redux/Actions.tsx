import axios from 'axios';
import {Dispatch} from 'redux';
import {BASE_URL, CHAT_SOCKET_URL} from '../utils/Constants';
import LocalStorage from '../utils/LocalStorage';
import { Message } from '../screens/ChatScreen';
import Notification from 'react-native-push-notification';

export const USER_PAYLOAD = 'user_payload';
export const TOKEN = 'token';
export const ON_MESSAGE = 'onNewMessage';

export const getUser: any = (token: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(BASE_URL + 'retrieve_user', {
        headers: {Authorization: 'Bearer ' + token, accept: 'application/json'},
      });
      dispatch({
        type: USER_PAYLOAD,
        payload: response.data,
      });
      dispatch(connectSocket(response.data.id))
    } catch (err: any) {
    }
  };
};

export const connectSocket: any = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      let socket = new WebSocket(`${CHAT_SOCKET_URL}${userId}`);
      socket.onopen = () => {
      };
      socket.onmessage = (message) => {
        const data = message.data.replaceAll("'",`"`)
        const messageObject: Message = JSON.parse(data);
        dispatch({
          type: ON_MESSAGE,
          payload: messageObject,
        });
        console.log("\n\n\n\n\n\naaaaaaaa->",typeof(userId),typeof(messageObject.sender_id), `${messageObject.sender_id}, ${userId}`, messageObject.sender_id===userId);
        
        if(messageObject.sender_id != userId) {
          console.log("coming inside",messageObject.sender_id != userId)
          createNotification(data);
        }
      };
      socket.onerror = e => {
        console.log('socket onerror', e);
      };
      socket.onclose = () => {
        console.log('socket onClose');
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('connect socket', err.message);
      }
    } 
  };
};

const createNotification = async (message: Message) => {
  Notification.createChannel(
    {channelName: 'chats',
     channelId: 'chats_convo',
     channelDescription: 'this channel is needed for receiving notification'
    },
    (status) => {},
  );
  Notification.localNotification({
    channelId: 'chats_convo',
    title: 'newMessage',
    message: message.content,
  });
}

export const getToken = () => async (dispatcher: Dispatch) => {
  var token = await new LocalStorage().getValue('accessToken');
  dispatcher({
    type: TOKEN,
    payload: token,
  });
};
