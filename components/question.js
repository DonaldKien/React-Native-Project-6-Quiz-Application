import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

    // https://opentdb.com/api.php?amount=10&category=17&difficulty=medium
  return (
    <View style={styles.container}>
      <Text>Question</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});