import React, { Component } from 'react';
import {
  TouchableOpacity,
  CheckBox,
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

export default class EventPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pay: this.props.friends.length,
    amount: 0,
    have: [],
    description: '',
  };
  renderPayFriends = () => {
    return this.state.have.map((item, index) => {
      return <Picker.Item label={this.props.friends[item].name} value={item} />;
    });
  };
  valueChanged = index => {
    console.log(index, this.state.have);
    if (this.state.have.includes(index)) {
      this.setState({
        have: this.state.have.filter(id => id !== index),
      });
    } else {
      const arr = [...this.state.have, index];
      this.setState({
        have: arr,
      });
    }
  };
  renderAllFriends = () => {
    return this.props.friends.map((item, index) => {
      return (
        <View style={styles.friendstyle}>
          <Text>{item.name}</Text>
          <CheckBox
            title={item.name}
            value={this.state.have.includes(index)}
            onValueChange={() => {
              this.valueChanged(index);
            }}
          />
        </View>
      );
    });
  };
  handleAdd = () => {
    if (
      this.state.have.length > 0 &&
      this.state.description.length > 0 &&
      this.state.amount > 0
    ) {
      this.props.handleMainPress(
        this.state.amount,
        this.state.have,
        this.state.pay,
        this.state.description
      );
    }
  };
  render() {
    return (
      <View style={this.props.container}>
        <Text style={styles.title}>Add a bill</Text>
        <View>
          <Text>Involved friends</Text>
          <View>{this.renderAllFriends()}</View>
        </View>
        <View>
          <Text>Who paid</Text>
          <Picker
            selectedValue={this.state.pay}
            style={styles.pickerstyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ pay: itemValue })
            }>
            <Picker.Item label="You" value={this.props.friends.length} />
            {this.renderPayFriends()}
          </Picker>
        </View>
        <View>
          <TextInput
            style={styles.eventName}
            placeholder="add description..."
            type="text"
            onChangeText={text => this.setState({ description: text })}
          />
          <TextInput
            style={styles.amount}
            placeholder="AMOUNT"
            type="number"
            keyboardType="numeric"
            onChangeText={text => this.setState({ amount: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleAdd}>
            <Text> Add </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.handleBackPress()}>
            <Text> Back Home </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pickerstyle: {
    height: 50,
    backgroundColor: 'blue',
    color: 'white',
    width: 100,
  },
  friendstyle: {
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: 'purple',
    padding: 10,
    margin: 10,
    width: 110,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 110,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  amount: {
    alignSelf: 'center',
    fontFamily: 'vincHand',
    height: 60,
    width: 110,
    backgroundColor: 'gray',
    color: 'gold',
  },
  eventName: {
    alignSelf: 'center',
    fontFamily: 'vincHand',
    height: 60,
    width: 110,
    backgroundColor: '#7FFF00',
    color: 'blue',
  },
});
