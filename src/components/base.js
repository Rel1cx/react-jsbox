export default class base {
  constructor(element) {
    this.element = element
  }

  getElement() {
    return this.element
  }

  exists(prop) {
    return typeof prop !== 'undefined'
  }

  appendChild() {}

  removeChild() {}

  insertBefore() {}

  update(oldProps, newProps) {
    if (!oldProps) {
      oldProps = {}
    }
    Object.keys(newProps).forEach(prop => {
      if (oldProps[prop] !== newProps[prop]) {
        this.getElement()[prop] = newProps[prop]
      }
    })
  }
}
