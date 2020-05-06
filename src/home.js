/* global google */

let map
let geocoder
let directionsDisplay
let directionsService
// eslint-disable-next-line no-unused-vars
let autocompleteOrigin
let autocompleteDest
let originVal
let destVal

/*
 * Fills origin input box with address from geolocation, if user allows it and it works,
 * makes use of reversing geocoding to get text address from lat, lng coords.
 */
function fillOriginInput(lat, lng) {
  const latlng = {
    lat,
    lng,
  }
  // reverse geocode
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        document.getElementById('origin').value = results[0].formatted_address
      } else {
        // eslint-disable-next-line no-alert
        alert('No results found')
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Sorry, there has been an error.')
      // eslint-disable-next-line no-console
      console.log(`Geocoder failed due to: ${status}`)
    }
  })
}

/*
 * Draws users route from origin to destination on map. Only called upon firing up place_changed
 * event listener from gMaps api, or onchange event listener if autocomplete is now used by user.
 */
function drawPath() {
  // for geocoding here, possible idea is to first try it without geocoding and then
  // if it errors once, geocode, if it errors a second time throw an error
  originVal = document.getElementById('origin').value
  destVal = document.getElementById('destination').value
  const request = {
    origin: originVal,
    destination: destVal,
    travelMode: 'DRIVING',
  }
  directionsService.route(request, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response)
    }
    // } else if (status == 'NOT_FOUND' || status == 'ZERO_RESULTS') {
    //   alert('Please enter a valid address and try again.')
    // } else {
    //   alert('Something went wrong, please try again later.')
    // } // need to figure out better handling of this methinks
  })
}

/*
 * Callback function from DistanceMatrixService which then calculates total cost and builds
 * response div.
 */
function computeCost(response, status) {
  if (status === 'OK') {
    // eslint-disable-next-line no-unused-vars
    const origins = response.originAddresses
    // eslint-disable-next-line no-unused-vars
    const destinations = response.destinationAddresses
    const results = response.rows[0].elements
    const element = results[0]
    let distanceText = element.distance.text
    distanceText = distanceText.replace(/,/g, '')
    const distance = parseInt(distanceText.split(' ')[0], 10)
    const duration = element.duration.text
    const mpg = parseInt(document.getElementById('mpg').value, 10)
    if (mpg <= 0) {
      // eslint-disable-next-line no-alert
      alert('Please enter a valid MPG.')
      return
    }
    const galPrice = parseInt(document.getElementById('gallon-cost').value, 10)
    if (galPrice <= 0) {
      // eslint-disable-next-line no-alert
      alert('Please enter a valid gas price.')
      return
    }
    let totalCost = (distance / mpg) * galPrice
    if (totalCost < 1) {
      totalCost = 1
    } else {
      totalCost = totalCost.toFixed(0)
    }

    // response div creation
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    const msg = `Your trip will use approximately $${totalCost
    } worth of gas and should take about ${duration}.`
    try {
      const previousResult = document.getElementById('result')
      previousResult.parentNode.removeChild(previousResult)
    } catch (err) {
      // do nothing since child isn't there
    }
    div.className = 'alert alert-success'
    div.id = 'result'
    div.style.width = '70%'
    div.style.margin = 'auto'
    div.style.marginTop = '13px'
    h4.textContent = msg
    document.getElementById('compute-div').appendChild(div)
    document.getElementById('result').appendChild(h4)
  } else {
    // eslint-disable-next-line no-alert
    alert('Sorry there has been an error.')
    // eslint-disable-next-line no-console
    console.log(`error message: ${status}`)
  }
}

/*
 * Gets distance and duration response.
 */
function calcDistance() {
  const service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix({
    origins: [originVal],
    destinations: [destVal],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false,
  }, computeCost)
}

/*
 * Initializes map and API elements. Map is centered on US with a country wide zoom level.
 */

// eslint-disable-next-line
function initMap(listener) {
  let initLat
  let initLong
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.956813,
      lng: -102.011721,
    },
    zoom: 3,
  })
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      initLat = position.coords.latitude
      initLong = position.coords.longitude
      fillOriginInput(initLat, initLong)
      map.setCenter({
        lat: initLat,
        lng: initLong,
      })
      map.setZoom(8)
    })
  }
  geocoder = new google.maps.Geocoder()
  directionsDisplay = new google.maps.DirectionsRenderer()
  directionsService = new google.maps.DirectionsService()
  directionsDisplay.setMap(map)
  autocompleteOrigin = new google.maps.places.Autocomplete(document.getElementById('origin'))
  autocompleteDest = new google.maps.places.Autocomplete(document.getElementById('destination'))
  google.maps.event.addListener(autocompleteDest, 'place_changed', drawPath)
  document.getElementById('destination').addEventListener('change', drawPath) // in case autocomplete is not used
  document.getElementById('compute-btn').addEventListener('click', calcDistance)
}
