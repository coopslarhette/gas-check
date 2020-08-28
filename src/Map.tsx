import React, { useEffect, useRef, useState } from 'react'
import { functions, isEqual, omit } from 'lodash'
import './Map.css'

type PropTypes = {
  origin: string; destination: string;
  handleComputeResult: (distance: number, duration: string) => void
}

function Map({ origin, destination, handleComputeResult }: PropTypes) {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsDisplay, setDirectionsDisplay] = useState<google.maps.DirectionsRenderer>()

  // eslint-disable-next-line consistent-return
  function attachMapsScript(): void | (() => void) {
    const options = {
      center: {
        lat: 39.956813,
        lng: -102.011721,
      },
      zoom: 3,
    }
    // note: options gets modified by API, not an issue atm
    const onLoad = () => {
      if (ref.current) setMap(new google.maps.Map(ref.current, options))
    }

    if (window.google) {
      onLoad()
    } else {
      const script = document.createElement('script')
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC1rUOvjD8PT8XlKlL6uXXaq6wl_9lIOWg'
      document.head.append(script)
      script.addEventListener('load', onLoad)
      return () => script.removeEventListener('load', onLoad)
    }
  }

  useEffect(() => attachMapsScript(), [])

  function drawPathOnMap(): void {
    const directionsService = new google.maps.DirectionsService()
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      // @ts-ignore
      travelMode: 'DRIVING',
    }

    // setting null and then to `map` again is workaround for bug with G Maps API
    directionsDisplay?.setMap(null)
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

  function callDistanceMatrix(): void {
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
        if (status === 'OK') {
          const result = response.rows[0].elements[0]
          const distance = result.distance.value
          const duration = result.duration.text
          handleComputeResult(distance, duration)
        }
      },
    )
  }

  // need this since we don't want to initialize any G Maps objects till script is attached
  function useDidUpdateEffect(fn, deps) {
    const didMountRef = useRef(false)

    useEffect(() => {
      if (didMountRef.current) {
        fn()
      } else {
        didMountRef.current = true
      }
    }, deps)
  }

  useDidUpdateEffect(() => {
    callDistanceMatrix()
    drawPathOnMap()
  }, [origin, destination])

  useDidUpdateEffect(() => {
    const d = new google.maps.DirectionsRenderer()
    d.setMap(map)
    setDirectionsDisplay(d)
  }, [map])

  return (
    <div className="map" ref={ref} />
  )
}

function shouldNotUpdate(props, nextProps) {
  const [propNames, nextPropNames] = [functions(props), functions(nextProps)]
  const noPropChange = isEqual(omit(props, propNames), omit(nextProps, nextPropNames))
  const noFuncChange = propNames.length === nextPropNames.length
    && propNames.every((p) => props[p].toString() === nextProps[p].toString())
  return noPropChange && noFuncChange
}

export default React.memo(Map, shouldNotUpdate)
