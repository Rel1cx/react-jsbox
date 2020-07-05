import ReactFiberReconciler from 'react-reconciler'
import hostConfig from './hostconfig'

const reconciler = ReactFiberReconciler(hostConfig)

const isConcurrent = true
const hydrate = false

const defaultOptions = {
  onInit: () => {},
  onRender: () => {}
}

export function render(element, container, options) {
  const rendererOptions = Object.assign({}, defaultOptions, options)
  let fiberRoot = container._reactRootContainer
  if (!fiberRoot) {
    container.views.forEach(view => view.remove())
    const newFiberRoot = reconciler.createContainer(container, isConcurrent, hydrate)
    // eslint-disable-next-line
    fiberRoot = container._reactRootContainer = newFiberRoot
  }
  rendererOptions.onInit(reconciler)
  return reconciler.updateContainer(element, fiberRoot, null, rendererOptions.onRender)
}
