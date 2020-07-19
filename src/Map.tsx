import React from 'react'
import './Map.css'

// eslint-disable-next-line react/prefer-stateless-function
class Map extends React.Component {
  componentDidMount(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!window.google) {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg'
      const x = document.getElementsByTagName('script')[0]
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x)
      }
      // Below is important.
      // We cannot access google.maps until it's finished loading
      s.addEventListener('load', (e) => {
        this.doInitMapLogic()
      })
    } else {
      this.doInitMapLogic()
    }
  }

  doInitMapLogic(): void {
    // eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const directionsDisplay = new google.maps.DirectionsRenderer()
    // need this for autocomplete to work on origin input
    // const autocompleteOrigin = new google.maps.places.Autocomplete(document.getElementById('origin'ip)
    // const autocompleteDest = new google.maps.places.Autocomplete(document.getElementById('destination'))
    // const directionsService = new google.maps.DirectionsService()
    // const directionsService = new google.maps.DirectionsService()
    // eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {
        lat: 39.956813,
        lng: -102.011721,
      },
      zoom: 3,
    })
    directionsDisplay.setMap(map)
  }

  render(): JSX.Element {
    // useEffect(() => {
    //   const googleMapsUrl = 'https://maps.google.com/maps/api/js?key=AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg'
    //
    //   if (!document.querySelectorAll(`[src="${googleMapsUrl}"]`).length) {
    //     document.body.appendChild(Object.assign(
    //       document.createElement('script'), {
    //         type: 'text/javascript',
    //         src: googleMapsUrl,
    //         onload: () => doInitMapLogic(),
    //       },
    //     ))
    //     const s = document.createElement('script')
    //     const x = document.getElementsByTagName('script')[0]
    //     if (x.parentNode != null) {
    //       x.parentNode.insertBefore(s, x)
    //     }
    //   } else {
    //     doInitMapLogic()
    //   }
    // })

    return (
      <div className="map" />
    )
  }
}

export default Map
