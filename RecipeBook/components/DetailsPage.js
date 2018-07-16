import React, { Component } from 'react';
import {
  TouchableOpacity,
  CheckBox,
  View,
  StyleSheet,
  TextInput,
  Picker,
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

export default class DetailsPage extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam("item").title,
    }
  }
  renderArray = (arr) => {
    return arr.map((item, index) => {
      let comma = ',';
      if(index === arr.length-1) {
        comma = '.';
      }
      return <Text key={item.id} style={styles.items}>{item}{comma}</Text>
    })
  }
  renderRecipe = () => {
    const recipe = this.props.navigation.getParam("item");
    return ( 
    <React.Fragment>
      <Card>
        <CardContent style={styles.info}>
          <Text style={styles.simpleText}>Description:</Text>
          <Text style={styles.items}>{recipe.description}</Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent style={styles.info}>
          <Text style={styles.simpleText}>Ingredients:</Text>
          {this.renderArray(recipe.ingredients)}
        </CardContent>
      </Card>
      <Card>
        <CardContent style={styles.info}>
          <Text style={styles.simpleText}>Insctructions:</Text>
          {this.renderArray(recipe.instructions)}
        </CardContent>
      </Card>
    </React.Fragment>
    )
  }
  render() {
    return (
      <View>
        {this.renderRecipe()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    marginTop: 20,
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
  }
});
