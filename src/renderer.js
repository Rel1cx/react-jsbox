import Reconciler from 'react-reconciler'
import View from './Components/View'
import { filterProps, emptyObject, now } from './helper'

const JSBoxRenderer = Reconciler({
  getPublicInstance({ element }) {
    return element
  },

  getRootHostContext() {
    return emptyObject
  },

  getChildHostContext() {
    return emptyObject
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  createInstance(type, props, internalInstanceHandle) {
    return new View(type, props)
  },

  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },

  finalizeInitialChildren(parentInstance, type, props) {
    return false
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return filterProps(oldProps, newProps) || null
  },

  shouldSetTextContent() {
    return false
  },

  shouldDeprioritizeSubtree(type, props) {
    return false
  },

  createTextInstance() {
    return null
  },

  scheduleDeferredCallback(frameCallback) {
    return setTimeout(() => {
      frameCallback({
        timeRemaining() {
          return Infinity
        }
      })
    }, 0)
  },

  cancelDeferredCallback(id) {
    clearTimeout(id)
  },

  // shouldYield() {},

  // setTimeout() {},

  // clearTimeout() {},

  // noTimeout

  // schedulePassiveEffects() {},

  // cancelPassiveEffects() {},

  now,

  // isPrimaryRenderer: true,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false,

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },

  appendChildToContainer(parentInstance, child) {
    const parent = parentInstance.element || parentInstance
    parent.runtimeValue().$addSubview(child.element)
  },

  // commitTextUpdate(textInstance, oldText, newText) {},

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (updatePayload) {
      instance.update(updatePayload)
    }
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild)
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    const parent = parentInstance.element || parentInstance
    parent
      .runtimeValue()
      .$insertSubview_belowSubview(child.element, beforeChild.element)
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  },

  removeChildFromContainer(parentInstance, child) {
    child.element.remove()
  },

  resetTextContent() {
    // noop
  },

  hideInstance(instance) {
    instance.element.hidden = true
  },

  unhideInstance(instance) {
    instance.element.hidden = false
  },

  hideTextInstance(instance) {
    instance.element.hidden = true
  },

  unhideTextInstance(instance) {
    instance.element.hidden = false
  }

  // cloneInstance(instance, updatePayload, type, oldProps, newProps) {}

  // createContainerChildSet() {},

  // appendChildToContainerChildSet() {},

  // finalizeContainerChildren() {},

  // replaceContainerChildren() {},

  // cloneHiddenInstance() {},

  // cloneUnhiddenInstance() {},

  // createHiddenTextInstance() {},

  // canHydrateInstance() {},

  // canHydrateTextInstance() {},

  // getNextHydratableSibling() {},

  // getFirstHydratableChild() {},

  // hydrateInstance() {},

  // hydrateTextInstance() {}
})

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
