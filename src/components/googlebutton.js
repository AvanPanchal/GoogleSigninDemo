import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Image
} from "react-native";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
import firebaseConfig from '../assests/firebaseconfig';
import Icon from 'react-native-vector-icons/AntDesign';
class googlebutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: {},
            isfirsttime: false
        };
    }

    signin = async () => {
        try {
            if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
                await GoogleSignin.revokeAccess();
                return await GoogleSignin.signOut();
            } else {
                // await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                console.log(userInfo.user);
                this.setState({ userinfo: userInfo.user });
                this.setState({ isfirsttime: true });

                return await this.props.navigation.navigate('GoogleProfileData', {
                    data: this.state.userinfo,
                });
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(error);
            } else {
                // some other error happened
                console.log(error);
            }
        }
    };

    componentDidMount() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '423986454905-q8cpcfl07chhorkm8er0qpo7r7v3uivg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
            iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }
    render() {
        console.log("propsps", this.props)
        return (
            <TouchableOpacity onPress={() => this.signin()}
                style={[styles.btnstyle, { flexDirection: 'row' }]}
            >
                {/* <Image
                        style={{ width: 18, height: 18, marginRight: 10, marginTop: 2, }}
                        source={require('../images/google.jpeg')}></Image> */}
                <Icon name='google' color='white' size={16}></Icon>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 17,
                        marginLeft: 15
                    }}>
                    GOOGLE
                </Text>
            </TouchableOpacity>
        );
    }
}
export default googlebutton;

const styles = StyleSheet.create({
    btnstyle: {
        minWidth: 165,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DD4B39',
        //display: 'flex',
        borderRadius: 5
    }
});