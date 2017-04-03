import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';


class ClosestStop extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View style={[styles.closestStop, this.props.style || {}]}>
        <Image source={require('../img/pin.png')} style={styles.pin} />
        <View style={styles.labelContainer}>
          <Text style={styles.stopNumber}>{this.props.stopId}</Text>
          <Text style={styles.stopName}>{this.props.stopName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closestStop: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 40,
    paddingRight: 40
  },
  pin: {
    width: 90,
    height: 164
  },
  labelContainer: {
    marginLeft: 15,
    paddingTop: 10,
    justifyContent: 'flex-start'
  },
  stopNumber: {
    fontFamily: 'Fira Code',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFCD00'
  },
  stopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFCD00'
  }
});

module.exports = ClosestStop;
