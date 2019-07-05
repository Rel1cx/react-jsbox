import {useEffect, useState} from 'react'

const defaultState = {
  attitude: {
    yaw: null,
    quaternion: {
      y: null,
      w: null,
      z: null,
      x: null
    },
    rotationMatrix: {
      m31: null,
      m21: null,
      m11: null,
      m33: null,
      m23: null,
      m13: null,
      m32: null,
      m22: null,
      m12: null
    },
    pitch: null,
    roll: null
  },
  magneticField: {
    field: {
      x: 0,
      y: 0,
      z: 0
    },
    accuracy: -1
  },
  rotationRate: {
    x: null,
    y: null,
    z: null
  },
  acceleration: {
    x: null,
    y: null,
    z: null
  },
  gravity: {
    x: null,
    y: null,
    z: null
  }
}

const useMotion = (initialState = defaultState) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const handler = resp => setState(resp)
    $motion.startUpdates({
      interval: 1 / 30,
      handler
    })

    return () => $motion.stopUpdates()
  }, [])

  return [state]
}

export default useMotion
