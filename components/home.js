import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home ({navigation}) {



  return (
    <View style={styles.container}>
      <Text>This is my Home page</Text>
      <TouchableOpacity onPress={ () => {navigation.push("question")} }>
          <View>
            <Text>Start Game!</Text>
          </View>
      </TouchableOpacity>
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