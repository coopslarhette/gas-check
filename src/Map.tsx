/* global google */
import React, { Component } from 'react'
import './Map.css'

type PropTypes = {
  origin: string; destination: string;
  handleComputeResult: (distance: number, duration: string) => void
}

type StateTypes = {
  directionsDisplay: google.maps.DirectionsRenderer | null
}

class Map extends Component<PropTypes, StateTypes> {
  constructor(props) {
    super(props)
    this.state = { directionsDisplay: null }
  }

  componentDidMount(): void {
    this.attachMapsScript()
  }

  shouldComponentUpdate(nextProps: Readonly<PropTypes>): boolean {
    const { origin, destination } = this.props
    return origin !== nextProps.origin || destination !== nextProps.destination
  }

  componentDidUpdate(): void {
    this.callDistanceMatrix()
    this.drawPathOnMap()
  }

  attachMapsScript(): void {
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

  drawPathOnMap(): void {
    const directionsService = new google.maps.DirectionsService()
    const { origin, destination } = this.props
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      // @ts-ignore
      travelMode: 'DRIVING',
    }
    const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {
        lat: 39.956813,
        lng: -102.011721,
      },
      zoom: 3,
    })
    const { directionsDisplay } = this.state

    directionsService.route(
      request, (response: google.maps.DirectionsResult, status: string) => {
        if (status === 'OK') {
          directionsDisplay?.setDirections(response)
          directionsDisplay?.setMap(map)
        } else if (status === 'NOT_FOUND' || status === 'ZERO_RESULTS') {
          // eslint-disable-next-line no-alert
          alert('One of your addresses could not be found, please try again.')
        } else {
          // eslint-disable-next-line no-alert
          alert('Something went wrong, please try again later.')
        } // need to figure out better handling of this methinks
      },
    )
  }

  callDistanceMatrix(): void {
    const { origin, destination } = this.props
    const service = new google.maps.DistanceMatrixService()
    const request: google.maps.DistanceMatrixRequest = {
      origins: [origin],
      destinations: [destination],
      // @ts-ignore
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }

    service.getDistanceMatrix(
      request, (response: google.maps.DistanceMatrixResponse, status: string): void => {
        const { handleComputeResult } = this.props
        if (status === 'OK') {
          const result = response.rows[0].elements[0]
          const distance = result.distance.value
          const duration = result.duration.text
          handleComputeResult(distance, duration)
        }
      },
    )
  }

  doInitMapLogic(): void {
    this.setState({ directionsDisplay: new google.maps.DirectionsRenderer() })
    const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {
        lat: 39.956813,
        lng: -102.011721,
      },
      zoom: 3,
    })
    const { directionsDisplay } = this.state
    directionsDisplay?.setMap(map)
  }

  render(): JSX.Element {
    return (
      <div className="map" />
    )
  }
}

export default Map
