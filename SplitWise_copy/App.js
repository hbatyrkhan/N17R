import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import { Constants } from 'expo';
const screenNames = ['Home', 'AddFriend', 'Event', 'History'];

// You can import from local files
import MainPage from './components/MainPage';
import AddPage from './components/AddPage';
import EventPage from './components/EventPage';
import HistoryPage from './components/HistoryPage';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      owe: 0,
      owed: 0,
      friends: [], // ind, name, money, events {ind: 0, name:'A', money:0, events: [{description: 'pub', money:10},] }
      historyid: 0,
      added: 0,
    };
  }
  historyPage = index => {
    this.setState({
      historyid: index,
      id: 3,
    });
  };
  handlePressAdd = () => {
    this.setState({
      id: 1,
      added: 0,
    });
  };
  handlePressHome = () => {
    this.setState({
      id: 0,
      added: 0,
    });
  };
  handleAdd = nname => {
    let id = this.state.friends.length;
    this.setState({
      friends: [
        ...this.state.friends,
        { ind: id, name: nname, money: 0, events: [] },
      ],
      added: this.state.added + 1,
    });
  };
  handleBillPress = () => {
    this.setState({
      id: 2,
    });
  };
  handleMainPress = (amount, involved, who_paid, _description) => {
    const debt = amount / (involved.length + 1);
    let newFriends,
      newOwed = 0,
      newOwe = 0;
    if (who_paid === this.state.friends.length) {
      newFriends = this.state.friends.map((item, index) => {
        let newItem = item;
        if (involved.includes(index)) {
          newItem.money -= debt;
          newItem.money = Math.floor(newItem.money * 100) / 100;
          newItem.events = [
            ...newItem.events,
            { description: _description, money: -debt },
          ];
        }

        return newItem;
      });
    } else {
      newFriends = this.state.friends.map((item, index) => {
        let newItem = item;
        if (who_paid === index) {
          newItem.money += debt;
          newItem.events = [
            ...newItem.events,
            { description: _description, money: debt },
          ];
        }
        newItem.money = Math.floor(newItem.money * 100) / 100;
        return newItem;
      });
    }
    newFriends.map((item, index) => {
      if (item.money < 0) {
        newOwed -= item.money;
      } else {
        newOwe += item.money;
      }
      return item;
    });
    this.setState({
      id: 0,
      friends: newFriends,
      owed: Math.floor(newOwed * 100) / 100,
      owe: Math.floor(newOwe * 100) / 100,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.id === 0 && (
          <MainPage
            container={styles.containerHome}
            user={{
              id: this.state.id,
              friends: this.state.friends,
              owe: this.state.owe,
              owed: this.state.owed,
            }}
            handlePress={this.handlePressAdd}
            handleBillPress={this.handleBillPress}
            historyPage={this.historyPage}
          />
        )}
        {this.state.id === 1 && (
          <AddPage
            container={styles.containerAddPage}
            added={this.state.added}
            handleAdd={this.handleAdd}
            handlePress={this.handlePressHome}
          />
        )}
        {this.state.id === 2 && (
          <EventPage
            container={styles.containerEventPage}
            friends={this.state.friends}
            handleMainPress={this.handleMainPress}
            handleBackPress={this.handlePressHome}
          />
        )}
        {this.state.id === 3 && (
          <HistoryPage
            container={styles.containerHistoryPage}
            handleBackPress={this.handlePressHome}
            events={this.state.friends[this.state.historyid].events}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4B5',
  },
  containerHome: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-around',
  },
  containerAddPage: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#A9A9A9',
  },
  containerEventPage: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'orange',
  },
  containerHistoryPage: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#E6E6FA',
  },
});
