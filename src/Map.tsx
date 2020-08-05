/* global google */
import React, { Component } from 'react'
import './Map.css'

type MyProps = {
  origin: string; destination: string;
  handleComputeResult: (distance: number, duration: string) => void
}

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
      s.addEventListener('load', () => {
        this.doInitMapLogic()
      })
    } else {
      this.doInitMapLogic()
    }
  }

  componentDidUpdate(): void {
    this.drawPath()
    this.callDistanceMatrix()
  }

  getCostAndTime(response: google.maps.DistanceMatrixResponse, status: string): void {
    const { handleComputeResult } = this.props
    if (status === 'OK') {
      const result = response.rows[0].elements[0]
      const distance = result.distance.value
      const duration = result.duration.text
      console.table([distance, duration])
      handleComputeResult(distance, duration)
    }
  }

  drawPath(): void {
    const { origin, destination } = this.props
    this.directionsService.route({ origin, destination, travelMode: 'DRIVING' }, (response, status) => {
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

  callDistanceMatrix(): void {
    const { origin, destination } = this.props
    const service = new google.maps.DistanceMatrixService()
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      // @ts-ignore
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, this.getCostAndTime)
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

  render(): JSX.Element {
    return (
      <div className="map" />
    )
  }
}

export default Map
