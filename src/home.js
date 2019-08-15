var map;
var geocoder;
var directionsDisplay;
var directionsService;
var autocompleteOrigin;
var autocompleteDest;

/*
 * Initializes map and API elements. Map is centered on US with a country wide zoom level.
 */
function initMap() {
  var originInput = document.getElementById('origin');
  var destInput = document.getElementById('destination');
  map = new google.maps.Map(document.getElementById('map'), {
    center: { //TODO: get user ip and center there
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
  google.maps.event.addListener(autocompleteDest, 'place_changed', function() {
    // var place = autocompleteDest.getPlace();
    drawPath(); //place.place_id
  });
}

// /*
//  * Draws markers on map whenever there is a change in the start input box text to let user know
//  * that their input is valid.
//  */
// function drawMarker() {
//   let originAddress = document.getElementById('origin').value;
//   geocoder.geocode({
//       'address': originAddress
//     },
//     function(results, status) {
//       if (status == 'OK') {
//         map.setCenter(results[0].geometry.location);
//         map.setZoom(16);
//         var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//         });
//         gMarkers.push(marker);
//       } else {}
//     });
//   marker.setMap(map);
// }
//
// function removeMarkers() {
//   console.log("removeMarker called");
//   for (let i = 0; i < gMarkers.length - 1; i++) {
//     gMarkers[i].setMap(null);
//   }
// }

/*
 * Draws users route from origin to destination on map. Only called upon firing up place_changed
 * event listener from gMaps api.
 * TODO: figure out if using paces instead of text is better for origin and destination.
 */
function drawPath() {
  //for geocoding here, idea is to first try it without geocoding and then if it errors once,
  //geocode, if it errors a second time throw an error
  let start = document.getElementById('origin').value;
  let end = document.getElementById('destination').value;
  let request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      return status;
    }
  });
}

function computeCost() {
  var origin = document.getElementById('origin').value;
  var destination = document.getElementById('destination').value;
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
