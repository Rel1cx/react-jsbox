// const {shouldUpdate} = require('../helper')

export default class View {
  constructor(type, props) {
    let {layout, events} = props
    this.element = $ui.create({
      type,
      props,
      layout, // layouts does not work via $ui.create
      events
    })
  }

  getElement() {
    return this.element
  }

  exists(prop) {
    return typeof prop !== 'undefined'
  }

  update(oldProps, updatePayload) {
    let element = this.getElement()
    Object.keys(updatePayload).forEach(prop => {
      if (oldProps[prop] !== updatePayload[prop]) {
        element[prop] = updatePayload[prop]
      }
    })
  }
}
