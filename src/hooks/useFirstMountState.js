import { useRef } from 'react'

const useFirstMountState = () => {
    const isFirst = useRef(true)

    if (isFirst.current) {
        isFirst.current = false

        return true
    }

    return isFirst.current
}

export default useFirstMountState
