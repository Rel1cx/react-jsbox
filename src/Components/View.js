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

  appendChild(child) {
    this.getElement()
      .runtimeValue()
      .$addSubview(child.getElement())
  }

  removeChild(child) {
    child.getElement().remove()
  }

  insertBefore(child, beforeChild) {
    this.getElement()
      .runtimeValue()
      .$insertSubview_belowSubview(child.getElement(), beforeChild.getElement())
  }

  update(updatePayload, newProps) {
    let element = this.getElement()
    updatePayload.forEach(prop => {
      element[prop] = newProps[prop]
    })
  }
}
