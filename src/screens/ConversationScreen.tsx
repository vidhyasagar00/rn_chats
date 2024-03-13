import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Message } from "./ChatScreen";
import axios from "axios";
import { CHATS_BASE_URL } from "../utils/Constants";
type Chat = {
    item: Message;
    index: number;
}

const ChatItem = ({item, index}: Chat): JSX.Element => {
    return(
        <View>

        </View>
    );
}

const ConversationScreen = ({ navigation }: NativeStackScreenProps<any>): JSX.Element => {
    const [chats, setChats] = useState([])

    const getMessages = () => {
        axios.get(CHATS_BASE_URL + "")
    };

    useEffect(() => {
        getMessages()
    },[]);

    return(
        <SafeAreaView>
            <FlatList
            style={{flexGrow: 1}}
            data={chats}
            numColumns={chats.length}
            renderItem={ ChatItem }
            />

            <View>
                
            </View>
        </SafeAreaView>
    );
}

export default ConversationScreen;