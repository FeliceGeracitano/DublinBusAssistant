import R from 'ramda'
import { PermissionsAndroid, Platform, UIManager } from 'react-native'

const isAndroid = Platform.OS === 'android'

const PlatformHelper = {
  init: () => {
    if (isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  },
  requestLocationPermission: () => {
    if (!isAndroid) {
      return Promise.resolve('OK')
    }

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access Location Permission',
        message: 'Dublin Bus Assistant needs access to your Location.'
      }
    )
      .then(data => Promise.resolve('OK'))
      .catch(err => Promise.reject('ERROR'))
  }
}

module.exports = PlatformHelper
