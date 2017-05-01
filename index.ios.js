import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './app/components/App'

// ios specific
import Tts from 'react-native-tts'
Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact')
Tts.setDefaultRate(0.40, true)

export default class DublinBusAssistant extends Component {
  render () {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('DublinBusAssistant', () => DublinBusAssistant)
