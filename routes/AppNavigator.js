import { createAppContainer } from 'react-navigation';
import { createStackNavigator, Header } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import GoogleProfileData from '../src/screens/GoogleProfileData';
import LoginData from '../src/screens/LoginData';
import FacebookProfileData from '../src/screens/FacebookProfileData';
import Login from '../src/screens/Login';
import Signup from '../src/screens/Signup';
import CustomHeader from '../src/components/headerComponent';
import React, { Component } from 'react';
import AppImages from '../src/images/index';
import { Dimensions, Image } from 'react-native';
import User from 'react-native-vector-icons/Entypo';
import Adduser from 'react-native-vector-icons/Entypo';
const SCREEN_WIDTH = Dimensions.get("screen").width;
const AutoStack = createStackNavigator({
    Signup: { screen: Signup },
    LoginData: { screen: LoginData },
    Login: { screen: Login },
}, {
    headerMode: 'none',
})


const tabNavigation = createMaterialTopTabNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            tabBarIcon: () => (
                <User name='user' color='white' size={25}></User>
            ),
            labelStyle: {
                fontSize: 16,
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
                <Adduser name='add-user' color='white' size={25}></Adduser>
            ,
            activeTintColor: 'yellow',
            labelStyle: {
                fontSize: 20,
                textAlign: 'center',
            },

        },
    },

}, {
    navigationOptions: {
        header: props => <CustomHeader {...props} />,
        title: "APPNAME",
        headerStyle: {
            backgroundColor: "transparent",
        },
        headerTintColor: "#fff",
        animationEnabled: true

    },
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
    GoogleProfileData: { screen: GoogleProfileData },
    FacebookProfileData: { screen: FacebookProfileData }
})

const AppNavigator = createAppContainer(AuthStack);

export default AppNavigator;
