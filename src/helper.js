export const emptyFunction = () => {}

export const emptyObject = {}

// HighRes but slower then Date.now during invoke
// const now = () => $objc('NSDate').invoke('date').invoke('timeIntervalSince1970') * 1000

export const { now } = Date

export function scheduleDeferredCallback(frameCallback) {
  return setTimeout(() => {
    frameCallback({
      timeRemaining() {
        return Infinity
      },
    })
  }, 0)
}

export function shouldUpdate(props, lastProps, propName) {
  if (!props || props[propName] === undefined) {
    return false
  }
  if (!lastProps) {
    return true
  }
  return props[propName] !== lastProps[propName]
}
