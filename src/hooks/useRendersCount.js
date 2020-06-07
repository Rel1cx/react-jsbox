import {useRef} from 'react'

export default function useRendersCount() {
  return ++useRef(0).current
}
