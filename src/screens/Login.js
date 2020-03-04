import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  // TextInput,
  TouchableOpacity, AsyncStorage,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../components/loader';
import Mailicon from 'react-native-vector-icons/MaterialIcons';
import Lockicon from 'react-native-vector-icons/MaterialIcons';
import Emailrecoveryicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Keyicon from 'react-native-vector-icons/Ionicons';
import Closeicon from 'react-native-vector-icons/AntDesign';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      isfirsttime: false,
      email: '',
      pass: '',
      loading: false,
      ModalVisibleStatus: false,
      emailvalidate: true,
      modalemailvalidate: true,
      passwordvalidate: true,

      textInput1Status: false,
    };
  }

  renderClearButton() {

    return (
      (this.state.textInput1Status) ?
        <View style={{ justifyContent: 'flex-end', }}>
          <TouchableOpacity onPress={() => this.clearText()}>
            <Closeicon name='close' size={25} color='black' ></Closeicon>
          </TouchableOpacity>
        </View>
        : null
    )
  }
  clearText() {
    this.setState({
      textInput1Status: false,
      email: '',
      pass: '',
    });
  }
  validatemail(email) {
    this.setState({ textInput1Status: true })
    let alph = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)/
    if (alph.test(email)) {
      this.setState({
        emailvalidate: true,
        email: email,
      })
    }
    else {
      this.setState({
        emailvalidate: false,
        email: email,
      })
    }
  }

  validatemodalemail(modalemail) {
    this.setState({ textInput1Status: true })
    let regalph = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)/
    if (regalph.test(modalemail)) {
      this.setState({
        modalemailvalidate: true,
        modalemail: modalemail,
      })
    }
    else {
      this.setState({
        modalemailvalidate: false,
        modalemail: email
      })
    }
  }

  validatpassword(pass) {
    this.setState({ textInput1Status: true })
    let passregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (passregex.test(pass)) {
      this.setState({
        passwordvalidate: true,
        pass: pass
      })
    }
    else {
      this.setState({
        passwordvalidate: false,
        pass: pass
      })
    }
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
            });
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


  componentDidMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    const { userinfo } = this.state;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'transparent' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
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
            <View style={{ marginBottom: 10, flexDirection: 'row' }}>
              <Mailicon size={20} name='email' style={{ marginTop: 24 }}></Mailicon>
              <TextInput
                underlineColorAndroid='transparent'
                label='Email'
                style={[styles.emailtextinputstyle,
                !this.state.emailvalidate ? styles.emailerror : null]}
                value={this.state.email}
                //onChangeText={email => this.setState({ email })}
                onChangeText={email => this.validatemail(email)}
              ></TextInput>
              {this.renderClearButton()}
            </View>
            <View style={{ marginBottom: 20, flexDirection: 'row' }}>
              <Lockicon size={20} name='lock' style={{ marginTop: 24 }}></Lockicon>
              <TextInput
                underlineColorAndroid='transparent'
                label="Password"
                secureTextEntry={true}
                style={[styles.emailtextinputstyle,
                !this.state.passwordvalidate ? styles.passerror : null]}
                value={this.state.pass}
                //onChangeText={pass => this.setState({ pass })}
                onChangeText={pass => this.validatpassword(pass)}
              ></TextInput>
              {this.renderClearButton()}
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
                    onChangeText={(modalemail) => this.validatemodalemail(modalemail)}
                    style={[styles.emailtextinputmodalstyle,
                    !this.state.modalemailvalidate ? styles.emailerror : null
                    ]}
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
      </KeyboardAwareScrollView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
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
    backgroundColor: 'transparent',
    // borderBottomWidth: 2,
    width: 220,
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
    marginTop: 30
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

  },
  emailerror: {
    borderWidth: 2,
    borderColor: 'red'
  },
  passerror: {
    borderWidth: 2,
    borderColor: 'red'
  }
});
