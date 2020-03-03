import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  // TextInput,
  TouchableOpacity,
  Image, Button,
  ActivityIndicator, KeyboardAvoidingView, ScrollView,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebaseConfig from '../assests/firebaseconfig';
import auth, { firebase } from '@react-native-firebase/auth';
import Fbbutton from '../components/fbbutton';
import Googlebtn from '../components/googlebutton';
import Loader from '../components/loader';
import Mailicon from 'react-native-vector-icons/MaterialIcons';
import Lockicon from 'react-native-vector-icons/MaterialIcons';
import Emailrecoveryicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Keyicon from 'react-native-vector-icons/Ionicons';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      isfirsttime: false,
      email: '',
      pass: '',
      loading: false,
      ModalVisibleStatus: false
    };
  }
  ShowModalFunction(visible) {
    this.setState({ ModalVisibleStatus: visible });
  }
  LoginBtn = async (email, pass) => {
    if (this.state.email === null || this.state.email === '') {
      Alert.alert('Please enter email')
    }
    else if (this.state.pass === null || this.state.pass === '') {
      Alert.alert('Please enter password.')
    }
    else {
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
    }
  };

  // Logout = async () => {
  //   try {
  //     if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
  //       console.log(' ISsiginin ', GoogleSignin.isSignedIn);
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut().then(res => {
  //         console.log(res);
  //         this.setState({ userinfo: {} });
  //         this.setState({ isfirsttime: false });
  //       });
  //       alert('Log out');
  //     } else {
  //       alert('Please log in ');
  //     }
  //   } catch (error) {
  //     console.error('Error : ', error);
  //   }
  // };

  componentDidMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    const { userinfo } = this.state;
    return (
      <KeyboardAvoidingView behavior='height'>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.logincontainer}>
              <Text style={styles.logintextstyle}>Login with</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 28,
                justifyContent: 'space-between',
              }}>
              <View>
                <Fbbutton {...this.props}></Fbbutton>
              </View>
              <View>
                <Googlebtn {...this.props}></Googlebtn>
              </View>
            </View>

            <View style={styles.orviewstyle}>
              <Text style={styles.ortextstyle}>OR</Text>
            </View>


            <View style={styles.maintextinput}>
              <View style={{ marginBottom: 25, flexDirection: 'row' }}>
                <Mailicon size={20} name='email' style={{ marginTop: 24 }}></Mailicon>
                <TextInput
                  // placeholder="Email"
                  label='Email'
                  style={styles.emailtextinputstyle}
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}></TextInput>
              </View>
              <View style={{ marginBottom: 50, flexDirection: 'row' }}>
                <Lockicon size={20} name='lock' style={{ marginTop: 24 }}></Lockicon>
                <TextInput

                  label="Password"
                  secureTextEntry={true}
                  style={styles.emailtextinputstyle}
                  onChangeText={pass => this.setState({ pass })}></TextInput>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 35,
                  flexDirection: 'row'
                }}>
                <Keyicon name='md-key' color='#00BCD4' size={20}></Keyicon>
                <Text style={{ color: '#00BCD4', fontSize: 18, marginLeft: 10 }}
                  onPress={() => this.ShowModalFunction(true)}>FORGOT PASSWORD?</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    minWidth: 120,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0288D1',
                    display: 'flex',
                    // marginBottom: 30,
                    borderRadius: 4
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
                        fontSize: 17,
                        // fontWeight: 'bold',
                      }}>
                      LOGIN
                </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              transparent={false}
              animationType={"slide"}
              visible={this.state.ModalVisibleStatus}
              onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.ModalInsideView}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.TextStyle}>Recover Password</Text>
                  </View>
                  <View style={{ marginBottom: 25, marginTop: 30, flexDirection: 'row' }}>
                    <Mailicon size={25} name='email' color='white' style={{ marginTop: 24 }}></Mailicon>
                    <TextInput
                      label="Email"
                      style={styles.emailtextinputmodalstyle}
                    ></TextInput>
                  </View>
                  <TouchableOpacity
                    style={{
                      minWidth: 250,
                      height: 55,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#0288D1',
                      display: 'flex',
                      // marginBottom: 30,
                      borderRadius: 4
                    }}
                    onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Emailrecoveryicon
                        size={20} color='white' name='email-open'
                      ></Emailrecoveryicon>
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontSize: 17,
                          marginLeft: 6
                          // fontWeight: 'bold',
                        }}>
                        SEND RECOVERY EMAIL
                </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  logincontainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logintextstyle: {
    fontSize: 30,
    fontWeight: '100'
  },
  maintextinput: {
    marginHorizontal: 30,
  },
  emailtextinputstyle: {
    // height: 50,
    width: 302,
    backgroundColor: 'transparent',
    // borderBottomWidth: 2,
    // borderBottomColor: '#ccc',
    // paddingBottom: 0,
    // marginLeft: 5
  },
  emailtextinputmodalstyle: {
    width: 220,
    backgroundColor: 'transparent',
    // borderBottomWidth: 2,
    // borderBottomColor: '#ccc',
    // paddingBottom: 0,
    // marginLeft: 5
  },
  imgstyle: {
    width: 50,
    height: 50,
  },
  orviewstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  ortextstyle: {
    fontSize: 20
  },
  ModalInsideView: {
    alignItems: 'center',
    backgroundColor: "#00BCD4",
    height: 250,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  TextStyle: {
    fontSize: 20,
    // marginBottom: 20,
    color: "#fff",
    // padding: 20,
    textAlign: 'center'

  }
});
