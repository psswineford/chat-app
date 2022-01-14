import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
//import { Constants, MapView, Location, Permissions } from 'expo';
//import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

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
        this.referenceChatUser = null;
    }

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    // mount message state with static message for testing
    componentDidMount() {
        let name = this.props.route.params.name;
    
        NetInfo.fetch().then((connection) => {
          if (connection.isConnected) {
    
            this.setState({ isConnected: true });
    
            this.unsubscribe = this.referenceMessages.orderBy("createdAt", "desc").onSnapshot(this.onCollectionUpdate);
    
            this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
              if (!user) {
                await firebase.auth().signInAnonymously();
              }
              this.setState({
                uid: user.uid,
                messages: [],
                user: {
                  _id: user.uid,
                  name: name,
                  avatar: 'https://placeimg.com/140/140/any',
                },
              });
            });
    
            this.saveMessages();
    
          } else {
            this.setState({ isConnected: false });
            this.getMessages();
          }
        });
      }

    componentWillUnmount() {
        //this.authUnsubscribe();
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
        const message = this.state.messages[0];

        this.referenceMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || "",
            location: message.location || null,
        });
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteMessages() {
        try {
          await AsyncStorage.removeItem('messages');
          this.setState({
            messages: []
          })
        } catch (error) {
          console.log(error.message);
        }
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

    renderInputToolbar = (props) => {
        if (this.state.isConnected == false) {
        } else {
          return <InputToolbar {...props} />;
        }
      }

    //append new messages to state
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
          this.addMessages();
            this.saveMessages();
        })
    }

    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
      }

      renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
          return (
            <MapView
              style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
              region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          );
        }
        return null;
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
                    renderInputToolbar={this.renderInputToolbar}
                    messages={this.state.messages}
                    user={this.state.user}
                    renderActions={this.renderCustomActions}
                    //rrenderCustomView={this.renderCustomView}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
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