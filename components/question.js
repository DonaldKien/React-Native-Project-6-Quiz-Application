import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Answer from './answer';
import AsyncStorage from '@react-native-community/async-storage';

export default class Question extends React.Component {

  	constructor() {
    	super();
    	this.state = {
    		questionJson: [],
    		questionNumber: 0,
			score: 0,
			win: false,
			highscore: 0
		};
		this.answerPress = this.answerPress.bind(this)
  	}

  	componentDidMount () {
    	fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium')
   		.then( response => response.json() )
    	.then ( responseJson => this.setState( {questionJson: responseJson["results"]} ) )
		.catch ( error => console.log(error) );
		this.showHighscore()
  	} 
	
	async showHighscore () {
		try {
			const value = await AsyncStorage.getItem('storage_highscore')
			if(value !== null) { this.setState({ highscore: parseInt(value) })
			}
		} catch(e) { /*error reading value*/ }
	}

  	async answerPress (answerArg) {

    	if (answerArg == this.state.questionJson[this.state.questionNumber].correct_answer) {
			this.setState({score: this.state.score + 1});
		}

		if (this.state.questionNumber == 9){

			try {
				const value = await AsyncStorage.getItem('storage_highscore')
				if(value !== null) {
				// when there is a highscore, 2nd game
					if (parseInt(value) < this.state.score) {
						// parseInt(value): to convert string into number
						// when current highscore is more than previous highscore, save as highscore
						try { await AsyncStorage.setItem('storage_highscore', this.state.score.toString()) } 
						catch (e) { /* saving error*/ }
						this.setState({ win: true }) //When when current highscore is more than previous highscore
					}
				}
				else {
					// When no highscore, save as new highscore: begining of game
					try { await AsyncStorage.setItem('storage_highscore', this.state.score.toString()) } 
					catch (e) { /* saving error*/ }
				}
			} 
			catch(e) { /*error reading value*/ }
		}

		this.setState({
			questionNumber: this.state.questionNumber + 1
		})

	}
	  
	shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
	
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
	
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
		
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

  	render () {
		
		if (this.state.questionJson.length) {
			if (this.state.questionNumber < 10) {
				let currentQuestion = this.state.questionJson[this.state.questionNumber];
				let selection = this.shuffle(currentQuestion["incorrect_answers"].concat(currentQuestion["correct_answer"]));
				return (
					<View style={{flex:1, backgroundColor:'#87f7ff'}}>
						<View style={styles.container}>
							<View style={styles.question}>
								<Text style={styles.questionText}>{currentQuestion["question"]}</Text>
							</View>
							{selection.map( val => <Answer select={val} answerPress={this.answerPress}/> )}
						</View>
						<View style={{flexDirection:"row", justifyContent: 'space-between'}}>
							<Text>Answer: {currentQuestion["correct_answer"]}</Text>
							<Text>Current score: {this.state.score}</Text>
							<Text>High Score: {this.state.highscore}</Text>
						</View>
					</View>
				)
			}
			else {
				return (
					<View style={styles.end}>
						<Text>End of Question</Text>
						<Text>Your score: {this.state.score}</Text>
						<Text>{this.state.win ? <Text>New High Score!!</Text> : null }</Text>
					</View>
				)
			}
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
		backgroundColor: '#87f7ff',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	question: {
		marginVertical: 30,
		marginHorizontal: 20,
		justifyContent: 'center'  
	},
	questionText: {
		fontSize: 20
	},
  	end: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
  	}
});
