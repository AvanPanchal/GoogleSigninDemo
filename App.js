import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import DemoLayoutScreen from './src/screens/DemoLayoutScreen';

export default class App extends Component {
  render() {
    return (
      <DemoLayoutScreen></DemoLayoutScreen>
    );
  }

};

