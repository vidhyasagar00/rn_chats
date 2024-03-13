import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobleStyle from '../utils/GlobleStyle';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { INTRO_DESCRIPTION } from "../utils/Constants";


const IntroScreen = ({ navigation } : NativeStackScreenProps<any>): JSX.Element => {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
            <ScrollView contentContainerStyle={{}}>
                <Image
                style={style.introImage}
                source={require('../images/intro_background.jpeg')} />

                <View style={style.introContainer}>
                    <Text style={GlobleStyle.titleMedium}>Welcome to </Text>
                    <Text style={[GlobleStyle.titleLarge, {paddingStart: 20}]}>CHATS</Text>
                    <Text style={[GlobleStyle.bodyMedium, style.description]}>{INTRO_DESCRIPTION}</Text>
                </View>
            </ScrollView>

            <View style={style.buttonContainer}>
                <TouchableOpacity
                style= {style.button}
                onPress={() => navigation.navigate('signin_screen')}>
                    <Text style={style.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={style.button}
                onPress={() => navigation.navigate('signup_screen')}>
                    <Text style={style.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};


const style = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        start: 0,
        end: 0,
        alignItems: 'center',
        rowGap: 10,
        paddingVertical: 20
    },
    button: {
        backgroundColor: '#003049',
        width: "80%",
        paddingVertical: 10,
        borderRadius: 15
    },
    buttonText: {
        color: '#eae2b7',
        alignSelf: 'center',
        fontFamily: 'Nunito-Bold',
        fontSize: 18
    },
    introImage: {
        width: '100%',
        height: 350,
        resizeMode: 'stretch'
    },
    introContainer: {
        flexGrow: 1,
        marginTop: -30,
        paddingTop: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        marginBottom: 150,
    },
    description: {
        textAlign: 'justify',
        paddingVertical: 10,
        paddingHorizontal: 15,
    }
})

export default IntroScreen;