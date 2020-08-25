/* global google */
import React, { useEffect, useRef, useState } from 'react'
import './Map.css'

type Props = {
  origin: string; destination: string;
  handleComputeResult: (distance: number, duration: string) => void
}

function Map(props: Props) {
  const ref = useRef()
  const [map, setMap] = useState()
  let directionsDisplay

  function doInitMapLogic(): void {
    // map = new google.maps.Map(document.getElementsByClassName('map')[0], {
    //   center: {
    //     lat: 39.956813,
    //     lng: -102.011721,
    //   },
    //   zoom: 3,
    // })
    directionsDisplay = new google.maps.DirectionsRenderer()
    directionsDisplay.setMap(map)
  }

  function attachMapsScript(): () => void {
    const options = {
      center: {
        lat: 39.956813,
        lng: -102.011721,
      },
      zoom: 3,
    }
    // @ts-ignore
    const onLoad = () => setMap(new google.maps.Map(ref.current, options))
    if (!window.google) {
      const script = document.createElement('script')
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg'
      document.head.append(script)
      script.addEventListener('load', onLoad)
      return () => script.removeEventListener('load', onLoad)
    }
    onLoad()
    return () => {
    }
  }

  function drawPathOnMap(): void {
    const directionsService = new google.maps.DirectionsService()
    const { origin, destination } = props
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      // @ts-ignore
      travelMode: 'DRIVING',
    }

    directionsService.route(
      request, (response: google.maps.DirectionsResult, status: string) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
          directionsDisplay.setMap(map)
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

  function callDistanceMatrix(): void {
    const { origin, destination } = props
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
        const { handleComputeResult } = props
        if (status === 'OK') {
          const result = response.rows[0].elements[0]
          const distance = result.distance.value
          const duration = result.duration.text
          handleComputeResult(distance, duration)
        }
      },
    )
  }

  useEffect(() => {
    console.log('effect1')
    return attachMapsScript()
  }, [])

  useEffect(() => {
    console.log('effect2')
    callDistanceMatrix()
    drawPathOnMap()
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.origin, props.destination])

  return (
    // @ts-ignore
    <div className="map" {...{ ref }} />
  )
}

// function shouldNotUpdate(props, nextProps) {
//   const [propNames, nextPropNames] = [functions(props), functions(nextProps)]
//   const noPropChange = isEqual(omit(props, propNames), omit(nextProps, nextPropNames))
//   const noFuncChange = propNames.length === nextPropNames.length
//     && propNames.every((p) => props[p].toString() === nextProps[p].toString())
//   return noPropChange && noFuncChange
// }

// React.memo(Map, shouldNotUpdate)

export default Map
