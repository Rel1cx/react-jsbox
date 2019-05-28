import View from './Components/View'
import warn from 'warning'
import {
  filterProps,
  emptyObject,
  now,
  getCircularReplacer,
  hookArgs,
  debug
} from './helper'

// Fix JSBox console.log Circular Error
if (/\[native code\]/.test(console.log.toString())) {
  global.console.log = hookArgs(console.log, (...args) =>
    args.map(arg => JSON.parse(JSON.stringify(arg, getCircularReplacer())))
  )
}

const NO_CONTEXT = true

export default class HostConfig {
  @debug
  getPublicInstance({ element }) {
    return element
  }

  @debug
  getRootHostContext() {
    return NO_CONTEXT
  }
  @debug
  getChildHostContext() {
    return NO_CONTEXT
  }

  prepareForCommit() {
    // noop
  }

  resetAfterCommit() {
    // noop
  }

  @debug
  createInstance(type, props, internalInstanceHandle) {
    return new View(type, props)
  }

  @debug
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child)
  }

  @debug
  finalizeInitialChildren(parentInstance, type, props) {
    return false
  }

  @debug
  prepareUpdate(instance, type, oldProps, newProps) {
    return filterProps(oldProps, newProps) || null
  }

  @debug
  shouldSetTextContent() {
    return false
  }

  shouldDeprioritizeSubtree(type, props) {
    return false
  }

  createTextInstance() {
    return null
  }

  @debug
  setTimeout = setTimeout

  @debug
  clearTimeout = clearTimeout

  now = now

  supportsMutation = true

  supportsPersistence = false

  supportsHydration = false

  @debug
  appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
  }

  @debug
  appendChildToContainer(parentInstance, child) {
    const parent = parentInstance.element || parentInstance
    parent.runtimeValue().$addSubview(child.element)
  }

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  }

  @debug
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
    parent
      .runtimeValue()
      .$insertSubview_belowSubview(child.element, beforeChild.element)
  }

  @debug
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

  @debug
  hideTextInstance(instance) {
    instance.element.hidden = true
  }

  @debug
  unhideTextInstance(instance) {
    instance.element.hidden = false
  }

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
