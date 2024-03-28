import React from "react";
import { StyleSheet, View, Image, TextInput, ImageSourcePropType } from "react-native";
import GlobleStyle from "../utils/GlobleStyle";

interface CustomTextInputProps {
    iconSource: ImageSourcePropType,
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const AuthTextField = (
    {iconSource, value, onChangeText, placeholder}: CustomTextInputProps
): JSX.Element => {
  console.log('aaaaaaa');

  return (
    <View style={style.shadowView}>
      <Image style={style.icon} source={iconSource} />

      <TextInput
        style={[GlobleStyle.labelMedium, {flex: 1}]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const style = StyleSheet.create({
    shadowView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        elevation: 5,
        marginStart: -5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingHorizontal: 5
    },
    icon: {
        width: 25,
        height: 25,
    }
});
const doRender = (prev : CustomTextInputProps , updated : CustomTextInputProps) :  boolean => {
    return prev.value === updated.value
}

export default React.memo(AuthTextField, doRender);