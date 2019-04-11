// const {shouldUpdate} = require('../helper')

export default class View {
  constructor(type, props) {
    this.element = $ui.create({
      type,
      props,
      events: props.events
    })
  }

  getElement() {
    return this.element
  }

  exists(prop) {
    return typeof prop !== 'undefined'
  }

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
