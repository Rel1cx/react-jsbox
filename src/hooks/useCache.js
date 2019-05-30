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

  useEffect(() => {
    try {
      $cache.set(key, state)
    } catch {}
  })

  return [state, setState]
}

export default useCache
