import {hasOwnProperty} from '../helper'
import {HIGHLIGHT_UPDATES_COLORS} from '../constants'
export default class View {
  constructor(type, props) {
    const {layout, events, animate} = props
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

  _updateCount = 0

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
    this.element.ocValue().$insertSubview_belowSubview(child.element, beforeChild.element)
  }

  update(updatePayload) {
    const element = this.element
    const __REACT_JSBOX_HIGHLIGHT_UPDATES__ = global.__REACT_JSBOX_HIGHLIGHT_UPDATES__
    if (__REACT_JSBOX_HIGHLIGHT_UPDATES__) {
      this._updateCount++
      const borderWidth = hasOwnProperty.call(updatePayload, 'borderWidth')
        ? updatePayload.borderWidth
        : element.borderWidth
      const borderColor = hasOwnProperty.call(updatePayload, 'borderColor')
        ? updatePayload.borderColor
        : element.borderColor

      const colorIndex = Math.min(HIGHLIGHT_UPDATES_COLORS.length - 1, this._updateCount - 1)
      const color = HIGHLIGHT_UPDATES_COLORS[colorIndex]

      element.borderWidth = Math.max(borderWidth, 1)
      element.borderColor = $color(color)

      setTimeout(() => {
        element.borderWidth = borderWidth
        element.borderColor = borderColor
        this._updateCount = 0
      }, 300)
    }
    if (hasOwnProperty.call(updatePayload, 'animate')) {
      this._animate = updatePayload.animate
      delete updatePayload.animate
    }
    if (this._animate) {
      const {duration = 0.4, damping = 0, velocity = 0, options = 0, completion = () => {}} = this._animate
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
