export const emptyFunction = () => {}
export const emptyObject = {}

// HighRes but slower then Date.now during invoke
// const now = () => $objc('NSDate').invoke('date').invoke('timeIntervalSince1970') * 1000

export const { now } = Date

// Based on react-three-fiber ((c) 2019 Paul Henschel, MIT).
// https://github.com/drcmda/react-three-fiber/blob/master/src/reconciler.tsx#L13
export const is = {
  raw: a => a.__clsName !== undefined,
  obj: a => a === Object(a),
  str: a => typeof a === 'string',
  num: a => typeof a === 'number',
  und: a => a === void 0,
  arr: a => Array.isArray(a),
  equ(a, b) {
    if (typeof a !== typeof b) return false
    if (is.str(a) || is.num(a) || is.obj(a)) return a === b
    if (is.arr(a) && a == b) return true
    let i
    for (i in a) if (!(i in b)) return false
    for (i in b) if (a[i] !== b[i]) return false
    return is.und(i) ? a === b : true
  }
}

export function filterProps(oldProps = {}, newProps) {
  const sameProps = Object.keys(newProps).filter(key =>
    is.equ(newProps[key], oldProps[key])
  )
  const filteredProps = [
    ...sameProps,
    'layout',
    'events',
    'children',
    'key',
    'ref'
  ].reduce((acc, prop) => {
    let { [prop]: _, ...rest } = acc
    return rest
  }, newProps)
  return filteredProps
}
