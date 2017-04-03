import CONSTANTS from '../data/constants'
import R from 'ramda'
import geo from 'geolocator'
const LocationService = {
  stops: [],

  // stateFull get Coordinate from the GPS
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      navigator
        .geolocation
        .getCurrentPosition(
          (position) =>  resolve(JSON.parse(JSON.stringify(position))),
          (error) => reject(JSON.parse(JSON.stringify(error))),
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
    });
  },
  populateStops: () => {
    return new Promise((resolve, reject) => {
      if (!R.isEmpty(LocationService.stops)) {
        resolve(LocationService.stops);
        return;
      }

      fetch(CONSTANTS.stopsURL)
        .then((response) => response.json())
        .then(({ results }) => {
          LocationService.stops = results;
          resolve(results);
        })
        .catch((error) => reject(error));
    });
  },
  getClosestStop: () => {
    const location = LocationService.getCurrentLocation();
    const stops = LocationService.populateStops();
    const matchClosest = ({ coords }, stops) => {
      debugger;
      let closestStop = { distance: Number.MAX_SAFE_INTEGER, stop: {} };
      stops.forEach(stop => {
        const distance = geolocator.calcDistance({
            from: { latitude: coords.latitude, longitude: coords.longitude },
            to: { latitude: stop.latitude, longitude: stop.longitude },
            formula: geolocator.DistanceFormula.HAVERSINE,
            unitSystem: geolocator.UnitSystem.METRIC
        });
        closestStop = closestStop.distance < distance ?
          closestStop :
          { distance, stop };
      });
      return closestStop;
    }

    return Promise.all([location, stops])
      .then(values => Promise.resolve(matchClosest(values[0], values[1])))
      .catch(err => Promise.reject({err}));
  },
  getUpcomingBusses: (id) => {
    return new Promise((resolve, reject) => {
      fetch(`${CONSTANTS.upcomingBuses}${id}`)
        .then((response) => response.json())
        .then(({ results }) => {
          debugger;
          resolve(results);
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = LocationService;
