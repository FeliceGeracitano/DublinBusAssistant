'use strict';

import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

exports.framework = 'React';
exports.title = '<StatusBar>';
exports.description = 'Component for controlling the status bar';


const barStyles = [
  'default',
  'light-content',
];


function getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

class StatusBarStyleExample extends React.Component {
  _barStyleIndex = 0;

  _onChangeBarStyle = () => {
    this._barStyleIndex++;
    this.setState({barStyle: getValue(barStyles, this._barStyleIndex)});
  };

  _onChangeAnimated = () => {
    this.setState({animated: !this.state.animated});
  };

  state = {
    animated: true,
    barStyle: getValue(barStyles, this._barStyleIndex),
  };

  render() {
    return (
      <View>
        <StatusBar
          animated={this.state.animated}
          barStyle={this.state.barStyle}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeBarStyle}>
          <View style={styles.button}>
            <Text>style: '{getValue(barStyles, this._barStyleIndex)}'</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeAnimated}>
          <View style={styles.button}>
            <Text>animated: {this.state.animated ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  }
});

module.exports = StatusBarStyleExample;