import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';

import MainPage from './components/MainPage';
import DetailsPage from './components/DetailsPage';
import AddPage from './components/AddPage';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjj6owq7q815o01004bfzb13o'
});

const RootStack = createStackNavigator(
  {
    Home: MainPage,
    Details: DetailsPage,
    AddRecipe: AddPage,
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends Component {
    render() {
      return(
        <ApolloProvider client={client}>
          <RootStack />
        </ApolloProvider>
      )
    }
}