//HomeScreen.js

import React, {Component} from 'react';
import { Button, Image, ImageBackground,PanResponder, Animated, 
  StyleSheet, Text, TouchableHighlight, View } from 'react-native';

let mountain = './images/mountain2.jpg'
let dinosaur = './images/trex3.png'

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}
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
            <Button style={styles.butt} title="START THE HUNT" onPress={this.onPressGameOne}>Start</Button><Button title="IN APP PURCHASES">Purchase</Button>
              <Text style={styles.text}>You are a tyrannosaurus rex on a hunt.  Lure all the tasty dinosaurs back to your lair
              for breakfast, lunch and dinner.</Text>
              <ImageLoader style = {styles.dinosaur} source = {require(dinosaur)} />
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
    //backgroundColor: '#fff',
    fontSize: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  dinosaur: {
    alignItems: 'center',
    width: 250,
    height: 150,
    top: 150,
    left: 100
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: "100%",
    height: "100%",
  },

  text: {
      color: "red",
      fontWeight: "bold",
      fontSize: 20,
      margin: 40
  },
  butt:{
    borderStyle: "solid",
    borderBottomColor: "black"
  }
});