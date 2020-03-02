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
import auth, { firebase } from '@react-native-firebase/auth';
import Fbbutton from '../components/fbbutton';
import Googlebtn from '../components/googlebutton';
import Loader from '../components/loader';
import Mailicon from 'react-native-vector-icons/MaterialIcons';
import Lockicon from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/Entypo';


class Signup extends Component {
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
                        <Fbbutton></Fbbutton>
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
                    <View style={{ marginBottom: 25, flexDirection: 'row' }}>
                        <User name='user' size={25} style={{ marginTop: 15 }}></User>
                        <TextInput
                            placeholder="Name"
                            secureTextEntry={true}
                            style={styles.emailtextinputstyle}></TextInput>
                    </View>
                    <View style={{ marginBottom: 25, flexDirection: 'row' }}>
                        <Mailicon size={25} name='email' style={{ marginTop: 15 }}></Mailicon>
                        <TextInput
                            placeholder="Email"
                            style={styles.emailtextinputstyle}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}></TextInput>
                    </View>
                    <View style={{ marginBottom: 25, flexDirection: 'row' }}>
                        <Lockicon size={25} name='lock' style={{ marginTop: 15 }}></Lockicon>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.emailtextinputstyle}
                            onChangeText={pass => this.setState({ pass })}></TextInput>
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
                                    REGISTER
                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default Signup;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
        // height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        paddingBottom: 0,
        width: 302,
        marginLeft: 5
    },
    imgstyle: {
        width: 50,
        height: 50,
    },
    orviewstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    ortextstyle: {
        fontSize: 20
    }
});
