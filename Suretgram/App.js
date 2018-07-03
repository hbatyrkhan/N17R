import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import MainPage from './components/MainPage';
import PicsPage from './components/PicsPage';

// or any pure javascript modules available in npm
// <MainPage container={styles.MainPageContainer}/>
export default class App extends Component {
  state = {
    id: 0,
    nickname: 0,
  };

  handleSearch = name => {
    this.setState({
      id: 1,
      nickname: name,
    });
  };
  handleBack = () => {
    this.setState({
      id: 0,
      nickname: '',
    });
  };
  render() {
    return (
      <View>
        {this.state.id === 0 && (
          <MainPage
            container={styles.MainPageContainer}
            handleSearch={this.handleSearch}
          />
        )}
        {this.state.id === 1 && (
          <PicsPage
            handleBack={this.handleBack}
            container={styles.PicsPageContainer}
            nickname={this.state.nickname}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainPageContainer: {
    flex: 1,
    paddingTop: 250,
  },
  PicsPageContainer: {
    paddingTop: Constants.statusBarHeight,
  },
});
