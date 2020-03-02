import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import firebaseConfig from "../assests/FirebaseConfig";
// import * as firebase from "firebase";
import auth, { firebase } from '@react-native-firebase/auth';

class LoginData extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this);
	}

	Logout = async () => {
		await firebase
			.auth()
			.signOut()
			.then(res => console.log('res : ', res))
			.catch(err => console.log('Error : ', err));
		await this.props.navigation.navigate('Login');
		await alert('Log out');
		//this.props.email = '', this.props.pass = '';
	};
	render() {
		return (
			<View style={styles.container}>
				<Text style={{ color: 'green', fontSize: 20 }}>
					{'Email-ID :' + firebase.auth().currentUser.email}
				</Text>
				<TouchableOpacity
					style={{
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
					}}
					onPress={() => this.Logout()}>
					<Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
						Logout
          </Text>
				</TouchableOpacity>
			</View>
		);
	}
}
export default LoginData;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
