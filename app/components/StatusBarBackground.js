import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

class StatusBarBackground extends Component {
  render () {
    return (
      <View style={[styles.statusBarBackground, this.props.style || {}]} />
    )
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: '#FFFFFF',
    height: 20
  }
})

module.exports = StatusBarBackground
