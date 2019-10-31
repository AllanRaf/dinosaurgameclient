import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator} from 'react-navigation';
import { Provider } from 'react-redux'
import store from './store'
import HomeScreen from './HomeScreen'
import DinoApp from './DinoApp';
import Dinos from './screens/Dinos';
import LevelThree from './screens/LevelThree'
import FullUp from './screens/FullUp'

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  LevelOne: { screen: DinoApp },
  LevelTwo: {screen: Dinos},
  LevelThree: {screen: LevelThree},
  FullUp: {screen: FullUp}
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <AppNavigator />
      </Provider>
    );
  }
}



