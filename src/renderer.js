import Reconciler from 'react-reconciler'
import View from './Components/View'
import {diffProps, emptyObject, now} from './helper'

const JSBoxRenderer = Reconciler({
  getPublicInstance({element}) {
    return element
  },

  getRootHostContext() {
    return emptyObject
  },

  getChildHostContext() {
    return emptyObject
  },

  prepareForCommit() {},

  resetAfterCommit() {},

  createInstance(type, props, internalInstanceHandle) {
    return new View(type, props)
  },

  appendInitialChild(parentInstance, child) {
    parentInstance
      .getElement()
      .runtimeValue()
      .$addSubview(child.getElement())
  },

  finalizeInitialChildren(parentInstance, type, props) {
    return false
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return diffProps(oldProps, newProps)
    // return true
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
    parentInstance
      .getElement()
      .runtimeValue()
      .$addSubview(child.getElement())
  },

  appendChildToContainer(parentInstance, child) {
    parentInstance.runtimeValue().$addSubview(child.getElement())
  },

  // commitTextUpdate(textInstance, oldText, newText) {},

  commitMount(instance, updatePayload, type, oldProps, newProps) {},

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (updatePayload) {
      instance.update(updatePayload, newProps)
    }
  },

  insertBefore(parentInstance, child, beforeChild) {
    const parent =
      typeof parentInstance.getElement === 'function'
        ? parentInstance.getElement()
        : parentInstance
    parent
      .runtimeValue()
      .$insertSubview_belowSubview(child.getElement(), beforeChild.getElement())
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    const parent =
      typeof parentInstance.getElement === 'function'
        ? parentInstance.getElement()
        : parentInstance
    parent
      .runtimeValue()
      .$insertSubview_belowSubview(child.getElement(), beforeChild.getElement())
  },

  removeChild(parentInstance, child) {
    child.getElement().remove()
  },

  removeChildFromContainer(parentInstance, child) {
    child.getElement().remove()
  },

  resetTextContent() {},

  hideInstance(instance) {
    instance.getElement().hidden = true
  },

  unhideInstance(instance) {
    instance.getElement().hidden = false
  },

  hideTextInstance(instance) {
    instance.getElement().hidden = true
  },

  unhideTextInstance(instance) {
    instance.getElement().hidden = false
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
