import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebaseConfig from '../assests/firebaseconfig';
// import * as firebase from "firebase";
import auth, { firebase } from '@react-native-firebase/auth';
// import { firebase, auth } from 'react-native-firebase';
import Loader from '../components/loader';

class DemoLayoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      isfirsttime: false,
      email: '',
      pass: '',
      loading: false,
    };
  }
  LoginBtn = async (email, pass) => {
    this.setState({
      loading: true,
    });
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(user => {
          this.setState({
            loading: false,
          });
          console.log('userdata:', user, this.state.loading);
          this.setState({
            email: '',
            // pass: ''
          });
          this.setState({
            pass: ''
          })
          this.props.navigation.navigate('LoginData');
        });
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error.toString(error));
    }
  };
  signin = async () => {
    try {
      if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
        //console.log(' ISsiginin ', GoogleSignin.isSignedIn)
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
  Logout = async () => {
    try {
      if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
        console.log(' ISsiginin ', GoogleSignin.isSignedIn);
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut().then(res => {
          console.log(res);
          this.setState({ userinfo: {} });
          this.setState({ isfirsttime: false });
        });
        alert('Log out');
      } else {
        alert('Please log in ');
      }
    } catch (error) {
      console.error('Error : ', error);
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
    const { userinfo } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logincontainer}>
          <Text style={styles.logintextstyle}>LOGIN</Text>
        </View>
        <View style={styles.maintextinput}>
          <View style={{ marginBottom: 25 }}>
            <TextInput
              placeholder="Email"
              style={styles.emailtextinputstyle}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}></TextInput>
          </View>
          <View style={{ marginBottom: 50 }}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.emailtextinputstyle}
              onChangeText={pass => this.setState({ pass })}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={{
                minWidth: 150,
                height: 65,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E419B7',
                display: 'flex',
                marginBottom: 35,
              }}
              onPress={() => this.LoginBtn(this.state.email, this.state.pass)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <ActivityIndicator size='large' color='white'></ActivityIndicator> */}
                <Loader loading={this.state.loading} />
                <Text

                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 35,
          }}>
          <Text style={{ color: '#ccc', fontSize: 18 }}>Or login with</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 25,
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              style={{
                minWidth: 165,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F3F3F5',
                display: 'flex',
                borderRadius: 0,
              }}
              onPress={() => {
                alert('button pressed');
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 18, height: 18, marginRight: 10, marginTop: 2 }}
                  source={require('../images/facebook.jpeg')}></Image>
                <Text
                  style={{
                    color: 'blue',
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Facebook
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                minWidth: 165,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F3F3F5',
                display: 'flex',
                borderRadius: 0,
              }}
              onPress={() => this.signin()}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 18, height: 18, marginRight: 10, marginTop: 2 }}
                  source={require('../images/google.jpeg')}></Image>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 45,
            flexDirection: 'row',
          }}>
          <Text style={{ color: '#ccc', fontSize: 17 }}>Not a member?</Text>
          <Text
            style={{
              color: '#ccc',
              fontSize: 17,
              textDecorationLine: 'underline',
              marginLeft: 1,
            }}>
            Sign up now
          </Text>
        </View>
      </View>
    );
  }
}
export default DemoLayoutScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  logincontainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logintextstyle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  maintextinput: {
    marginHorizontal: 25,
  },
  emailtextinputstyle: {
    borderColor: '#E6E3EE',
    borderWidth: 2,
    paddingHorizontal: 45,
    backgroundColor: '#E6E3EE',
    height: 65,
  },
  imgstyle: {
    width: 50,
    height: 50,
  },
});
