export const emptyFunction = () => {}
export const emptyObject = {}

// HighRes but slower then Date.now during invoke
// const now = () => $objc('NSDate').invoke('date').invoke('timeIntervalSince1970') * 1000

export const {now} = Date

export function shallowDiff(oldObj, newObj) {
  let uniqueProps = new Set([...Object.keys(oldObj), ...Object.keys(newObj)])
  let changedProps = Array.from(uniqueProps).filter(
    propName => oldObj[propName] !== newObj[propName]
  )
  return changedProps
}

export function diffProps(oldProps, newProps) {
  if (!oldProps) {
    oldProps = {}
  }
  let changedProps = shallowDiff(oldProps, newProps)
  return changedProps.length ? changedProps : null
}
