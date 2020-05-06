import React from 'react'
import GoogleMapReact from 'google-map-react'

function Map() {
  const center = {
    lat: 39.956813,
    lng: -102.011721,
  }
  return (
    <div style={{ width: 400, height: 400 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: ['AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg'] }}
        zoom={3}
        center={center}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  )
}

export default Map
