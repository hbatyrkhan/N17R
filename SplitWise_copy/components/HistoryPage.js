import React, { Component } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  Picker,
} from 'react-native';
import { Constants } from 'expo';
// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class HistoryPage extends Component {
  constructor(props) {
    super(props);
  }
  renderHistory = item => {
    return (
      <View style={styles.flatview}>
        <Text style={styles.flattext}>{item.description}: </Text>
        <Text style={styles.flattext}>{item.money}</Text>
      </View>
    );
  };
  renderEvents = () => {
    if (this.props.events.length > 0) {
      console.log(this.props.events);
      return (
        <FlatList
          data={this.props.events}
          renderItem={({ item }) => this.renderHistory(item)}
          keyExtractor={item => new Date().getTime()}
        />
      );
    } else {
      return (
        <View style={styles.textview}>
          <Text style={styles.notText}>
            You don't have any bills with this friend yet
          </Text>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={this.props.container}>
        {this.renderEvents()}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.handleBackPress()}>
          <Text> Back Home </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'purple',
    padding: 10,
    margin: 10,
    width: 110,
    alignSelf: 'center',
  },
  flatview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textview: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    width: 170,
    alignItems: 'center',
  },
  notText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
  },
  flattext: {
    fontSize: 20,
    color: 'orange',
  },
});
