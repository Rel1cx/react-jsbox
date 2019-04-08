import base from './base'

// const { shouldUpdate } = require('../utils')

export default class view extends base {
  constructor(props) {
    super(
      $ui.create({
        type: 'view',
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
  }
}
