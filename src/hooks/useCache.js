import {useEffect, useState} from 'react'

const useCache = (key, initialValue, raw) => {
  const [state, setState] = useState(() => {
    try {
      const cacheValue = $cache.get(key)
      if (typeof cacheValue !== 'string') {
        $cache.set(key, raw ? String(initialValue) : JSON.stringify(initialValue))
        return initialValue
      } else {
        return raw ? cacheValue : JSON.parse(cacheValue || 'null')
      }
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state)
      $cache.set(key, serializedState)
    } catch {}
  })

  return [state, setState]
}

export default useCache
