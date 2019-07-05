import {useEffect, useState} from 'react'

const useCache = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const cacheValue = $cache.get(key)
    if (cacheValue === undefined) {
      $cache.set(key, initialValue)
      return initialValue
    }
    return cacheValue
  })
  useEffect(() => $cache.set(key, state))

  return [state, setState]
}

export default useCache
