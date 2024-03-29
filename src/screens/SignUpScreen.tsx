import React, { useState } from "react";
import { ActivityIndicator, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthTextField from "../components/AuthTextField";
import GlobleStyle from "../utils/GlobleStyle";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import ImagePicker from "react-native-image-crop-picker";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";


const SignUpScreen = ({ navigation }: any): JSX.Element => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [profile, setProfile] = useState<string | null>(null)

    const signUp = () => {
        const data = {email: mail, password: password, name: name, }
        axios.post(BASE_URL + 'auth/token', data)
        .then( response => {

        }).catch(err => {
            console.log("signUp error ====>", err.message)
        });
    }

    const getProfileImage = async () => {
        console.log(Platform.OS);
        if(Platform.OS == "android") {
            const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
            console.log(result);
            if(result == RESULTS.GRANTED) {
                const mProfile = await ImagePicker.openPicker({mediaType: 'photo'})
                console.log(mProfile);
                if(mProfile.path) {
                    setProfile(mProfile.path)
                }
            }
        }
    }

    return(
        <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
            <View style={[style.circle, {right: 40,top: -85, opacity: .2}]} />
            <View style={[style.circle, {right: 55,top: -100,}]} />

            <View style={[style.circle, {bottom: -90,left: 10, opacity: .2}]} />
            <View style={[style.circle, {bottom: -110,left: 0,}]} />

            <View style={style.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={[GlobleStyle.titleMedium]}>SIGN UP</Text>
                    <TouchableOpacity
                        onPress={getProfileImage}>
                        <Image 
                            style= {{width: 50, height: 50, resizeMode: 'stretch', borderRadius : profile ? 50 : 0}}
                            source={(profile) ? {uri: profile} : require('../images/ic_select_profile.png')} />
                    </TouchableOpacity>
                </View>

                <AuthTextField
                    iconSource={require('../images/ic_person.png')}
                    value={name}
                    onChangeText={value => setName(value)}
                    placeholder='Enter your name'
                />

                <AuthTextField
                    iconSource={require('../images/ic_mail.png')}
                    value={mail}
                    onChangeText={value => setMail(value)}
                    placeholder='Enter your email'
                />

                <AuthTextField
                    iconSource={require('../images/ic_phone.png')}
                    value={mobile}
                    onChangeText={value => setMobile(value)}
                    placeholder='Enter your phone'
                />

                <AuthTextField
                    iconSource={require('../images/ic_lock.png')}
                    value={password}
                    onChangeText={value => setPassword(value)}
                    placeholder='password'
                />

                <TouchableOpacity
                style={style.button}
                onPress={signUp}>
                    <Text style={style.buttonText}>SIGN UP</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={GlobleStyle.labelSmall}>already have an account? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('signin_screen')}>
                        <Text style={[GlobleStyle.labelSmall, {color: '#003049'}]}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ActivityIndicator 
                size={"large"} 
                style={GlobleStyle.loader} 
                animating={isLoading} 
            />
        </SafeAreaView>
    );
}

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
        fontSize: 18
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#003049',
        paddingVertical: 10,
        marginVertical: 20
    },
    circle: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#003049',
    }
})

export default SignUpScreen;