import Reconciler from 'react-reconciler'
import View from './Components/View'
import {emptyObject, now} from './helper'

function getPublicInstance({element}) {
  return element
}
function getRootHostContext() {
  return emptyObject
}
function getChildHostContext() {
  return emptyObject
}
function prepareForCommit() {}
function resetAfterCommit() {}
function createInstance(type, props, internalInstanceHandle) {
  return new View(type, props)
}
function appendInitialChild(parentInstance, child) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent.runtimeValue().$addSubview(child.getElement())
}
function finalizeInitialChildren(docElement, type, props) {
  return false
}
function prepareUpdate() {
  return true
}
function shouldSetTextContent() {
  return false
}
function shouldDeprioritizeSubtree(type, props) {
  return false
}
function createTextInstance() {
  return null
}
function scheduleDeferredCallback(frameCallback) {
  return setTimeout(() => {
    frameCallback({
      timeRemaining() {
        return Infinity
      }
    })
  }, 0)
}
function cancelDeferredCallback(id) {
  clearTimeout(id)
}
// function shouldYield() {}
// function setTimeout() {}
// function clearTimeout() {}
// function noTimeout() {}
function schedulePassiveEffects() {}
function cancelPassiveEffects() {}
function isPrimaryRenderer() {
  return true
}
// function supportsPersistence() {}
// function supportsHydration() {}
function appendChild(parentInstance, child) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent.runtimeValue().$addSubview(child.getElement())
}
function appendChildToContainer(parentInstance, child) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent.runtimeValue().$addSubview(child.getElement())
}
function commitTextUpdate(textInstance, oldText, newText) {}
function commitMount(instance, updatePayload, type, oldProps, newProps) {}
function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
  instance.update(oldProps, newProps)
}
function insertBefore(parentInstance, child, beforeChild) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent
    .runtimeValue()
    .$insertSubview_belowSubview(
      child.getElement().runtimeValue(),
      beforeChild.getElement().runtimeValue()
    )
}
function insertInContainerBefore(parentInstance, child, beforeChild) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent
    .runtimeValue()
    .$insertSubview_belowSubview(
      child.getElement().runtimeValue(),
      beforeChild.getElement().runtimeValue()
    )
}
function removeChild(parentInstance, child) {
  child.getElement().remove()
}

function removeChildFromContainer(parentInstance, child) {
  child.getElement().remove()
}
function resetTextContent() {}
function hideInstance(instance) {
  instance.getElement().hidden = true
}

function unhideInstance(instance) {
  instance.getElement().hidden = false
}

function hideTextInstance(instance) {
  instance.getElement().hidden = true
}

function unhideTextInstance(instance) {
  instance.getElement().hidden = false
}
// function cloneInstance() {}
// function createContainerChildSet() {}
// function appendChildToContainerChildSet() {}
// function finalizeContainerChildren() {}
// function replaceContainerChildren() {}
// function cloneHiddenInstance() {}
// function cloneUnhiddenInstance() {}
// function createHiddenTextInstance() {}
// function canHydrateInstance() {}
// function canHydrateTextInstance() {}
// function getNextHydratableSibling() {}
// function getFirstHydratableChild() {}
// function hydrateInstance() {}
// function hydrateTextInstance() {}

const JSBoxRenderer = Reconciler({
  getPublicInstance,
  getRootHostContext,
  getChildHostContext,
  prepareForCommit,
  resetAfterCommit,
  createInstance,
  appendInitialChild,
  finalizeInitialChildren,
  prepareUpdate,
  shouldSetTextContent,
  shouldDeprioritizeSubtree,
  createTextInstance,
  scheduleDeferredCallback,
  cancelDeferredCallback,
  now,
  supportsMutation: true,
  schedulePassiveEffects,
  cancelPassiveEffects,
  isPrimaryRenderer,
  // supportsPersistence,
  // supportsHydration,
  appendChild,
  appendChildToContainer,
  commitTextUpdate,
  commitMount,
  commitUpdate,
  insertBefore,
  insertInContainerBefore,
  removeChild,
  removeChildFromContainer,
  resetTextContent,
  hideInstance,
  unhideInstance,
  hideTextInstance,
  unhideTextInstance
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
