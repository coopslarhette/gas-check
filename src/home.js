var map;
var geocoder;
var gMarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.956813,
      lng: -102.011721
    },
    zoom: 3
  });
  geocoder = new google.maps.Geocoder();
}

function drawMarker() {
  var origin = document.getElementById('origin').value;
  let originLatLng = geocode(origin);
  var marker = new google.maps.Marker({
    map: map,
    position: originLatLng,
  });
  map.setCenter(originLatLng);
  map.setZoom(16);
  gMarkers.push(marker);
  marker.setMap(map);
}

/*
 * Geocodes address and then returns a LatLng object. Used for markers and direction service.
 */
function geocode(address) {
  let originAddress = address;
  geocoder.geocode({
      'address': originAddress
    },
    function(results, status) {
      if (status == 'OK') {
        alert("geocode");
        return results[0].geometry.location;
      } else {
        alert("geocode not working: " + status);
        return null;
      }
    });
}

function drawPath() {
  for (let i = 0; i < gMarkers.length - 1; i++) {
    gMarkers[i].setMap(null);
  }
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var start = document.getElementById('origin').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
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
    let origins = response.originAddresses;
    let destinations = response.destinationAddresses;
    let results = response.rows[0].elements;
    let element = results[0];
    let distance = parseInt(element.distance.text);
    let duration = element.duration.text;
    let mpg = parseInt(document.getElementById('mpg').value);
    let galCost = parseInt(document.getElementById('gallon-cost').value);
    let totalCost = distance / mpg * galCost;
    if (totalCost < 1) {
      totalCost = 1;
    } else {
      totalCost = totalCost.toFixed(0);
    }
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
    div.style.marginTop = "13px";
    div.style.border = "1px solid black";
    h4.textContent = msg;
    document.getElementById('compute').appendChild(div);
    document.getElementById('result').appendChild(h4);

    document.getElementById("compute").appendChild(div);
  } else {
    alert("error message: " + status);
  }
}
