import Base from './Base'

// const {shouldUpdate} = require('../helper')

export default class View extends Base {
  constructor(type, props) {
    super(
      $ui.create({
        type,
        props,
        events: props.events
      })
    )
    this.update(null, props)
  }

  update(lastProps, props) {
    super.update(lastProps, props)
  }
}
