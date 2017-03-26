import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View} from 'react-native';
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'


export default class DublinBusAssistant extends Component {
  render() {
    return (
      <ViewContainer>
        <StatusBarBackground style={styles.statusBar} />
        <View style={styles.box}>
          <Text style={styles.text}>{`hello inside view Container`}</Text>
        </View>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'yellow'
  },
  box: {
    flex: 1,
    backgroundColor: 'powderblue',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    backgroundColor: 'coral',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('DublinBusAssistant', () => DublinBusAssistant);
