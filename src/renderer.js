import Reconciler from 'react-reconciler'
import HostConfig from './hostconfig'
import { now } from './helper'

const JSBoxRenderer = Reconciler(new HostConfig(now, setTimeout, setInterval, true, false, false))

export default function render(element, container, callback) {
  let root = container._reactRootContainer
  if (!root) {
    container.views.forEach(v => v.remove())
    const newRoot = JSBoxRenderer.createContainer(container)
    // eslint-disable-next-line
    root = container._reactRootContainer = newRoot
  }
  return JSBoxRenderer.updateContainer(element, root, null, callback)
}
