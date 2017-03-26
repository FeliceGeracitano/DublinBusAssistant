import CONSTANTS from '../data/constants'
const LocationService = {
  stops: [],

  // stateFull get Coordinate from the GPS
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      navigator
        .geolocation
        .getCurrentPosition((position) => {
          resolve(JSON.stringify(position));
        }, (error) => reject(JSON.stringify(error)));
    });
  },
  populateStops: () => {
    return new Promise((resolve, reject) => {
      fetch(CONSTANTS.stopsURL)
        .then((response) => response.json())
        .then(({ results }) => {
          LocationService.stops = results;
          resolve(this.stops);
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = LocationService;
