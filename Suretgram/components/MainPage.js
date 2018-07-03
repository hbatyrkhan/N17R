import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class App extends Component {
  state = {
    nickname: '',
  };
  
  handleSearch = () => {
    this.props.handleSearch(this.state.nickname);
    this.textInput.clear();
  };
  
  render() {
    return (
      <View style={this.props.container}>
        <View style={styles.userSearch}>
          <TextInput
            style={styles.userInput}
            underlineColorAndroid="transparent"
            placeholder="Type nickname..."
            onChangeText={text => this.setState({ nickname: text })}
            ref={input => {
              this.textInput = input;
            }}
            onSubmitEditing={this.handleSearch}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.handleSearch}>
            <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
              {' '}
              Search{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <Text />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userSearch: {},
  userInput: {
    alignSelf: 'center',
    height: 40,
    width: 200,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#FF5722',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  searchButton: {
    alignSelf: 'center',
    backgroundColor: 'red',
    height: 30,
    width: 190,
    marginTop: 10,
  },
});
