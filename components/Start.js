import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
const backgroundImage = require('../assets/Background-Image.png');


class Start extends Component {
    state = {
        name: '',
        bgColorSelector: '',
        bgColors: {
            color1: '#090C08',
            color2: '#474056',
            color3: '#8A95A5',
            color4: '#B9C6AE',
        },
    };



    changeBackGroundColor = (newBGColor) => {
        this.setState({ bgColorSelector: newBGColor });
    };



    render() {
        return (

            <View style={styles.mainContainer}>
                {/* Background image */}
                <ImageBackground source={backgroundImage} resizeMode='cover' style={styles.backgroundImage}>
                    {/* Title area */}
                    <View style={styles.titleArea}>
                        <Text style={styles.titleText}>Chat-App</Text>
                    </View>
                    {/* Area where the input form, color selector, and start chatting button exist */}
                    <View style={styles.formsArea}>
                        {/* Name Input */}
                        <TextInput style={styles.inputName} onChangeText={(name) => this.setState({ name })} value={this.state.name} placeholder='  Your name...' />
                        {/* Color Selector */}
                        <Text style={styles.colorText}>Choose Background Color</Text>
                        <View style={styles.colorSelector}>

                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Select black background"
                                accessibilityHint="Lets you choose the background color of the chat screen"
                                accessibilityRole="button"
                                style={styles.colorButton1}
                                onPress={() => this.changeBackGroundColor(this.state.bgColors.color1)}
                            >

                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Select purple background"
                                accessibilityHint="Lets you choose the background color of the chat screen"
                                accessibilityRole="button"
                                style={styles.colorButton2}
                                onPress={() => this.changeBackGroundColor(this.state.bgColors.color2)}
                            >

                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Select grey background"
                                accessibilityHint="Lets you choose the background color of the chat screen"
                                accessibilityRole="button"
                                style={styles.colorButton3}
                                onPress={() => this.changeBackGroundColor(this.state.bgColors.color3)}
                            >

                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Select olive background"
                                accessibilityHint="Lets you choose the background color of the chat screen"
                                accessibilityRole="button"
                                style={styles.colorButton4}
                                onPress={() => this.changeBackGroundColor(this.state.bgColors.color4)}
                            >

                            </TouchableOpacity>
                        </View>
                        {/* Start Chatting Button */}
                        <Pressable style={styles.startchatbutton}
                            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColorSelector: this.state.bgColorSelector })}
                        >
                            <Text style={styles.chatButtonText}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },
    titleArea: {
        width: "70%",
        height: "40%",
        alignItems: "center",
        resizeMode: "contain",
        marginTop: 30,
        marginBottom: 70,
    },
    titleText: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff'
    },
    formsArea: {
        backgroundColor: 'white',
        width: '88%',
        height: '44%',
        padding: 20,
        alignItems: 'center'
    },
    inputName: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: .5,
        borderColor: 'gray',
        height: 40,
        width: '88%',
        borderWidth: 1,

    },
    colorSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    colorText: {
        padding: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#767083',
        opacity: 1,
    },

    colorButton1: {
        marginRight: 20,
        borderRadius: 20,
        height: 40,
        width: 40,
        backgroundColor: "#090C08",
    },
    colorButton2: {
        marginRight: 20,
        borderRadius: 20,
        height: 40,
        width: 40,
        backgroundColor: "#474056",
    },
    colorButton3: {
        marginRight: 20,
        borderRadius: 20,
        height: 40,
        width: 40,
        backgroundColor: "#8A95A5",
    },
    colorButton4: {
        borderRadius: 20,
        height: 40,
        width: 40,
        backgroundColor: "#B9C6AE",
    },
    startchatbutton: {
        padding: 20,
        alignItems: 'center',
        width: '88%',
        borderRadius: 0,
        backgroundColor: '#757083',
    },
    chatButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: "#ffffff",
    }

});

export default Start;
