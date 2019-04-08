import base from './base'
import { shouldUpdate } from '../helper'

export default class label extends base {
  constructor(props) {
    super(
      $ui.create({
        type: 'label',
        props,
        events: {
          tapped: props.tapped,
        },
      }),
    )

    this.update(null, props)
  }

  update(lastProps, props) {
    super.update(lastProps, props)
    if (shouldUpdate(props, lastProps, 'text')) {
      this.element.text = props.text
    }
  }
}
