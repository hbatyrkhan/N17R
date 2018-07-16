import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { 
  FAB,
  Button,
  Divider, 
  Text,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
} from 'react-native-paper';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ALL_RECIPES = gql`
{
  allRecipes {
    id
    title
    description
    instructions
    ingredients
  }
}
`;

export default class MainPage extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'HOME', // navigation.getParam('otherParam', 'A Nested Details Screen')
    }
  }
  state = {
    refreshing: false,
    added: [],
  }
  keyExtractor = (item) => {
    return item.id;
  }
  renderRecipes = (ldata) => {
    let data = ldata;
    if(!!this.state.added) {
      data = ldata.concat(this.state.added);
    }
    return data.map((item, index) => {
      return (
        <Card key={index}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Details", {
              item: item,
            })}
            >
            <CardContent style={styles.recipeList}>
            <Title>
              {item.title}
            </Title>
            <Paragraph style={{marginTop: 7}}>
              {item.description}
            </Paragraph>
            </CardContent>
          </TouchableOpacity>
        </Card>
      )
    })
  }
  _onRefresh = async() => {
    await this.setState({refreshing: true});
    await this.setState({refreshing: false});
  }
  handleAdd = (obj) => {
    this.setState({
      added: [...this.state.added, obj],
    }, () => {
    })
  }
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Query query={GET_ALL_RECIPES}>
        {({loading, data, error, refetch}) => (
          loading
            ? <ActivityIndicator />
            : (
              <View>
                {this.renderRecipes(data.allRecipes)}
              </View>
            )
        )}
      </Query>
      <FAB
        small={true}
        icon="add"
        style={styles.addButton}
        onPress={()=>this.props.navigation.navigate("AddRecipe", {
          handleAdd: this.handleAdd,
        })}
      />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  recipeList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addButton: {
    width: 43, 
    alignSelf: 'flex-end', 
    marginTop: 10,
  },
});
