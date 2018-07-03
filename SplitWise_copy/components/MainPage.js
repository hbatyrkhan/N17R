import React, { Component } from 'react';
import {
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

export default class MainPage extends Component {
  renderMoney = friend => {
    if (friend.events.length === 0) {
      return <Text> no expenses</Text>;
    } else if (Math.abs(friend.money) < 1) {
      return <Text> Settled up</Text>;
    } else {
      return <Text> Total: {friend.money} </Text>;
    }
  };
  renderFriends = () => {
    return this.props.user.friends.map((friend, index) => {
      return (
        <View>
          <TouchableOpacity
            style={styles.history}
            onPress={() => this.props.historyPage(index)}>
            <Text>{friend.name}</Text>
            {this.renderMoney(friend)}
          </TouchableOpacity>
        </View>
      );
    });
  };
  renderAllFriends = () => {
    let plur = 's';
    if (this.props.user.friends.length === 1) {
      plur = '';
    }
    return (
      <View>
        <Text>
          You have {this.props.user.friends.length} friend{plur}:{' '}
        </Text>
        <View style={styles.infoFriends}>{this.renderFriends()}</View>
      </View>
    );
  };
  render() {
    return (
      <View style={this.props.container}>
        <Text>Home</Text>
        <View style={styles.info}>
          <Text style={styles.infoElement}>You owe: {this.props.user.owe}</Text>
          <Text style={styles.infoElement}>
            You are owed: {this.props.user.owed}
          </Text>
          <Text style={styles.infoElement}>
            Total: {this.props.user.owed - this.props.user.owe}
          </Text>
        </View>
        {this.props.user.friends.length === 0 ? (
          <Text>You have not added any friends yet.</Text>
        ) : (
          this.renderAllFriends()
        )}
        <Button
          onPress={() => this.props.handlePress()}
          title="+ ADD MORE FRIENDS"
          color="blue"
          accessibilityLabel="ADD FRIENDS"
        />
        <Button
          onPress={() => this.props.handleBillPress()}
          title="ADD a BILL"
          color="green"
          accessibilityLabel="ADD a BILL"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'gray',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoElement: {
    fontFamily: 'vincHand',
  },
});
