import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import GoogleProfileData from '../src/screens/GoogleProfileData';
import LoginData from '../src/screens/LoginData';
// import Homescreen from '../src/screens/Homescreen';
import Login from '../src/screens/Login';
import Signup from '../src/screens/Signup';
import CustomHeader from '../src/components/headerComponent';
import ForgotPass from '../src/screens/ForgotPass';
import React, { Component } from 'react';
import AppImages from '../src/images/index';
import { Dimensions, Image } from 'react-native';
import User from 'react-native-vector-icons/Entypo';
import Adduser from 'react-native-vector-icons/Entypo';
const SCREEN_WIDTH = Dimensions.get("screen").width;
const AutoStack = createStackNavigator({
    // Homescreen: { screen: Homescreen },
    Signup: { screen: Signup },
    GoogleProfileData: { screen: GoogleProfileData },
    LoginData: { screen: LoginData },
    Login: { screen: Login },
    ForgotPass: { screen: ForgotPass }
}, {
    headerMode: 'none'
})


const tabNavigation = createMaterialTopTabNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            // activeTintColor: 'red',
            // gesturesEnabled: true,
            // swipeEnabled: true,
            tabBarIcon: () => (
                //    <Image source={AppImages.facebook} style={{ height: 25, width: 25, marginTop: 5 }} />
                <User name='user' color='white' size={25}></User>
            ),
            labelStyle: {
                fontSize: 16,
                // textAlign: 'center',
                // width: 'auto',
            },

        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            title: 'Signup',
            // swipeEnabled: true,
            // gesturesEnabled: true,
            tabBarIcon: () =>
                // <Image source={AppImages.google} style={{ height: 25, width: 25, marginTop: 5 }} />
                <Adduser name='add-user' color='white' size={25}></Adduser>
            ,
            //activeTintColor: 'yellow',
            labelStyle: {
                fontSize: 20,
                // textAlign: 'center',
            },
            header: props => <CustomHeader {...props} />,
            headerStyle: {
                backgroundColor: "transparent"
            },
            headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
            },
            headerTintColor: "#fff",
            animationEnabled: true

        },
    },

}, {
    tabBarOptions:
    {
        activeTintColor: '#fff',
        showIcon: true,
        showLabel: true,
        upperCaseLabel: false,
        style: {
            backgroundColor: '#0288d1',
            height: 50,

        },
        indicatorStyle: {
            backgroundColor: 'white',
        },
        tabStyle: {
            width: SCREEN_WIDTH / 2,
            flexDirection: 'row'
        }

    },
})






const AuthStack = createStackNavigator({
    tabNavigation,
    AutoStack,
}, {
    headerMode: 'none'
})
// })

const AppNavigator = createAppContainer(AuthStack);

export default AppNavigator;