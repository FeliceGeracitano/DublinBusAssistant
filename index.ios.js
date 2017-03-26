import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, MapView} from 'react-native'
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'
import Tts from 'react-native-tts';
import R from 'ramda'
import Geolocation from './app/components/GeolocationExample'
import LocationService from './app/services/locationService'

// Voice Settings
Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact')
Tts.setDefaultRate(0.55, true)


export default class DublinBusAssistant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: ''
    };
    this.greeting();
    this.getCurrentLocation();
    LocationService.populateStops().then(() => console.log(LocationService.stops));
  }

  greeting() {
    Tts.speak('Welcome Back');
  }

  getCurrentLocation() {
    LocationService.getCurrentLocation().then(location => this.setState({location}))
  }

  updateState(value) {
    this.setState({text: value})
    Tts.speak(`Option ${value}`)
  }

  render() {
    return (
      <ViewContainer>
        <StatusBarBackground style={styles.statusBar} />
        <View>
          <Button onPress={() => this.updateState('A')} title='A'/>
          <Button onPress={() => this.updateState('B')} title='B'/>
        </View>
        <Text>{this.state.location}</Text>
        <MapView
          style={{height: 200, margin: 40}}
          showsUserLocation={true}
          followUserLocation={true} />
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
