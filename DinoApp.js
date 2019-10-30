import React, {Component} from 'react';
import { Button, Image, ImageBackground,PanResponder, Animated, 
  StyleSheet, Text, TouchableHighlight, View } from 'react-native';
//import Dinos from './screens/Dinos'


let dino= './images/dino.jpg'
let cave = './images/cave.jpg'

export default class DinoApp extends Component {
    static navigationOptions ={
        title: "Level One"
    }

    offset = {x: 0, y: 0}
  constructor(props) {
    super(props);
  
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      dinochanged: false
    };
  }
  onPress=()=>{
    console.log("Dinosaur pressed")
    alert('you touched the dinosaur')
  }

  componentWillMount() {
    console.log('component mounted')
    // this._animatedValue = new Animated.ValueXY()
    // this._value = {x: 0, y: 0}
    
    // this._animatedValue.addListener((value) => this._value = value);
	// this._panResponder = PanResponder.create({
    //   onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
    //   onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
    //   onPanResponderGrant: (e, gestureState) => {
    //     this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
	// 	this._animatedValue.setValue({x: 0, y: 0});
    //   },
    //   onPanResponderMove: Animated.event([
    //     null, {dx: this._animatedValue.x, dy: this._animatedValue.y}
    //   ]), // Creates a function to handle the movement and set offsets
    //   onPanResponderRelease: () => {
    //     this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
    //   }
    // });
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
          console.log('offset', this.offset)
        this.state.pan.setOffset({x:this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },
  
    //   onPanResponderMove: (e, gestureState)=> {

    //    if(this.state.pan.y._value > 300){
    //       //comments
    //     }
    //     Animated.event([
    //     null, {dx: this.state.pan.x, dy: this.state.pan.y},
    //   ])(e, gestureState)},
    onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ], {
        listener: (all ) => {
            console.log('IM MOVING', this.state.pan.y._value)
            if(this.state.pan.y._value>500){
                alert('you made it home')
                this.props.navigation.navigate('GameOne')
            }
        }
    }),
  
      onPanResponderRelease: (e, all) => {
        console.log('pos: ', all )
        // if(this.state.pan.x._value>200&&this.state.pan.y._value>400){
        //   alert("The dinosaur is home")
        //   let dino = './images/dino2.png'
        //   this.state.pan.setValue({x:0, y: 0})
        //   this.setState({dinochanged: true})
        // }
        // //
        //this.offset = { x: this.state.pan.x._value, y: this.state.pan.y._value}
        //console.log('release', this.offset)
        //no need to set offset or values after release otherwise the image jumps back to its original position 
        this.state.pan.flattenOffset();

        // this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        // this.state.pan.setValue({x: 0, y: 0});
        // this.state.pan.flattenOffset();
        
      }
    });
  }


      render(){
        // Destructure the value of pan from the state
        let { pan } = this.state;
        // const pan = this._animatedValue
        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];
        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let imageStyle = {transform: [{translateX}, {translateY}]};
        console.log('styles', typeof styles.nest.top)

      return (
    

        <View style={styles.container}>
          <ImageBackground source={require('./images/mountain.jpg')} style={styles.backgroundImage}>
          
        
            {/*<Image style={styles.dinosaur} source={require('./images/dino.jpg')} onPress={this.onPress} />
            
      <Dinos />
      
      <Image style={styles.dinosaur} source={require(dino)} />*/}

            <Animated.View {...this._panResponder.panHandlers} 
              style={/*this.state.pan.getLayout()*/imageStyle}>

            
            <Image id="1" style={styles.dinosaur} source={require(dino)} />
            </Animated.View>
            <Text>Screen 1</Text>
            <Text style={styles.text}>Take the naughty dinosaur back home</Text>
            <Button onPress={() => this.props.navigation.navigate('GameOne')} title="GameOne"/>
            <Image source={require('./images/nest.png')} style={styles.nest} />
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
  dinosaur: {
    alignItems: 'center',
    width: "20%",
    height: "20%"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: "100%",
    height: "100%",
  },
  nest:{
    width:"50%",
    height:"50%",
    position:"absolute",
    left: 200,
    top: 500,
  },
  text: {
      color: "red"
  }
});
/*
import React, { Component } from 'react';
import { View } from 'react-native';
//import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import store from './store';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ChatRoom from './screens/ChatRoom';
import styles from './ShatApp.styles';

export default class DinoApp extends Component {
  render() {
    return (
        <Router>
          <Scene key="root">
            <Scene key="signIn" component={SignIn} title="Sign In" initial={true} />
            <Scene key="signUp" component={SignUp} title="Sign Up" />
          </Scene>
        </Router>

    );
  }
}*/
