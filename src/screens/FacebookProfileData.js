import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity, BackHandler,
    Image,
} from 'react-native';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Logouticon from 'react-native-vector-icons/SimpleLineIcons';
class FacebookProfileData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            token: '',
            profile_pic: '',
            email: ''
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    UNSAFE_componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }
    render() {
        console.log('nav', this.props.navigation);
        const { data } = this.props.navigation.state.params;
        return (
            <View style={styles.maincontainer}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: data.url }}
                        style={{
                            width: 200, height: 200, marginTop: 15,
                            borderRadius: 100, borderWidth: 1, backgroundColor: '#4dd'

                        }}
                    />

                    <Text style={styles.text}> {data.name} </Text>
                    <Text style={styles.text}>{data.email}</Text>
                    <View style={styles.logoutbtnstyle}>
                        <Logouticon onPress={() => this.handleBackButtonClick()}
                            name='logout' size={40}
                        >
                        </Logouticon>
                    </View>
                </View>
            </View>
        );
    }
}

export default FacebookProfileData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 75,
        // justifyContent: 'center',
    },
    buttonGreen: {
        minWidth: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2AC062',
        display: 'flex',
        borderRadius: 5,
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowRadius: 20,
        shadowOffset: { height: 10, width: 5 },
    },
    text: {
        fontWeight: 'bold',
        marginTop: 5
    },
    logoutbtnstyle: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        marginBottom: 50,
        paddingHorizontal: 25
    },
    maincontainer: {
        height: 155,
        backgroundColor: 'white',
        flex: 1
    },
});