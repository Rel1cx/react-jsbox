import {useEffect} from 'react'

const useDebounce = (fn, ms = 0, args = []) => {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms)

    return () => {
      // if args change then clear timeout
      clearTimeout(handle)
    }
  }, [args])
}

export default useDebounce
