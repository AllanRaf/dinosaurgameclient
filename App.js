import React, {Component} from 'react';
import { Image, ImageBackground,PanResponder, Animated, 
  StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Dinos from './screens/Dinos'
import Draggable from 'react-native-draggable';

let dino= './images/dino3.png'
let cave = './images/cave.jpg'

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }
  onPress=()=>{
    console.log("Dinosaur pressed")
    alert('you touched the dinosaur')
  }

  componentWillMount() {
    console.log('component mounted')
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        console.log('onPanResponderGrant this.state.pan is', this.state.pan.x)
        this.state.pan.setValue({x:this.state.pan.x._value, y: this.state.pan.y._value});
        
      },
  
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
  
      onPanResponderRelease: (e, {vx, vy}) => {
        console.log('onPanResponderRelease this.state.pan is', this.state.pan)
        //this.state.pan.setValue({x: vx, y: vy}) resets image to its original position
        console.log('this.state.pan.y', this.state.pan.y, 'versus', this.state.pan.y._value)
        if(this.state.pan.x._value>200&&this.state.pan.y._value>400){
          alert("The dinosaur is home")
          let dino = './images/dino2.png'
          this.state.pan.setValue({x:0, y: 0})

        }
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.flattenOffset();

      }
    });
  }


      render(){
        // Destructure the value of pan from the state
        let { pan } = this.state;
        // Calculate the x and y transform from the pan value
        let [translateX, translateY] = [pan.x, pan.y];
        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        let imageStyle = {transform: [{translateX}, {translateY}]};
        console.log('styles', typeof styles.nest.top)

      return (
    

        <View style={styles.container}>
          <ImageBackground source={require(cave)} style={styles.backgroundImage}>
          
        <Text>Take the naughty dinosaur back home</Text>
            {/*<Image style={styles.dinosaur} source={require('./images/dino.jpg')} onPress={this.onPress} />
            <Text>The above is a dinosaur GAME HAAAAA</Text>
      <Dinos />*/}
      
      <Image style={styles.dinosaur} source={require(dino)} />

            <Animated.View {...this._panResponder.panHandlers} 
              style={/*this.state.pan.getLayout()*/imageStyle}>

            
            <Image id="1" style={styles.dinosaur} source={require(dino)} />
            </Animated.View>
            <Image source={require('./images/nest.png')} style={styles.nest} />

            {/*<Animated.View {...this._panResponder.panHandlers} style={this.state.pan.getLayout()}>
      <Image style={styles.dinosaur} source={require('./images/dino2.png')} />
    </Animated.View>*/}
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
  }
});
