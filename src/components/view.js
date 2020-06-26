import { hasOwnProperty } from '../helper'
export default class View {
  constructor(type, props) {
    const { layout, events, animate } = props
    this._element = $ui.create({
      type,
      props,
      layout,
      events
    })
    this._animate = animate
  }

  _element = null

  _animate = null

  get element() {
    return this._element
  }

  appendChild(child) {
    this.element.ocValue().$addSubview(child.element)
  }

  removeChild(child) {
    child.element.remove()
  }

  insertBefore(child, beforeChild) {
    this.element
      .ocValue()
      .$insertSubview_belowSubview(child.element, beforeChild.element)
  }

  update(updatePayload) {
    const element = this.element
    if (hasOwnProperty.call(updatePayload, 'animate')) {
      this._animate = updatePayload.animate
      delete updatePayload.animate
    }
    if (this._animate) {
      const { duration = 0.4, damping = 0, velocity = 0, options = 0, completion = () => { } } = this._animate
      return $ui.animate({
        duration,
        animation() {
          Object.keys(updatePayload).forEach(prop => {
            element[prop] = updatePayload[prop]
          })
        },
        damping,
        velocity,
        options,
        completion
      })
    }
    Object.keys(updatePayload).forEach(prop => {
      element[prop] = updatePayload[prop]
    })
  }
}
