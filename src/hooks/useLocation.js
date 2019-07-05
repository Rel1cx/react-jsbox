import {useEffect, useState} from 'react'

const defaultState = {
  lat: null,
  lng: null,
  alt: null,
  magneticHeading: null,
  trueHeading: null,
  headingAccuracy: null,
  x: null,
  y: null,
  z: null
}

const useLocation = (initialState = defaultState) => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    $location.startUpdates({handler: resp => setState(state => ({...state, ...resp}))})
    $location.trackHeading({handler: resp => setState(state => ({...state, ...resp}))})
    return () => $location.stopUpdates()
  }, [])

  return [state]
}

export default useLocation
