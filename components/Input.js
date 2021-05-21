import React from 'react';
import { TextInput, View } from 'react-native';
import Colors from "../constants/Colors";

const Input = ({ value, placeholder, onChangeText }) => {
    const { inputStyle } = styles;

    return (
        <View>
            <TextInput 
                placeholder = { placeholder }
                style = { inputStyle }
                value = { value }
                onChangeText = { onChangeText }
            />    
        </View>
    );
};

const styles = {
    inputStyle: {
        borderWidth: 2,
        borderRadius: 10,
        width: 150,
        height: 50,
        textAlign: 'center',
        borderColor: Colors.primary,
        color: Colors.primary 
    }
}

export default Input ;