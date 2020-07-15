import React from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.css'

function Map(): JSX.Element {
  const center = {
    lat: 39.956813,
    lng: -102.011721,
  }

  // const geolocation = useGeolocation()
  // useEffect(() => [center.lat, center.lng] = [geolocation.latitude, geolocation.longitude])
  return (
    <div className="map">
      <GoogleMapReact
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        bootstrapURLKeys="AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg"
        zoom={3}
        center={center}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  )
}

export default Map
