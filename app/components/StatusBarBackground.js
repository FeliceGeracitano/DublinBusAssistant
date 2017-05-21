import React, { Component } from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import CONSTANTS from '../data/constants'

class StatusBarBackground extends Component {
  render() {
    const isIOS = Platform.OS !== 'android'
    return (
      <View>
        <StatusBar
          backgroundColor={CONSTANTS.yellow}
          barStyle={'dark-content'}
        />
        {isIOS ? <View style={styles.statusBarBackground} /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: CONSTANTS.yellow,
    height: 20
  }
})

module.exports = StatusBarBackground
