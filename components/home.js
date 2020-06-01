import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends React.Component {

  	constructor(){
		super();
		this.gameStart = this.gameStart.bind(this)
  	}
  
	resetData = async () => {
		try {
			await AsyncStorage.setItem('storage_highscore', '0')
		} catch (e) {
			// saving error
		}
		this.props.navigation.push("question")
	}
	
	gameStart = () => {
		this.props.navigation.push("question")
	}
  
  	render () {
		return (
		
			<View style={styles.container}>
				<TouchableOpacity onPress={this.resetData} style={styles.newGame}>
					<Text style={styles.textStyle}>New Game</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.gameStart} style={styles.startBtn}> 
					<View>
					<Text style={styles.textStyle}>Start Game!</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
  	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	newGame: {
		width: '80%',
		paddingVertical: 20,
		backgroundColor: '#a86b00',
		alignItems: 'center',
		marginBottom: 30
	},
	startBtn: {
		width: '80%',
		paddingVertical: 20,
		backgroundColor: 'indigo',
		alignItems: 'center',
		marginBottom: 30
	},
	textStyle: {
		color:'white'
	}
});