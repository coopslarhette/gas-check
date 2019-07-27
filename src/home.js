var map;
var geocoder;
var directionsDisplay;
var directionsService;
var gMarkers = [];
var dirDisplayList = [];
var autocompleteOrigin;
var autocompleteDest;

/*
 * Initializes map and API elements. Map is centered on US with a country wide zoom level.
 */
function initMap() {
  var originInput = document.getElementById('origin');
  var destInput = document.getElementById('destination');
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.956813,
      lng: -102.011721
    },
    zoom: 3
  });
  geocoder = new google.maps.Geocoder();
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay.setMap(map);
  autocompleteOrigin = new google.maps.places.Autocomplete(originInput);
  autocompleteDest = new google.maps.places.Autocomplete(destInput);
}

/*
 * Draws markers on map whenever there is a change in the start input box text to let user know
 * that their input is valid.
 */
function drawMarker() {
  let originAddress = document.getElementById('origin').value;
  geocoder.geocode({
      'address': originAddress
    },
    function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        map.setZoom(16);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        gMarkers.push(marker);
      } else {}
    });

  console.log("drawMarker called");
  marker.setMap(map);
}

function removeMarkers() {
  console.log("removeMarker called");
  for (let i = 0; i < gMarkers.length - 1; i++) {
    gMarkers[i].setMap(null);
  }
}

/*
 * Draws users route from origin to destination on map. Changes whenever there is a change in
 * the text in the destination input box (similar to drawMarker).
 *
 * TODO: Current issue with this is nitpicking; it resets the route instead of setting a new one
 * so the route color is slightly more transparent.
 */
function drawPath() { // issue here is all about finding the right event listener
  console.log("drawPath");
  let start = document.getElementById('origin').value;
  let end = document.getElementById('destination').value;
  console.log('d: ' + end + 'o: ' + start);
  let request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      //removes the final marker so no overlap with route marker
      // gMarkers[gMarkers.length - 1].setMap(null);
      directionsDisplay.setDirections(response);
    } else {
      console.log(status);
    }
  });
}

function computeCost() {
  let origin = document.getElementById('origin').value;
  let destination = document.getElementById('destination').value;
  let service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix({
    origins: [origin],
    destinations: [destination],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false,
  }, callback);
}

function callback(response, status) {
  if (status == 'OK') {
    //calculation; TODO: model gas usage more accurately
    let origins = response.originAddresses;
    let destinations = response.destinationAddresses;
    let results = response.rows[0].elements;
    let element = results[0];
    let distance = parseInt(element.distance.text);
    let duration = element.duration.text; //time
    let mpg = parseInt(document.getElementById('mpg').value);
    let galCost = parseInt(document.getElementById('gallon-cost').value);
    let totalCost = distance / mpg * galCost;
    if (totalCost < 1) {
      totalCost = 1;
    } else {
      totalCost = totalCost.toFixed(0);
    }

    //response div creation
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let msg = "Your trip will use approximately $" + totalCost +
      " worth of gas.";
    try {
      let previousResult = document.getElementById('result');
      previousResult.parentNode.removeChild(previousResult);
    } catch (err) {}
    div.className = "alert alert-success";
    div.id = "result";
    div.style.width = "70%";
    div.style.margin = "auto";
    div.style.marginTop = "13px";
    h4.textContent = msg;
    document.getElementById('compute').appendChild(div);
    document.getElementById('result').appendChild(h4);
    document.getElementById("compute").appendChild(div);
  } else {
    alert("error message: " + status);
  }
}
