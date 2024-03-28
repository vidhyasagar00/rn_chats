import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './src/screens/IntroScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ChatScreen from './src/screens/ChatScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import LocalStorage from './src/utils/LocalStorage';
import { TOKEN, connectSocket, getUser } from './src/redux/Actions';
import Store from './src/redux/Store';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element | null {
  const [token, setToken] = useState<string | null>(null)

  const getToken = async () => {
    var token = await new LocalStorage().getValue('accessToken');
    setToken(token);
    Store.dispatch({
      type: TOKEN, 
      payload: token
    })
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if(token) {
      Store.dispatch(getUser(token));
    }
  }, [token])

  if (token === null) {
    return null;
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={token ? 'chat_screen' : 'intro_screen'}
          screenOptions={{header: () => null}}>
          <Stack.Screen name="chat_screen" component={ChatScreen} />
          <Stack.Screen name="intro_screen" component={IntroScreen} />
          <Stack.Screen name="signin_screen" component={SignInScreen} />
          <Stack.Screen name="signup_screen" component={SignUpScreen} />
          <Stack.Screen name="conversation_screen" component={ConversationScreen} />
          <Stack.Screen name="search_screen" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
