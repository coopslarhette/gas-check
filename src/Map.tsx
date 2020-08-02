/* global google */
import React, { Component } from 'react'
import './Map.css'

type MyProps = {
  request: { origin: string; destination: string; travelMode: string };
};

class Map extends Component<MyProps> {
  directionsDisplay

  directionsService

  componentDidMount(): void {
    if (!window.google) {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg'
      const x = document.getElementsByTagName('script')[0]
      if (x && x.parentNode) {
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

  componentDidUpdate(): void {
    this.drawPath()
  }

  doInitMapLogic(): void {
    this.directionsDisplay = new google.maps.DirectionsRenderer()
    this.directionsService = new google.maps.DirectionsService()
    const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {
        lat: 39.956813,
        lng: -102.011721,
      },
      zoom: 3,
    })
    this.directionsDisplay.setMap(map)
  }

  drawPath(): void {
    const { request } = this.props
    this.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response)
      } else if (status === 'NOT_FOUND' || status === 'ZERO_RESULTS') {
        // eslint-disable-next-line no-alert
        alert('One of your addresses could not be found, please try again.')
      } else {
        // eslint-disable-next-line no-alert
        alert('Something went wrong, please try again later.')
      } // need to figure out better handling of this methinks
    })
  }

  render(): JSX.Element {
    return (
      <div className="map" />
    )
  }
}

export default Map
