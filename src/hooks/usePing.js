import {useEffect, useState} from 'react'

const initialState = {
  sequenceNumber: 0,
  payloadSize: 0,
  ttl: 0,
  host: '',
  sendDate: null,
  receiveDate: null,
  rtt: 0,
  status: 0
}

const defaultOption = {
  host: '',
  timeout: 2.0,
  period: 1.0,
  payloadSize: 56,
  ttl: 49
}

const usePing = (option = defaultOption) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    $network.startPinging({
      ...option,
      didReceiveReply(summary) {
        setState(summary)
      }
    })

    return () => $network.stopPinging()
  }, [])

  return [state]
}

export default usePing
