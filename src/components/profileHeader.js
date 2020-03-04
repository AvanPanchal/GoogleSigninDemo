import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import ExitIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = props => {
    return (
        <View style={styles.Container}>
            <View style={styles.iconStyle}>
                <ExitIcon name="exit-run" color={'black'} size={30} onPress={() => BackHandler.exitApp()} />
            </View>
            <View style={styles.titleStyle}>
                <Text style={styles.txtStyle}>APP NAME</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({

    Container: {
        flexDirection: 'row',
        backgroundColor: '#0d8841',
        height: 100,
    },

    iconStyle: {
        // backgroundColor: 'red',
        justifyContent: 'center'
    },

    titleStyle: {
        flex: 1,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25
    },

    txtStyle: {
        fontSize: 20,
        color: 'white'
    }
});