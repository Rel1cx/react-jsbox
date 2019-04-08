import base from './base'
// import { shouldUpdate } from '../utils'

export default class scroll extends base {
  constructor(props) {
    super(
      $ui.create({
        type: 'scroll',
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
