// import React, { Component } from "react";
// import {
//     View,
//     Text,
//     StyleSheet, TouchableOpacity
// } from "react-native";

// class Homescreen extends Component {
//     render() {
//         return (
//             <View style={styles.maincontainer}>
//                 <View style={styles.appnamestyle}>
//                     <Text style={{ color: 'white', fontSize: 25 }}>APPNAME</Text>
//                 </View>
//                 <View style={styles.container}>
//                     <TouchableOpacity
//                         style={{
//                             minWidth: 200,
//                             marginRight: 2, height: 50, alignItems: 'center', justifyContent: 'center',
//                             backgroundColor: '#0288d1', display: 'flex', borderRadius: 5, shadowColor: '#2AC062', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { height: 10, width: 5 },
//                         }}
//                         onPress={() => this.props.navigation.navigate('Login')}>
//                         <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Login</Text>
//                     </TouchableOpacity>


//                     <TouchableOpacity
//                         style={{
//                             minWidth: 200, height: 50, alignItems: 'center', justifyContent: 'center',
//                             backgroundColor: '#0288d1', display: 'flex', borderRadius: 5, shadowColor: '#2AC062', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { height: 10, width: 5 },
//                         }}
//                         onPress={() => this.props.navigation.navigate('Signup')}>
//                         <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Sign Up</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }
// export default Homescreen;

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'row',
//         flex: 1,
//         marginTop: 55
//     },
//     maincontainer: {
//         height: 150,
//         backgroundColor: '#4dd'
//     },
//     appnamestyle: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 25
//     }
// });