var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 33.969873,
      lng: -118.416671
    },
    zoom: 9
  });
}
