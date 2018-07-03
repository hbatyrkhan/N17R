import React, { Component } from 'react';
import {
  Dimensions,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
    };
  }
  handleAddFriend = () => {
    if (this.state.nameValue.length > 0) {
      this.props.handleAdd(this.state.nameValue);
      this.textInput.clear();
      this.setState({ nameValue: '' });
    }
  };
  render() {
    return (
      <View style={this.props.container}>
        <Text>Name of your friend?</Text>
        <View style={styles.inputview}>
          <TextInput
            style={styles.addName}
            placeholder="Type name..."
            type="text"
            onChangeText={text => this.setState({ nameValue: text })}
            ref={input => {
              this.textInput = input;
            }}
            onSubmitEditing={this.handleAddFriend}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={this.handleAddFriend}>
            <Text> Add friend </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.numfriends}>
          {' '}
          Friends added: {this.props.added}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.handlePress()}>
          <Text> Back Home </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputview: {
    flexDirection: 'row',
  },
  numfriends: {
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: '#FF8C00',
    padding: 10,
    margin: 10,
    width: 100,
    alignSelf: 'center',
  },
  addName: {
    flex: 2,
    height: 50,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#00FF00',
    alignItems: 'center',
    paddingTop: 10,
    height: 40,
  },
});
