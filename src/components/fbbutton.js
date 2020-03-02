import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image, TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
class fbbutton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.btnstyle, { flexDirection: 'row' }]}
                onPress={() => {
                    alert('button pressed');
                }}>

                {/* <Image
                        style={{ width: 18, height: 18, marginRight: 10, marginTop: 2 }}
                        source={require('../images/facebook.jpeg')}></Image> */}
                <Icon name='facebook' color='white' size={14}>
                </Icon>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 17,
                        marginLeft: 20
                    }}>
                    FACEBOOK
                </Text>

            </TouchableOpacity>
        );
    }
}
export default fbbutton;

const styles = StyleSheet.create({
    btnstyle: {
        minWidth: 165,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        display: 'flex',
        borderRadius: 5,
    }
});