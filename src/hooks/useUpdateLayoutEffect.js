import { useLayoutEffect } from 'react'
import useFirstMountState from './useFirstMountState'

const useUpdateLayoutEffect = (effect, deps) => {
    const isFirstMount = useFirstMountState()

    useLayoutEffect(() => {
        if (!isFirstMount) {
            return effect()
        }
    }, deps)
}

export default useUpdateLayoutEffect
