import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Answer from './answer';

export default class Question extends React.Component {

  constructor() {
    super();
    this.state = {
      questionJson: [],
      questionNumber: 0
    }
  }

  componentDidMount () {
    fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium')
    .then( response => response.json() )
    .then ( responseJson => this.setState( {questionJson: responseJson["results"]} ) )
    .catch ( error => console.log(error) ) 
  } 
    
  render () {
    if (this.state.questionJson.length > 0) {
      let currentQuestion = this.state.questionJson[this.state.questionNumber];
      let selection = currentQuestion["incorrect_answers"].concat(currentQuestion["correct_answer"]);
      return (
        <View style={styles.container}>
          <Text>{currentQuestion["question"]}</Text>
          {selection.map( val => <Answer select={val} /> )}
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});