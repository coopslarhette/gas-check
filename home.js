var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.956813,
      lng: -102.011721
    },
    zoom: 3
  });
}


function computeCost() {
  var origin = document.getElementById('origin').value;
  var destination = document.getElementById('destination').value;
  var service = new google.maps.DistanceMatrixService();
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
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var results = response.rows[0].elements;
    var element = results[0];
    var distance = element.distance.text;
    var duration = element.duration.text;
    alert("dist: " + distance + ", duration: " + duration);
  } else {
    alert("error message: " + status);
  }
}
