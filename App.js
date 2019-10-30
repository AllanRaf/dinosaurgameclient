import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator} from 'react-navigation';
import HomeScreen from './HomeScreen'
import DinoApp from './DinoApp';
import Dinos from './screens/Dinos';

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  LevelOne: { screen: DinoApp },
  LevelTwo: {screen: Dinos}
});

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}




/*
import React, { Component } from 'react';
import { View } from 'react-native';
//import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import DinoApp from './DinoApp'
import Dinos from './screens/Dinos'


export default class App extends Component {
  render() {
    return (
        <Router>
          <Scene key="root">
            <Scene key="DinoApp" component={DinoApp} title="Start" initial={true} />
            <Scene key="Dino" component={Dinos} title="Dino" />
          </Scene>
        </Router>

    );
  }
}*/


