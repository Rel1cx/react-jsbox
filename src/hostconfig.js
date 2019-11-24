import view from './components/view'
import { now, filterProps, getOCClassName } from './helper'

const NO_CONTEXT = true

export default class HostConfig {
  now = now

  setTimeout = setTimeout

  clearTimeout = clearTimeout

  supportsMutation = true

  supportsPersistence = false

  supportsHydration = false

  getPublicInstance({ element }) {
    return element
  }

  getRootHostContext() {
    return NO_CONTEXT
  }

  getChildHostContext() {
    return NO_CONTEXT
  }

  prepareForCommit() {
    // noop
  }

  resetAfterCommit() {
    // noop
  }

  createInstance(type, props, internalInstanceHandle) {
    return new view(type, props)
  }

  appendInitialChild(parentInstance, child) {
    if (getOCClassName(parentInstance.element) === 'BBStackView') {
      const stack = parentInstance.element.stack
      stack.insert(child.element, stack.views.length)
      return
    }
    parentInstance.appendChild(child)
  }

  finalizeInitialChildren(parentInstance, type, props) {
    return false
  }

  prepareUpdate(instance, type, oldProps, newProps) {
    return filterProps(oldProps, newProps)
  }

  shouldSetTextContent() {
    return false
  }

  shouldDeprioritizeSubtree(type, props) {
    return !!props.hidden
  }

  createTextInstance() {
    return null
  }

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
  }

  appendChildToContainer(parentInstance, child) {
    const parent = parentInstance.element || parentInstance
    if (getOCClassName(parent) === 'BBStackView') {
      parent.stack.insert(child.element, parent.stack.views.length)
      return
    }
    parent.ocValue().$addSubview(child.element)
  }

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  }

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (updatePayload) {
      instance.update(updatePayload)
    }
  }

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild)
  }

  insertInContainerBefore(parentInstance, child, beforeChild) {
    const parent = parentInstance.element || parentInstance
    parent.ocValue().$insertSubview_belowSubview(child.element, beforeChild.element)
  }

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  }

  removeChildFromContainer(parentInstance, child) {
    const parent = parentInstance.element || parentInstance
    if (getOCClassName(parent) === 'BBStackView') {
      parent.stack.remove(child.element)
      return
    }
    child.element.remove()
  }

  resetTextContent() {
    // noop
  }

  hideInstance(instance) {
    instance.element.hidden = true
  }

  unhideInstance(instance) {
    instance.element.hidden = false
  }

}
