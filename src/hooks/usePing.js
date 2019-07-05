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
  const [error, setError] = useState(null)

  useEffect(() => {
    $network.startPinging({
      ...option,
      didReceiveReply(summary) {
        setState(summary)
      },
      didTimeout(summary) {
        setError({type: 'Timeout', body: summary})
      },
      didFail(error) {
        setError({type: 'Fail', body: error})
      },
      didFailToSendPing(response) {
        setError({type: 'FailToSendPing', body: response})
      }
    })

    return () => $network.stopPinging()
  }, [option])

  return [state, error]
}

export default usePing
