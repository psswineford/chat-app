import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



class Chat extends Component {
    //set up gifted chat message state
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    // mount message state with static message for testing
    componentDidMount() {
        let name = this.props.route.params.name;
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello ${name}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Welcome to the chat',
                    createdAt: new Date(),
                    system: true,
                }
            ],
        })
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'blue'
                    }
                }}
                />
        )
    }

    //append new messages to state
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        let { name, bgColorSelector } = this.props.route.params;

        this.props.navigation.setOptions({ title: name })
        return (
            <View style={{ backgroundColor: bgColorSelector, flex: 1 }}>
                {/* <Text style={styles.chatScreenText}>Chat Screen</Text> */}
                
                    <GiftedChat
                        style={styles.chatScreenText}
                        renderBubble={this.renderBubble.bind(this)}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                            name: name,
                        }}
                    />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}




const styles = StyleSheet.create({

    chatScreenText: {
        width: '88%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: "#ffffff",
    },

});

export default Chat;