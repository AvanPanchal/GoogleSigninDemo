import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput, TouchableOpacity, Image
} from "react-native";

class DemoLayoutScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logincontainer} >
                    <Text style={styles.logintextstyle}>LOGIN</Text>
                </View>
                <View style={styles.maintextinput}>
                    <View style={{ marginBottom: 25 }}>
                        <TextInput placeholder="Email" style={styles.emailtextinputstyle}></TextInput>
                    </View>
                    <View style={{ marginBottom: 50 }}>
                        <TextInput placeholder="Password" style={styles.emailtextinputstyle}></TextInput>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                minWidth: 150, height: 65, alignItems: 'center',
                                justifyContent: 'center', backgroundColor: '#E419B7',
                                display: 'flex', marginBottom: 35
                            }}
                            onPress={() => { alert('button pressed'); }}>
                            <Text
                                style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}
                            >LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 35 }}>
                    <Text style={{ color: '#ccc', fontSize: 18 }}>Or login with</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'space-between' }}>
                    <View>
                        <TouchableOpacity
                            style={{
                                minWidth: 165, height: 60, alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#F3F3F5', display: 'flex', borderRadius: 0
                            }}
                            onPress={() => { alert('button pressed'); }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 18, height: 18, marginRight: 10, marginTop: 2 }}
                                    source={require('../images/facebook.jpeg')}
                                ></Image>
                                <Text style={{ color: 'blue', textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                minWidth: 165, height: 60, alignItems: 'center',
                                justifyContent: 'center', backgroundColor: '#F3F3F5', display: 'flex',
                                borderRadius: 0,
                            }}
                            onPress={() => { alert('button pressed'); }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 18, height: 18, marginRight: 10, marginTop: 2 }}
                                    source={require('../images/google.jpeg')}>
                                </Image>
                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Google</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center', alignItems: 'center',
                    marginTop: 45, flexDirection: 'row'
                }}>
                    <Text style={{ color: '#ccc', fontSize: 17 }}>
                        Not a member?
                    </Text>
                    <Text style={{ color: '#ccc', fontSize: 17, textDecorationLine: 'underline', marginLeft: 1 }}>
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
        marginTop: 80
    },
    logincontainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logintextstyle: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    maintextinput: {
        marginHorizontal: 25
    },
    emailtextinputstyle: {
        borderColor: '#E6E3EE',
        borderWidth: 2,
        paddingHorizontal: 45,
        backgroundColor: '#E6E3EE',
        height: 65
    }
});