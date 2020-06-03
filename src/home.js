/* global google */

/*
 * Callback function from DistanceMatrixService which then calculates total cost and builds
 * response div.
 */
function computeCostAndBuildResponse(response, status) {
  const result = response.rows[0].elements[0]
  if (result.status === 'OK') {
    const distance = parseInt(result.distance.text.replace(/,/g, '').split(' ')[0], 10)
    const duration = result.duration.text
    const userMPG = parseInt(document.getElementById('mpg').value, 10)
    if (userMPG <= 0) {
      // eslint-disable-next-line no-alert
      alert('Please enter a valid MPG.')
      return
    }
    const gasPrice = parseInt(document.getElementById('gallon-cost').value, 10)
    if (gasPrice <= 0) {
      // eslint-disable-next-line no-alert
      alert('Please enter a valid gas price.')
      return
    }
    let totalCost = (distance / userMPG) * gasPrice
    totalCost = totalCost < 1 ? 1 : totalCost.toFixed(0)

    // response div creation
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    const msg = `Your trip will use approximately $${totalCost} worth of gas and should take about ${duration}.`
    const previousResult = document.getElementById('result')
    if (previousResult) {
      previousResult.parentNode.removeChild(previousResult)
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
    origins: [document.getElementById('origin').value],
    destinations: [document.getElementById('destination').value],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false,
  }, computeCostAndBuildResponse)
}

/*
 * Initializes map and API elements. Map is centered on US with a country wide zoom level. Called
 * by Google Maps API script at bottom of index.html
 */

// eslint-disable-next-line no-unused-vars
function initMap() {
  const directionsDisplay = new google.maps.DirectionsRenderer()
  // need this for autocomplete to work on origin input
  // eslint-disable-next-line no-unused-vars
  const autocompleteOrigin = new google.maps.places.Autocomplete(document.getElementById('origin'))
  const autocompleteDest = new google.maps.places.Autocomplete(document.getElementById('destination'))
  const directionsService = new google.maps.DirectionsService()
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.956813,
      lng: -102.011721,
    },
    zoom: 3,
  })
  directionsDisplay.setMap(map)
  google.maps.event.addListener(autocompleteDest, 'place_changed', () => {
    const request = {
      origin: document.getElementById('origin').value,
      destination: document.getElementById('destination').value,
      travelMode: 'DRIVING',
    }
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response)
      } else {
        // eslint-disable-next-line no-alert
        alert('Sorry, there was an error, please try again.')
      }
    })
  })
  document.getElementById('compute-btn').addEventListener('click', calcDistance)
}
