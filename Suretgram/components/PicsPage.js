import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

// .graphql.user.edge_owner_to_timeline_media.edges
/*

        */
export default class PicsPage extends Component {
  state = {
    dataSource: [],
  };
  componentDidMount() {
    console.log('1');
    this.getPics();
  }
  getPics = async () => {
    try {
      const response = await fetch(
        `https://apinsta.herokuapp.com/u/${this.props.nickname}`
      );
      const result = await response.json();
      this.setState({
        dataSource: result.graphql.user.edge_owner_to_timeline_media.edges,
      });
    } catch (error) {
      alert('Wrong username: ' + this.props.nickname);
      this.props.handleBack();
    }
  };
  handleBack = () => {
    this.props.handleBack();
  };
  render() {
    return (
      <View style={this.props.container}>
        <TouchableOpacity style={styles.searchButton} onPress={this.handleBack}>
          <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
            {' '}
            Back{' '}
          </Text>
        </TouchableOpacity>
        <Text> {this.props.nickname}</Text>
        <Text> {this.state.dataSource.length} pictures: </Text>
        <FlatList
          data={this.state.dataSource}
          numColumns={5}
          renderItem={({ item }) => (
            <Image
              style={{ width: 200, height: 100, flex: 1 }}
              source={{ uri: item.node.display_url }}
            />
          )}
          keyExtractor={item => item.node.display_url}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchButton: {
    alignSelf: 'center',
    backgroundColor: 'purple',
    height: 30,
    width: 190,
    marginTop: 10,
  },
});
