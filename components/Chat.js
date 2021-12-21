import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const firebase = require("firebase");
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAgF426pSv47S1M-sPGxFpXGFY4moPjKlY",
    authDomain: "chat-app-921b8.firebaseapp.com",
    projectId: "chat-app-921b8",
    storageBucket: "chat-app-921b8.appspot.com",
    messagingSenderId: "625340927386",
    appId: "1:625340927386:web:6e4bc3581becca61a5fe23"
  };
  

class Chat extends Component {
    //set up gifted chat message state
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            }
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
          this.referenceMessages = firebase.firestore().collection('messages');
          this.referenceChatUser= null;
    }

    // mount message state with static message for testing
    componentDidMount() {
        let name = this.props.route.params.name;
        
        this.unsubscribe = this.referenceMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
    
          //update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
                _id: user.uid,
                name: name,
                avatar: "https://placeimg.com/140/140/any",
            },
          });
          // create a reference to the active user's documents 
          this.referenceChatUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
          // listen for collection changes for current user 
          this.unsubscribeListUser = this.referenceChatUser.onSnapshot(this.onCollectionUpdate);
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
      };

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
          // get the QueryDocumentSnapshot's data
          let data = doc.data();
          messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
                _id: data.user._id,
                name: data.user.name,
                avatar: data.user.avatar
              },
              image: data.image,
              location: data.location
          });
        });
        this.setState({
            messages: messages
        })
    }

    addMessages() {
        const message = this.state.messages [0];

        this.referenceMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || "",
            location: message.location || null,
        });
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
    };

    //append new messages to state
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
        })
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
                        user={this.state.user}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.user._id,
                            name: this.state.name,
                            avatar: this.state.user.avatar,
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