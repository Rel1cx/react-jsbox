import View from './Components/view'
import { now, filterProps, debug } from './helper'

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
    return new View(type, props)
  }

  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child)
  }

  finalizeInitialChildren(parentInstance, type, props) {
    return false
  }

  prepareUpdate(instance, type, oldProps, newProps) {
    return filterProps(oldProps, newProps) || null
  }

  shouldSetTextContent() {
    return false
  }

  shouldDeprioritizeSubtree(type, props) {
    return false
  }

  createTextInstance() {
    return null
  }

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
  }

  @debug
  appendChildToContainer(parentInstance, child) {
    const parent = parentInstance.element || parentInstance
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

  @debug
  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild)
  }

  @debug
  insertInContainerBefore(parentInstance, child, beforeChild) {
    const parent = parentInstance.element || parentInstance
    parent.ocValue().$insertSubview_belowSubview(child.element, beforeChild.element)
  }

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  }

  @debug
  removeChildFromContainer(parentInstance, child) {
    child.element.remove()
  }

  resetTextContent() {
    // noop
  }

  @debug
  hideInstance(instance) {
    instance.element.hidden = true
  }

  @debug
  unhideInstance(instance) {
    instance.element.hidden = false
  }

  // hideTextInstance(instance) {
  //   instance.element.hidden = true
  // }

  // unhideTextInstance(instance) {
  //   instance.element.hidden = false
  // }

  // cloneInstance(instance, updatePayload, type, oldProps, newProps) {}

  // createContainerChildSet() {}

  // appendChildToContainerChildSet() {}

  // finalizeContainerChildren() {}

  // replaceContainerChildren() {}

  // cloneHiddenInstance() {}

  // cloneUnhiddenInstance() {}

  // createHiddenTextInstance() {}

  // canHydrateInstance() {}

  // canHydrateTextInstance() {}

  // getNextHydratableSibling() {}

  // getFirstHydratableChild() {}

  // hydrateInstance() {}

  // hydrateTextInstance() {}
}
