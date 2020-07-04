import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import useGeolocation from 'react-hook-geolocation'

function Map() {
  const center = {
    lat: 39.956813,
    lng: -102.011721,
  }

  // const geolocation = useGeolocation()
  // useEffect(() => [center.lat, center.lng] = [geolocation.latitude, geolocation.longitude])
  return (
    <div style={{ width: 400, height: 400 }}>
      <GoogleMapReact
        bootstrapURLKeys={ ['AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg']}
        zoom={3}
        center={center}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  )
}

export default Map
