import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './app/components/App'

// ios specific
import Tts from 'react-native-tts'
Tts.setDefaultRate(0.5)

export default class DublinBusAssistant extends Component {
  render () {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('DublinBusAssistant', () => DublinBusAssistant)
