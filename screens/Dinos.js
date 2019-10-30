//Dinos.js
import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Dinos extends Component {
    constructor(props) {
        super(props)
        
      }
    onPress = () => {
        alert('You touched the dinosaur')
    }
    
    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.onPress}>
                <Image style={styles.dinosaur} source ={require('../images/dino.jpg')} />
                </TouchableHighlight>
                <Text>This is another dinosaur</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    dinosaur: {
      width: "60%",
      height: "60%"
    }
  });
