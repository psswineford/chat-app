import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



 class Chat extends Component {
   
    render() {
        let {name, bgColorSelector} = this.props.route.params;

        this.props.navigation.setOptions({ title: name})
        return (
            <View style={{backgroundColor: bgColorSelector, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.chatScreenText}>Chat Screen</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
   
    chatScreenText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: "#ffffff",
    },

});

export default Chat;