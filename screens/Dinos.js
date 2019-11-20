//Dinos.js

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

let dino = "../images/triceratops.png";
let cave = "../images/cave.jpg";

export default class Dinos extends Component {
  static navigationOptions = {
    title: "Level One"
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
            console.log(
              "this.state.pan.x._value",
              this.state.pan.x._value,
              this.state.pan.y._value
            );
            if (
              this.state.pan.x._value < 169 &&
              this.state.pan.y._value > 271
            ) {
              alert("your lunch got burnt");
              this.state.pan.setValue({ x: 0, y: 0 });
              this.setState({ dinoDamage: true });
            } else if (
              this.state.pan.x._value > 197 &&
              this.state.pan.y._value > 387
            ) {
              alert("YUM YUM YUM, time for dinner");
              this.props.navigation.navigate("LevelThree");
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
    console.log("styles", typeof styles.nest.top);

    return (
      <View style={styles.container}>
        <ImageBackground source={require(cave)} style={styles.backgroundImage}>
          <Text>Screen 1</Text>
          {this.state.dinoDamage ? (
            <Text style={styles.text}>Dino got burnt!</Text>
          ) : (
            <Text></Text>
          )}
          <Text style={styles.text}>
            Lure the triceratops back to your lair for lunch but make sure he
            avoids the fire
          </Text>
          <Button
            onPress={() => this.props.navigation.navigate("LevelThree")}
            title="LevelThree"
          />
          <Animated.View {...this._panResponder.panHandlers} style={imageStyle}>
            <Image style={styles.dinosaur} source={require(dino)} />
          </Animated.View>
          <Image source={require("../images/fire2.png")} style={styles.fire2} />
          <Image source={require("../images/nest.png")} style={styles.nest} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  dinosaur: {
    alignItems: "center",
    width: 200,
    height: 150,
    top: 10,
    left: 10,
    zIndex: 25
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
    zIndex: 1
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
    top: 300,
    zIndex: 5
  },
  fire2: {
    top: 200,
    left: 100,
    width: 100,
    height: 100,
    zIndex: 5
  },
  text: {
    color: "red"
  }
});
