import view from './components/view'
import {now, filterProps} from './helper'

const NO_CONTEXT = true

const hostConfig = {
  now,

  setTimeout,

  clearTimeout,

  scheduleTimeout: setTimeout,

  cancelTimeout: clearTimeout,

  noTimeout: -1,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false,

  isPrimaryRenderer: true,

  getPublicInstance({element}) {
    return element
  },

  getRootHostContext() {
    return NO_CONTEXT
  },

  getChildHostContext() {
    return NO_CONTEXT
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  createInstance(type, props, internalInstanceHandle) {
    return new view(type, props)
  },

  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },

  finalizeInitialChildren(parentInstance, type, props) {
    return false
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return filterProps(oldProps, newProps)
  },

  shouldSetTextContent() {
    return false
  },

  shouldDeprioritizeSubtree(type, props) {
    return !!props.hidden
  },

  createTextInstance() {
    return null
  },

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
  },

  appendChildToContainer(parentInstance, child) {
    const parent = parentInstance.element || parentInstance
    parent.add(child.element)
  },

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
    parent.insertBelow(child.element, beforeChild.element)
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
    // noop
  },

  unhideTextInstance(instance, props) {
    // noop
  }
}

export default hostConfig
