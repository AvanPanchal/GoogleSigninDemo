import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    ActivityIndicator, KeyboardAvoidingView, ScrollView,
    Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebaseConfig from '../assests/firebaseconfig';
import auth, { firebase } from '@react-native-firebase/auth';
import Fbbutton from '../components/fbbutton';
import Googlebtn from '../components/googlebutton';
import Loader from '../components/loader';
import Mailicon from 'react-native-vector-icons/MaterialIcons';
import Lockicon from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native-paper';
import Closeicon from 'react-native-vector-icons/AntDesign';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: {},
            isfirsttime: false,
            email: '',
            pass: '',
            name: '',
            loading: false,
            emailvalidate: true,
            passwordvalidate: true,
            namevalidate: true
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
        alph = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)/
        if (alph.test(email)) {
            this.setState({
                emailvalidate: true,
                email: email
            })
        }
        else {
            this.setState({
                emailvalidate: false,
                email: email
            })
        }
    }

    validatpassword(pass) {
        this.setState({ textInput1Status: true })
        passregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
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

    validatename(name) {
        this.setState({ textInput1Status: true })
        let nameregex = /^[a-zA-Z]+$/i
        if (nameregex.test(name)) {
            this.setState({
                namevalidate: true,
                name: name
            })
        }
        else {
            this.setState({
                namevalidate: false,
                name: name
            })
        }
    }

    registerbtn = async (email, pass, name) => {
        if (this.state.name === null || this.state.name === '') {
            Alert.alert('Please enter name')
        }
        else if (this.state.email === null || this.state.email === '') {
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
                        this.setState({
                            name: ''
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
                        <Text style={styles.logintextstyle}>Sign Up</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 28 }}>
                        <Text style={{ fontSize: 20 }}>Get a free account using social logins</Text>
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

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.ortextstyle}>Sign up using email</Text>
                    </View>


                    <View style={styles.maintextinput}>
                        <View style={{ marginBottom: 0, flexDirection: 'row' }}>
                            <User name='user' size={20} style={{ marginTop: 25 }}></User>
                            <TextInput
                                label="Name"
                                underlineColorAndroid='transparent'
                                style={[styles.emailtextinputstyle,
                                !this.state.namevalidate ? styles.nameerror : null
                                ]}
                                // onChangeText={name => this.setState({ name })}
                                onChangeText={name => this.validatename(name)}

                            ></TextInput>
                            {this.renderClearButton()}
                        </View>
                        <View style={{ marginBottom: 0, flexDirection: 'row' }}>
                            <Mailicon size={20} name='email' style={{ marginTop: 25 }}></Mailicon>
                            <TextInput
                                underlineColorAndroid='transparent'
                                label="Email"
                                style={[styles.emailtextinputstyle,
                                !this.state.emailvalidate ? styles.emailerror : null
                                ]}
                                value={this.state.email}
                                //onChangeText={email => this.setState({ email })}
                                onChangeText={email => this.validatemail(email)}

                            ></TextInput>
                            {this.renderClearButton()}
                        </View>
                        <View style={{ marginBottom: 25, flexDirection: 'row' }}>
                            <Lockicon size={20} name='lock' style={{ marginTop: 25 }}></Lockicon>
                            <TextInput
                                underlineColorAndroid='transparent'
                                label="Password"
                                secureTextEntry={true}
                                style={[styles.emailtextinputstyle,
                                !this.state.passwordvalidate ? styles.passerror : null
                                ]}
                                //onChangeText={pass => this.setState({ pass })}
                                onChangeText={pass => this.validatpassword(pass)}

                            ></TextInput>
                            {this.renderClearButton()}
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
                                onPress={() => this.registerbtn(this.state.email, this.state.pass
                                    , this.state.name)}>
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
                                        REGISTER
                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
export default Signup;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    logincontainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logintextstyle: {
        fontSize: 30,
        fontWeight: '100'
    },
    maintextinput: {
        marginHorizontal: 30,
    },
    emailtextinputstyle: {
        width: 302,
        backgroundColor: 'transparent',
    },
    imgstyle: {
        width: 50,
        height: 50,
    },
    orviewstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    ortextstyle: {
        fontSize: 20
    },
    emailerror: {
        borderWidth: 2,
        borderColor: 'red'
    },
    passerror: {
        borderWidth: 2,
        borderColor: 'red'
    },
    nameerror: {
        borderWidth: 2,
        borderColor: 'red'
    }
});
