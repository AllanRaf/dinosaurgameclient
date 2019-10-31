import React, {Component} from 'react';
import { Button, Image, ImageBackground,PanResponder, Animated, 
  StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {connect} from 'react-redux'



let dino= './images/brachiosaurus.png'
let cave = './images/cave.jpg'
const addScore = function(){
  return {type: "INCREASE_SCORE",
          payload: 1}
}

export class DinoApp extends Component {
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
          console.log('e', e)
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
            if(this.state.pan.y._value>500){
                alert('YUM YUM YUM, Time for lunch')
                this.props.navigation.navigate('LevelTwo')
            }
        }
    }),
  
      onPanResponderRelease: (e, all) => {
        
        console.log('this.props.score', this.props.score, 'this.props.state', this.props.state)
        this.props.dispatch({type:"INCREASE_SCORE", payload: 1})
        console.log('this.props.score.state', this.props.score.state)
     
        //no need to set offset or values after release otherwise the image jumps back to its original position 
        this.state.pan.flattenOffset();

        
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

      return (
    

        <View style={styles.container}>
          <ImageBackground source={require('./images/forest2.jpg')} style={styles.backgroundImage}>
          <Button style={styles.butt} title="Return to the Home Page" onPress={() => this.props.navigation.navigate('HomeScreen')}>Home Page</Button>
          
          <Text style={styles.text}>Lure the brachiosaurus back to your lair for breakfast</Text>
            <Animated.View {...this._panResponder.panHandlers} 
              style={imageStyle}>

            <Image name="dino" key="2" style={styles.dinosaur} source={require(dino)} />
            </Animated.View>
            
            <Image source={require('./images/trex3.png')} style={styles.nest} />
            </ImageBackground>
        </View>
        
    
      );
    }
}


function mapStateToProps(state){
  return{
     score: state
  }
}

export default connect(mapStateToProps)(DinoApp);

  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dinosaur: {
    alignItems: 'center',
    width: 150,
    height: 150
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: "100%",
    height: "100%",
  },
  nest:{
    width:250,
    height:150,
    position:"absolute",
    left: 120,
    top: 580,
  },
  text: {
      color: "red"
  }
});
