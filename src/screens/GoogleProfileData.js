import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import Logouticon from 'react-native-vector-icons/SimpleLineIcons';
class GoogleProfieData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isfirsttime: false,
      userinfo: {}
    }
  }
  Logout = async () => {
    try {
      if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
        console.log(' ISsiginin ', GoogleSignin.isSignedIn);
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut().then(res => {
          console.log(res);
          // this.setState({ userinfo: {} });
          // this.setState({ isfirsttime: false });
          this.props.navigation.navigate('Login');
        });
        alert('Log out');
      } else {
        alert('Please log in ');
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  render() {
    const { data } = this.props.navigation.state.params;
    //console.log(this);
    // console.log('this.props.data : ' + data);
    return (
      <View style={styles.maincontainer} >
        <View style={styles.container}>

          <Image style={styles.imgstyle} source={{ uri: data.photo }}></Image>
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontWeight: 'bold', color: '#0288d1', fontSize: 16 }}>
              {'Email-ID : ' + data.email}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#0288d1' }}>
              {'User-Name : ' + data.name}
            </Text>

            <TouchableOpacity
              style={{ minWidth: 150, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0288d1', display: 'flex', borderRadius: 5, shadowColor: '#2AC062', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { height: 10, width: 5 }, }}
              onPress={() => this.Logout()}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.logoutbtnstyle}>
          <Logouticon onPress={() => this.handleBackButtonClick()}
            name='logout' size={40}
          >
          </Logouticon>
        </View>
      </View>
    );
  }
}
export default GoogleProfieData;

const styles = StyleSheet.create({
  maincontainer: {
    height: 155,
    backgroundColor: 'white',
    flex: 1
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 75,
    // justifyContent: 'center'
    backgroundColor: 'white'
  },
  imgstyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  logoutbtnstyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    paddingHorizontal: 25
  }
});
