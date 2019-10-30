//HomeScreen.js

import React, {Component} from 'react';
import { Button, Image, ImageBackground,PanResponder, Animated, 
  StyleSheet, Text, TouchableHighlight, View } from 'react-native';
//import Dinos from './screens/Dinos'
let mountain = './images/mountain2.jpg'
export default class HomeScreen extends Component {
    static navigationOptions ={
        title: "Home"
    }
    onPressGameOne = ()=>{
        this.props.navigation.navigate('LevelOne')
    }


      render(){

      return (
    

        <View style={styles.container}>
            <ImageBackground source={require(mountain)} style={styles.backgroundImage}>
            <Button title="start" onPress={this.onPressGameOne}>Start</Button><Button title="purchase">Purchase</Button>
              <Text style={styles.TEXT}>You are a Pachycephalosaurus who is responsible for a Dino Hotel
                  Some of the guests have not returned within their curfew and it is your responsibility
                  to usher them back to the hotel.  If you fail you will be fired from your job by the big boss
              </Text>
              </ImageBackground>
           
        </View>
        
    
      );
    }
}

  



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  intro: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: "100%",
    height: "100%",
  },

  text: {
      color: "red"
  }
});