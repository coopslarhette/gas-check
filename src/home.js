let map
let geocoder
let directionsDisplay
let directionsService
let autocompleteOrigin
let autocompleteDest
let originVal
let destVal

/*
 * Initializes map and API elements. Map is centered on US with a country wide zoom level.
 */
function initMap(listener) {
  let initLat
  let initLong
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.956813,
      lng: -102.011721
    },
    zoom: 3
  })
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      initLat = position.coords.latitude
      initLong = position.coords.longitude
      fillOriginInput(initLat, initLong)
      map.setCenter({
        lat: initLat,
        lng: initLong
      })
      map.setZoom(8)
    })
  }
  geocoder = new google.maps.Geocoder()
  directionsDisplay = new google.maps.DirectionsRenderer
  directionsService = new google.maps.DirectionsService
  directionsDisplay.setMap(map)
  autocompleteOrigin = new google.maps.places.Autocomplete(document.getElementById(
    'origin'))
  autocompleteDest = new google.maps.places.Autocomplete(document.getElementById(
    'destination'))
  google.maps.event.addListener(autocompleteDest, 'place_changed', drawPath)
  document.getElementById('destination').addEventListener('change', drawPath) // // in case autocomplete is not used
  document.getElementById('compute-btn').addEventListener('click', calcDistance)
}

/*
 * Fills origin input box with address from geolocation, if user allows it and it works,
 * makes use of reversing geocoding to get text address from lat, lng coords.
 */
function fillOriginInput(lat, lng) {
  let latlng = {
    lat: lat,
    lng: lng
  }
  //reverse geocode
  geocoder.geocode({
    'location': latlng
  }, function (results, status) {
    if (status === 'OK') {
      if (results[0]) {
        document.getElementById('origin').value = results[0].formatted_address
      } else {
        alert('No results found')
      }
    } else {
      window.alert('Geocoder failed due to: ' + status)
    }
  })
}

/*
 * Draws users route from origin to destination on map. Only called upon firing up place_changed
 * event listener from gMaps api, or onchange event listener if autocomplete is now used by user.
 */
function drawPath() {
  //for geocoding here, possible idea is to first try it without geocoding and then
  //if it errors once, geocode, if it errors a second time throw an error
  originVal = document.getElementById('origin').value
  destVal = document.getElementById('destination').value
  let request = {
    origin: originVal,
    destination: destVal,
    travelMode: 'DRIVING'
  }
  directionsService.route(request, function (response, status) {
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
 * Sets up and calls DistanceMatrixService to get distance and duration for response
 * to user. Callback function is computeCost().
 */
function calcDistance() {
  let service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix({
    origins: [originVal],
    destinations: [destVal],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, computeCost)
}

/*
 * Callback function from DistanceMatrixService which then calculates total cost and builds
 * response div.
 */
function computeCost(response, status) {
  if (status === 'OK') {
    //calculation; TODO: model gas usage more accurately
    let origins = response.originAddresses
    let destinations = response.destinationAddresses
    let results = response.rows[0].elements
    let element = results[0]
    let distanceText = element.distance.text
    distanceText = distanceText.replace(/,/g, '')
    let distance = parseInt(distanceText.split(' ')[0])
    let duration = element.duration.text
    let mpg = parseInt(document.getElementById('mpg').value)
    if (mpg <= 0) {
      alert('Please enter a valid MPG.')
      return
    }
    let galPrice = parseInt(document.getElementById('gallon-cost').value)
    if (galPrice <= 0) {
      alert('Please enter a valid gas price.')
      return
    }
    let totalCost = distance / mpg * galPrice
    if (totalCost < 1) {
      totalCost = 1
    } else {
      totalCost = totalCost.toFixed(0)
    }

    //response div creation
    let div = document.createElement('div')
    let h4 = document.createElement('h4')
    let msg = 'Your trip will use approximately $' + totalCost +
      ' worth of gas and should take about ' + duration + '.'
    try {
      let previousResult = document.getElementById('result')
      previousResult.parentNode.removeChild(previousResult)
    } catch (err) {
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
    alert('error message: ' + status)
  }
}
