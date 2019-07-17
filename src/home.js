var map;
var geocoder;
var directionsDisplay;
var directionsService;
var gMarkers = [];
var dirDisplayList = [];

function initMap() {
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
}

/*
 *
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

  marker.setMap(map);
}

function removeMarkers() {
  for (let i = 0; i < gMarkers.length - 1; i++) {
    gMarkers[i].setMap(null);
  }
}

function drawPath() { //current issue with this is nitpicking; it resets the route instead of
  //setting a new one so the route color is slightly more transparent
  directionsDisplay.setMap(map);
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
