import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { weatherOptions } from './weatherOptions';
class Weather extends Component{
  render(){
    const PROPS = this.props;
    return (
      <LinearGradient style={styles.container} 
          colors={weatherOptions[PROPS.condition].backgroundColor}>
          <StatusBar barStyle="light-content"/>
          <View style={styles.IconContainer}>
            <MaterialCommunityIcons 
              size={96} 
              name={weatherOptions[PROPS.condition].iconName} color="white"
            />
            <Text style={styles.temp}>{PROPS.temp}°</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.city]}>{PROPS.name}</Text>
            <Text style={[styles.text, styles.title]}>
              <Text>{weatherOptions[PROPS.condition].kr}</Text>
              <Text style={{fontSize:22}}>  {PROPS.condition}</Text>
            </Text>
            <Text style={[styles.text, styles.subtitle]}>{weatherOptions[PROPS.condition].subTitle}</Text>
          </View>
      </LinearGradient>
    )
  }
}

Weather.PropTypes = {
  temp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  condition: PropTypes.oneOf([
    'Thunderstorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Atmosphere',
    'Clear',
    'Clouds',
    'Haze',
    'Mist',
    'Smoke',
    'Haze',
    'Dust',
    'Fog',
    'Sand',
    'Dust',
    'Ash',
    'Squall',
    'Tornado'
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: '15%',
    // backgroundColor: 'blue',
    width: '100%'
  },
  text: {
    color: 'white',
  },
  city: {
    fontSize: 22,
  },
  title: {
    fontSize: 32
  },
  subtitle: {
    fontSize: 16
  },
  temp: {
    fontSize: 42,
    paddingLeft: 10,
    color: 'white',
  },
});

export default Weather;