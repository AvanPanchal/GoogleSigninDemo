import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, Image, TouchableOpacity, Platform
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class fbbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            token: '',
            profile_pic: '',
            email: ''
        };
    }
    _responseInfoCallback = (error, result) => {
        if (error) {
            console.log('Error fetching data: ' + error.toString());
        } else {
            console.log('Success fetching data: ' + result.toString());
        }
    };

    signin = async () => {

        var user = this;

        // if(Login)
        // let res = LoginManager.logOut();
        // LoginManager.getDefaultAudience(user)
        // console.log('Logout res :', res);
        // .then(res => console.log('Logout  res : ', res));
        Platform.OS = 'android' ? LoginManager.setLoginBehavior('web_only') : null;
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(

            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                }

                else {
                    AccessToken.getCurrentAccessToken().then(async data => {
                        console.log(data);
                        const infoRequest = new GraphRequest(
                            '/me?fields=name,email,picture.type(large)',
                            null,
                            async (error, result) => {
                                if (error) {
                                    console.log('Error fetching data: ', error);
                                } else {
                                    alert(JSON.stringify(result));
                                    console.log(
                                        'Success fetching data: ',
                                        JSON.stringify(result),
                                    );
                                    //user = JSON.stringify(result);
                                    // user.setState({ user_name: 'Welcome' + ' ' + result.name });
                                    // user.setState({ profile_pic: result.picture.data.url })
                                    // user.setState({ email: 'Email-ID : ' + result.email })
                                    return await user.props.navigation.navigate('FacebookProfileData', {
                                        data: result,
                                    });
                                }
                            },
                        );

                        new GraphRequestManager().addRequest(infoRequest).start();

                        //second way
                        // await fetch(
                        //   'https://graph.facebook.com/v2.5/me?fields=id,first_name,last_name,email,picture.type(large)&access_token=' +
                        //     data.AccessToken,
                        // ).then(res => {
                        //   user = res.json();
                        //   console.log('user : ', user);
                        //   alert('Login Sucessfully');
                        // });
                    });
                }
            },
            function (error) {
                console.log('Login fail with error: ', error);
            },
        );

        // this.setState({ user_name: 'Welcome' + ' ' + user.name });
        // this.setState({ token: 'User Token: ' + ' ' + user.id });
        // this.setState({ profile_pic: user.picture.data.url });
        // console.log('this.state.user_name : ', this.state.user_name);
    };
    render() {
        return (
            <TouchableOpacity
                style={[styles.btnstyle, { flexDirection: 'row' }]}
                onPress={() => {
                    this.signin()
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