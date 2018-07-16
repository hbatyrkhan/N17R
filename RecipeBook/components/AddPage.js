import React, { Component } from 'react';
import {
  TouchableOpacity,
  KeyboardAvoidingView ,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { 
  Modal,
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
  TextInput,
} from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const CREATE_RECIPE = gql`
  mutation createRecipe($title: String!, $description : String!, $ingredients: [String!]!, $instructions: [String!]!) {
    createRecipe(title: $title, description: $description, ingredients: $ingredients, instructions: $instructions) {
        id
    }
  }
`;

export default class AddPage extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Add new recipe",
    }
  }
  state = {
      recipeTitle: '',
      recipeDescription: '',
      recipeIngredients: [],
      recipeInstructions: [],
      recipeIngredientsText: '',
      recipeInstructionsText: '',
  }
  isvisible = () => {
    if(!!this.state.recipeTitle && !!this.state.recipeIngredients && 
      !!this.state.recipeInstructions && !!this.state.recipeDescription) {
      return true;
    } else {
      return false;
    }
  }
  handleAdd = () => {
    const newRecipe = {
      title: this.state.recipeTitle,
        description: this.state.recipeDescription,
        ingredients: this.state.recipeIngredients,
        instructions: this.state.recipeInstructions
    };
    this.props.navigation.getParam("handleAdd")(newRecipe);
  }
  handleAddIngredients = () => {
    if(!this.state.recipeIngredientsText) {
      return;
    }
    console.log(this.state.recipeIngredientsText);
    console.log(this.state.recipeIngredients);
    this.setState({
      recipeIngredients: [...this.state.recipeIngredients, this.state.recipeIngredientsText],
    }, ()=>{
      console.log(this.state.recipeIngredients);
    })
  }
  handleAddInstructions = () => {
    if(!this.state.recipeInstructionsText) {
      return;
    }
    this.setState({
      recipeInstructions: [...this.state.recipeInstructions, this.state.recipeInstructionsText],
    })
  }
  renderArray = (current) => {
    return <FlatList
      data={current}
      renderItem={({ item }) => (
        <Text style={styles.touchText}>{item}</Text>
      )}
      keyExtractor={(item, index) => index+'a'}
    />
  }
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={64} extraScrollHeight={64}>
        <Mutation mutation={CREATE_RECIPE}>
        {(createRecipe, {data, loading, error}) => (
          <React.Fragment>
          <Card>
            <TextInput
              label='Recipe Name'
              value={this.state.recipeTitle}
              onChangeText={text => this.setState({recipeTitle: text})}
            />
            <TextInput
              label='Description'
              value={this.state.recipeDescription}
              onChangeText={text => this.setState({recipeDescription: text})}
            />
            </Card>
            <Divider/>
            <Card>
            <TextInput
              label='Ingredients'
              placeholder="e.g water"
              value={this.state.recipeIngredientsText}
              onChangeText={text => this.setState({recipeIngredientsText: text})}
            />
            <TouchableOpacity style={styles.plusbutton}
            onPress={this.handleAddIngredients}>
              <Text style={styles.touchText}>+add</Text>
            </TouchableOpacity>
            </Card>
            <Card>
              <Text style={styles.simpleText}>Ingredients:</Text>
              {this.renderArray(this.state.recipeIngredients)}
            </Card>
            <Divider/>
            <Card>
            <TextInput
              label='Instructions'
              placeholder="(seperate by comma and space)"
              value={this.state.recipeInstructionsText}
              onChangeText={text => this.setState({recipeInstructionsText: text})}
            />
            <TouchableOpacity style={styles.plusbutton}
            onPress={this.handleAddInstructions}>
              <Text style={styles.touchText}>+ add</Text>
            </TouchableOpacity>
            </Card>
            <Card>
              <Text style={styles.simpleText}>Instructions: </Text>
              {this.renderArray(this.state.recipeInstructions)}
            </Card>
            <Divider />
            <Card>
            {this.isvisible() && 
              (<Button
                raised
                style={styles.addButton}
                onPress={() => {
                  createRecipe({
                    variables: {
                      title: this.state.recipeTitle,
                      description: this.state.recipeDescription,
                      ingredients: this.state.recipeIngredients,
                      instructions: this.state.recipeInstructions
                    }
                  });
                  this.handleAdd();
                  this.props.navigation.goBack();
                }}
              >
                Add this recipe
              </Button>
              )
            }
            </Card>
            </React.Fragment>
        )}
        </Mutation>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  plusbutton: {
    alignSelf: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  items: {
    marginLeft: 10,
    fontSize: 20,
  },
  simpleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  touchText: {
    fontSize: 20,
    color: 'green',
  },
  addButton: {
    backgroundColor: 'orange',
    alignSelf: 'center',
  },
});
