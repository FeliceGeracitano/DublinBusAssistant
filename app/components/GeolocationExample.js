import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import R from 'ramda'
import MessageComposer from '../services/messageComposer'

class Geolocation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position: 'unknown'
    };
  }

  consoleJson() {
    return fetch('https://data.dublinked.ie/cgi-bin/rtpi/busstopinformation?operator=bac&format=json')
      .then((response) => response.json())
      .then((responseJson) => {

        let res = '';
        const resMap = new Map();

        // build map
        responseJson.results.forEach(el => resMap.set(`${el.latitude}${el.longitude}`, el));
        console.log(`map.size`, resMap.size);

        responseJson.results.forEach(el => {
          res += `${el.latitude}, ${el.longitude}\n`
        });
        console.log(res);
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  componentDidMount() {
    this.consoleJson();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      console.log('position', this.state);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.position}
        </Text>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

module.exports = Geolocation;
