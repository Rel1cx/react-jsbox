import {useEffect} from 'react'
import {LAPolicy} from '../constants'

const useAuth = (
  evaluatePolicy = LAPolicy.kLAPolicyDeviceOwnerAuthenticationWithBiometrics,
  localizedReason = `${$addin.current.name} apply for authentication`,
  handler = () => {}
) => {
  const reply = $block('void, BOOL', success =>
    $thread.main({
      delay: 0,
      handler: () => handler(success)
    })
  )
  useEffect(() => {
    const LAContext = $objc('LAContext').invoke('alloc.init')
    LAContext.invoke(
      'evaluatePolicy:localizedReason:reply:',
      evaluatePolicy,
      localizedReason,
      reply
    )
    return () => $objc_release(LAContext)
  }, [])
}

export default useAuth
