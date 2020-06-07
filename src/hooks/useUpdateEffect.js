import {useEffect} from 'react'
import useFirstMountState from './useFirstMountState'

const useUpdateEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
  }, deps)
}

export default useUpdateEffect
