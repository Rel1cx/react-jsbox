export const emptyFunction = () => {}

export const emptyObject = {}

export const hasOwnProperty = Object.prototype.hasOwnProperty

export const { now } = Date

export function getOCClassName(jsValue) {
    return jsValue.ocValue().__clsName
}

export const is = {
    obj: a => a === Object(a),
    str: a => typeof a === 'string',
    num: a => typeof a === 'number',
    und: a => a === void 0,
    arr: a => Array.isArray(a),
    equ(a, b) {
        // Wrong type, doesn't match
        if (typeof a !== typeof b) return false
        // Atomic, just compare a against b
        if (is.str(a) || is.num(a) || is.obj(a)) return a === b
        // Array, shallow compare first to see if it's a match
        if (is.arr(a) && a == b) return true
        // Last resort, go through keys
        let i
        for (i in a) if (!(i in b)) return false
        for (i in b) if (a[i] !== b[i]) return false
        return is.und(i) ? a === b : true
    }
}

export function filterProps(oldProps = {}, newProps) {
    const sameProps = Object.keys(newProps).filter(key => is.equ(newProps[key], oldProps[key]))
    const leftOvers = Object.keys(oldProps).filter(key => newProps[key] === void 0)
    const filteredProps = [...sameProps, 'events', 'children', 'key', 'ref'].reduce((acc, prop) => {
        let { [prop]: _, ...rest } = acc
        return rest
    }, newProps)
    leftOvers.forEach(key => key !== 'children' && (filteredProps[key] = undefined))
    return filteredProps
}
