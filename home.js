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
    var distance = parseInt(element.distance.text);
    var duration = element.duration.text;
    var mpg = parseInt(document.getElementById('mpg').value);
    var galCost = parseInt(document.getElementById('gallon-cost').value);
    var totalCost = distance / mpg * galCost;
    if (totalCost < 1) {
      totalCost = 1;
    } else {
      totalCost = totalCost.toFixed(0);
    }
    var div = document.createElement("div");
    var h4 = document.createElement("h4");
    var msg = "Your trip will use approximately $" + totalCost +
      " worth of gas.";
    try {
      var previousResult = document.getElementById('result');
      previousResult.parentNode.removeChild(previousResult);
    } catch (err) {}
    div.className = "alert alert-success";
    div.id = "result";
    div.style.marginTop = "10px";
    div.style.border = "1px solid black";
    h4.textContent = msg;
    document.getElementById('compute').appendChild(div);
    document.getElementById('result').appendChild(h4);

    document.getElementById("compute").appendChild(div);
  } else {
    alert("error message: " + status);
  }
}
