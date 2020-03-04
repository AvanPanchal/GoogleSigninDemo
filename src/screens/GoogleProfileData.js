import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import Logouticon from 'react-native-vector-icons/SimpleLineIcons';
import ProfileHeader from '../components/profileHeader';
class GoogleProfieData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isfirsttime: false,
      userinfo: {}
    }
  }
  static navigationOptions = {
    title: 'sunil',
    header: <ProfileHeader {...this.props} />,
  };
  Logout = async () => {
    try {
      if ((await GoogleSignin.isSignedIn()).valueOf(true)) {
        console.log(' ISsiginin ', GoogleSignin.isSignedIn);
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut().then(res => {
          console.log(res);
          // this.setState({ userinfo: {} });
          // this.setState({ isfirsttime: false });
          alert('Log out');
          this.props.navigation.navigate('Login');
        });

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
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.maincontainer} >
          <View style={styles.container}>
            <View style={{ height: 10, width: 50, backgroundColor: 'red' }}></View>
            <Image style={styles.imgstyle} source={{ uri: data.photo }}></Image>
            <View style={{ marginTop: 25 }}>
              <Text style={{ fontWeight: 'bold', color: '#0288d1', fontSize: 16 }}>
                {'Email-ID : ' + data.email}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#0288d1' }}>
                {'User-Name : ' + data.name}
              </Text>


            </View>

          </View>
          <View style={styles.logoutbtnstyle}>
            <TouchableOpacity
              style={{ minWidth: 150, height: 60, backgroundColor: '#0288d1', borderRadius: 5, justifyContent: 'center', }}
              onPress={() => this.Logout()}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Logouticon name='logout' size={25} color='white'></Logouticon>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, marginLeft: 15 }}>Logout</Text>
              </View>

            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}
export default GoogleProfieData;

const styles = StyleSheet.create({
  maincontainer: {
    // height: 155,
    // backgroundColor: 'red',
    flex: 1
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    // marginTop: 75,
    // justifyContent: 'center'
    // backgroundColor: 'yellow'
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
    // flexDirection: 'row',
    marginBottom: 50,
    paddingHorizontal: 25
  }
});
