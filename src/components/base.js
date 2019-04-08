import { emptyFunction } from '../helper'

export default class Base {
  constructor(element) {
    this.element = element
  }

  getElement() {
    return this.element
  }

  update(lastProps, props) {
    if (!lastProps) {
      lastProps = {}
    }

    if (typeof props.visible === 'boolean' && props.hidden !== lastProps.hidden) {
      this.getElement().hidden = props.hidden
    }
  }
}
Base.prototype.addChildView = emptyFunction
Base.prototype.removeChildView = emptyFunction
Base.prototype.insertBefore = emptyFunction
