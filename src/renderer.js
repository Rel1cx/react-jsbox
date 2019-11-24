import ReactFiberReconciler from 'react-reconciler'
import hostConfig from './hostconfig'

const JSBoxRenderer = ReactFiberReconciler(hostConfig)

export default function render(element, container, callback) {
  let fiberRoot = container._reactRootContainer
  if (!fiberRoot) {
    container.views.forEach(view => view.remove())
    const newFiberRoot = JSBoxRenderer.createContainer(container)
    // eslint-disable-next-line
    fiberRoot = container._reactRootContainer = newFiberRoot
  }
  return JSBoxRenderer.updateContainer(element, fiberRoot, null, callback)
}
