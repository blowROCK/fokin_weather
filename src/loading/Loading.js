import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Getting the fucking weather...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingBottom: 50,
    backgroundColor: '#FDF6AA'
  },
  text: {
    textAlign: "right",
    color: '#2c2c2c',
    fontSize: 25
  }
});
