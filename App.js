import React, { Component } from 'react';
import { StyleSheet, Platform, Alert, View, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import axios from 'axios';

import Weather from './src/weather/Weather';
import Loading from './src/loading/Loading';

const API_KEY = 'fff0f782a2acfcbcc54004060dc5bcb1';
// api.openweathermap.org/data/2.5/weather?lat=37.5520514&lon=126.9885617&appid=fff0f782a2acfcbcc54004060dc5bcb1
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this._getWeather(37.5520514, 126.9885617)
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('거절하셨네요', '슬퍼요.');
    }
    try {
      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      this._getWeather(latitude, longitude)
    } catch (err) {
      Alert.alert('위치를 찾을 수 없어요.', '이상하다?');
    }
  };
  _getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
        name
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp: temp,
      name
    });
  };
  render() {
    const { isLoading, condition, temp, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        { 
          isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} name={name}/>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
// {
//   "coords": Object {
//     "accuracy": 1603,
//     "altitude": 0,
//     "heading": 0,
//     "latitude": 37.5520514,
//     "longitude": 126.9885617,
//     "speed": 0,
//   },
//   "mocked": false,
//   "timestamp": 1583911895466,
// }
