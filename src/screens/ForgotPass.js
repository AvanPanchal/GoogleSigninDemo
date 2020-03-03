// import React, { Component } from "react";
// import { Button, Text, View } from "react-native";
// import Modal from "react-native-modal";

// export default class ForgotPass extends Component {
//     state = {
//         isModalVisible: false
//     };

//     toggleModal = () => {
//         this.setState({ isModalVisible: !this.state.isModalVisible });
//     };

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <Button title="Show modal" onPress={this.toggleModal} />
//                 <Modal isVisible={this.state.isModalVisible}
//                     animationIn={'slideInUp'}
//                     coverScreen={true}
//                 >
//                     <View style={{
//                         flex: 1, height: 50,
//                         backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'
//                     }}>
//                         <Text>Recover Password</Text>
//                         <Button title="Hide modal" onPress={this.toggleModal} />
//                     </View>
//                 </Modal>
//             </View>
//         );
//     }
// }