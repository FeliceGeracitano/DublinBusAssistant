import React, { Component } from 'react';
import { WebView, StatusBar, AppRegistry, StyleSheet, Text, View, Button, MapView} from 'react-native'
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'
import ClosestStop from './app/components/ClosestStop'
import Tts from 'react-native-tts';
import R from 'ramda'
import Geolocation from './app/components/GeolocationExample'
import LocationService from './app/services/locationService'
import StatusBarStyleExample from './app/components/StatusBarStyleExample'
import Paint from './app/components/SiriWave'
import RNShakeEventIOS from 'react-native-shake-event';
import BusList from './app/components/BusList'

// Voice Settings
Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact')
Tts.setDefaultRate(0.40, true)

var BGWASH = 'rgba(255,255,255,0.8)';

export default class DublinBusAssistant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationIsLoading: false,
      location: '',
      closestStop: {}
    };
    this.getClosestStop();
  }

  greeting() {
    Tts.speak('Welcome Back');
  }

  getClosestStop () {
    if (this.state.locationIsLoading)
      return;
    this.setState({locationIsLoading: true});

    Tts.speak('Loading location...');

    LocationService.getClosestStop()
      .then(({ stop }) => {
        this.setState({closestStop: stop});
        Tts.speak(`Then nearest bus stop is: ${stop.fullname},
        ${stop.stopid.split('').join(' ')}`)
        this.getUpcomingBusses(stop.stopid);
      })
      .catch(err => { })
      .finally(() => this.setState({locationIsLoading: false}));
  }

  getUpcomingBusses() {
    LocationService.getUpcomingBusses()
  }

  updateState(value) {
    this;
    debugger;
    this.setState({text: value})
    Tts.speak(`Option ${value}`)
  }


  render() {
    return (
      <ViewContainer style={styles.viewContainer}>
        <StatusBar barStyle={'dark-content'} />
        <StatusBarBackground style={styles.statusBar} />
        <ClosestStop
          stopId={this.state.closestStop.displaystopid}
          stopName={this.state.closestStop.fullname}
          style={styles.ClosestStop}/>
        <BusList/>

        <View>
          <Button onPress={() => this.updateState('A')} title='A'/>
        </View>
        <View style={{backgroundColor: 'black', flex: 1}}>          
          <WebView
            style={styles.WebView}
            source={{html: Paint}}
            scrollEnabled={false}
            scalesPageToFit={true}
          />
        </View>
      </ViewContainer>
    );
  }


  componentWillMount() {
    RNShakeEventIOS.addEventListener('shake', () => {      
      this.getClosestStop();
    });
  }
 
  componentWillUnmount() {
    RNShakeEventIOS.removeEventListener('shake');
  }

}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#FFCD00'
  },
  ClosestStop: {
    backgroundColor: 'black',
    height: 200
  },
  WebView: {
    backgroundColor: 'black',
    height: 200
  },
  viewContainer: {
    backgroundColor: 'black'
  },
  text: {
    fontSize: 20,
    backgroundColor: 'coral',
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('DublinBusAssistant', () => DublinBusAssistant);
