import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from './src/screens/IntroScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ChatScreen from './src/screens/ChatScreen';
import ConversationScreen from './src/screens/ConversationScreen';



const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name='chat_screen' component={ChatScreen} />
        <Stack.Screen name='intro_screen' component={IntroScreen} />
        <Stack.Screen name='signin_screen' component={SignInScreen} />
        <Stack.Screen name='signup_screen' component={SignUpScreen} />
        <Stack.Screen name='conversation_screen' component={ConversationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
