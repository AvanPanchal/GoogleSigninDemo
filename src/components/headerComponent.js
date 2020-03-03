import React from "react";
import { Header } from "react-navigation-stack";
import { View, Platform, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const CustomHeader = props => {
    return (
        <View
            style={{
                height: 80,
                backgroundColor: '#0288D1',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Platform.OS == "ios" ? 20 : 0
            }}
        >
            <Text style={{
                color: 'white',
                fontSize: 25
            }}>APPNAME</Text>
        </View>
    );
};

export default CustomHeader;