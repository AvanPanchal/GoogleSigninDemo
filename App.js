
import React, { Component } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Image
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import googlesignin from './screens/googlesignin';





export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      firstTime: false,
    }
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user)
      this.setState({ userinfo: userInfo.user });
      this.setState({ firstTime: true });

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  Logout = async () => {
    try {
      if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
        console.log(' ISsiginin ', GoogleSignin.isSignedIn)
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut().then(res => {
          console.log(res);
          this.setState({ userinfo: {} });
          this.setState({ firstTime: false });
        });
        alert('Log out')
      }
      else {
        alert('Please log in ')


      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '423986454905-q8cpcfl07chhorkm8er0qpo7r7v3uivg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    if (this.state.firstTime == true) {

    }
  }


  render() {
    const { userinfo } = this.state;
    return (
      <View style={styles.maincontainer}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
        <View>
          <TouchableOpacity
            style={{ minWidth: 150, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2AC062', display: 'flex', borderRadius: 5, shadowColor: '#2AC062', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { height: 10, width: 5 }, }}
            onPress={this.Logout}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text>{this.state.firstTime == true ? ('welcome:' + userinfo.name) : null}</Text>

        <Image
          style={styles.imgstyle}
          source={{ uri: userinfo.photo }} ></Image>

      </View>
    );

  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgstyle: {
    height: 300,
    width: 300
  }
})
