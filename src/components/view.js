export default class View {
  constructor(type, props) {
    const {layout, events} = props
    this._element = $ui.create({
      type,
      props,
      layout,
      events
    })
  }

  _element = null

  get element() {
    return this._element
  }

  appendChild(child) {
    this.element.add(child.element)
  }

  removeChild(child) {
    child.element.remove()
  }

  insertBefore(child, beforeChild) {
    this.element.insertBelow(child.element, beforeChild.element)
  }

  update(updatePayload) {
    const element = this.element
    Object.keys(updatePayload).forEach(prop => {
      element[prop] = updatePayload[prop]
    })
  }
}
