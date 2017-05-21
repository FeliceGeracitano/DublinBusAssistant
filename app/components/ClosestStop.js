import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

class ClosestStop extends Component {
  render() {
    return (
      <View style={[styles.closestStop, this.props.style || {}]}>
        <Image source={require('../img/pin.png')} style={styles.pin} />
        <View style={styles.labelContainer}>
          <Text style={styles.stopNumber}>{this.props.stopId}</Text>
          <Text style={styles.stopName}>{this.props.stopName}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  closestStop: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40
  },
  pin: {
    width: 92,
    height: 166
  },
  labelContainer: {
    paddingLeft: 15,
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
})

module.exports = ClosestStop
