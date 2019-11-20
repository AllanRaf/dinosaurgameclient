//FullUp.js

import React, { Component } from "react";
import {
  Button,
  Image,
  ImageBackground,
  PanResponder,
  Animated,
  StyleSheet,
  Text,
  View
} from "react-native";

let dino = "../images/full.jpg";

export default class LevelThree extends Component {
  static navigationOptions = {
    title: "Level Three"
  };

  offset = { x: 0, y: 0 };
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      dinoDamage: false
    };
  }
  onPress = () => {
    alert("you touched the dinosaur");
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        console.log("offset", this.offset);
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        {
          listener: all => {
            if (
              this.state.pan.x._value > 200 &&
              this.state.pan.y._value > 400
            ) {
              this.setState({ dinoDamage: true });
              //alert('You are now full up')
            }
          }
        }
      ),

      onPanResponderRelease: (e, all) => {
        //no need to set offset or values after release otherwise the image jumps back to its original position
        this.state.pan.flattenOffset();
      }
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan } = this.state;
    // const pan = this._animatedValue
    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];
    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = { transform: [{ translateX }, { translateY }] };

    return (
      <View style={styles.container}>
        <Button
          style={styles.butt}
          title="Return to the Home Page"
          onPress={() => this.props.navigation.navigate("HomeScreen")}
        >
          Home Page
        </Button>
        <Image source={require(dino)} style={styles.dinosaurs} />

        <Text style={styles.text}>Well done, you ate all the dinosaurs.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  },
  dinosaur: {
    alignItems: "center",
    width: 250,
    height: 150,
    top: 150,
    left: 100
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    height: "100%"
  },
  nest: {
    width: 250,
    height: 150,
    position: "absolute",
    left: 120,
    top: 580
  },
  fire: {
    width: 100,
    height: 100,
    position: "absolute",
    left: 100,
    top: 300
  },
  text: {
    color: "red",
    fontSize: 20
  },
  butt: {
    borderStyle: "solid",
    borderBottomColor: "black"
  }
});
