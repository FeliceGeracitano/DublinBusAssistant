import React, { Component } from 'react'
import { WebView, StyleSheet, View, LayoutAnimation } from 'react-native'
import ViewContainer from './ViewContainer'
import StatusBarBackground from './StatusBarBackground'
import ClosestStop from './ClosestStop'
import LocationService from '../services/locationService'
import Paint from './SiriWave'
import Loading from './loading'
import BusList from './BusList'
import Tts from 'react-native-tts'
import RNShakeEvent from 'react-native-shake-event'
import MessageComposer from '../services/messageComposer'
import PlatformHelper from '../services/platformHelper'

PlatformHelper.init()

const ttsListener = ({ webview }, message) =>
  webview && webview.postMessage(message)
const setTTS = app => {
  Tts.addEventListener('tts-start', () => ttsListener(app, 'start'))
  Tts.addEventListener('tts-finish', () => ttsListener(app, 'stop'))
  Tts.addEventListener('tts-cancel', () => ttsListener(app, 'stop'))
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.webview = null
    this.state = {
      locationIsLoading: false,
      showLoader: true,
      location: '',
      closestStop: {}
    }
  }

  componentDidMount() {
    PlatformHelper.requestLocationPermission()
      .then(data => {
        setTTS(this)
        this.getClosestStop()
        RNShakeEvent.addEventListener('shake', () => {
          this.getClosestStop()
        })
      })
      .catch(() => {
        Tts.speak(
          'Sorry, You need to allow DublinBus Assistant to access to the your location.'
        )
      })
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  getClosestStop() {
    if (this.state.locationIsLoading) {
      return
    }
    this.setState({
      locationIsLoading: true,
      showLoader: true
    })

    Tts.stop()
    Tts.speak('Loading...')

    LocationService.getClosestStop()
      .then(({ stop }) => {
        this.setState({ closestStop: stop })
        Tts.speak(
          `Bus stop ${stop.fullname} ${stop.stopid.split('').join(' ')}`
        )
        this.getUpcomingBusses(stop.stopid)
      })
      .catch(() => {
        Tts.speak(`Error loading location. Refresh please.`)
      })
      .finally(() =>
        this.setState({
          locationIsLoading: false,
          showLoader: false
        })
      )
  }

  getUpcomingBusses(stopid) {
    LocationService.getUpcomingBusses(stopid).then(buses => {
      buses.forEach(bus => {
        bus.duetime = MessageComposer.duetime(bus.duetime)
        // FIX for adriod TTS capital words spelling
        bus.destination = MessageComposer.destination(bus.destination)
        Tts.speak(`Route ${bus.route}, to ${bus.destination}, ${bus.duetime}.`)
      })
      this.setState({ buses })
    })
  }

  determinateContent(showLoader) {
    return showLoader
      ? <WebView source={{ html: Loading }} scrollEnabled={false} />
      : <View style={styles.flexContainer}>
          <ClosestStop
            stopId={this.state.closestStop.displaystopid}
            stopName={this.state.closestStop.fullname}
            style={styles.ClosestStop}
          />
          <BusList buses={this.state.buses} />
          <View style={styles.webViewWrapper}>
            <WebView
              ref={webview => {
                this.webview = webview
              }}
              style={styles.WebView}
              source={{ html: Paint }}
              scrollEnabled={false}
              scalesPageToFit
            />
          </View>
        </View>
  }

  // TODO: fix status bar in IOS (create Status Bar Custom Component)
  render() {
    let content = this.determinateContent(this.state.showLoader)
    return (
      <ViewContainer style={styles.flexContainer}>
        <StatusBarBackground />
        {content}
      </ViewContainer>
    )
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake')
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
  webViewWrapper: {
    backgroundColor: 'black',
    height: 100
  },
  text: {
    fontSize: 20,
    backgroundColor: 'coral',
    textAlign: 'center'
  },
  flexContainer: {
    backgroundColor: 'black',
    flex: 1
  }
})

module.exports = App
