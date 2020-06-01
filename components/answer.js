import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export default function Answer (props) {

    return (
        <TouchableOpacity onPress={() => props.answerPress(props.select)} style={styles.answerBtn}>
            <View>
                <Text>{props.select}</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    answerBtn: {
        width: '80%',
        paddingVertical: 20,
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    }
})


// export default class Answer extends React.Component {

//     constructor(props) {
//         super(props);
//         this.answerPress = this.answerPress.bind(this);
//       }

//     answerPress (arg) {
//         console.log('pressed ' + arg)
//     }

//     render () {
//         return (
//             <TouchableOpacity onPress={ () => this.answerPress(this.props.select) }>
//                 <View>
//                     <Text>{this.props.select}</Text>
//                 </View>
//             </TouchableOpacity>
//         )
//     }

// }