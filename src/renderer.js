/* eslint-disable no-unused-vars */
import Reconciler from 'react-reconciler'
import {Components, hasComponent} from './components'
import {emptyObject, now, scheduleDeferredCallback} from './helper'

function appendInitialChild(parentInstance, child) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent.runtimeValue().$addSubview(child.getElement())
}

function createInstance(type, props, internalInstanceHandle) {
  if (!hasComponent(type)) {
    throw new Error(`invalid built-in component type: ${type}`)
  }
  const Comp = Components[type]
  return new Comp(props)
}

// eslint-disable-next-line
function finalizeInitialChildren(docElement, type, props) {
  return false
}

function getPublicInstance({element}) {
  return element
}

function prepareForCommit() {}

function prepareUpdate() {
  return true
}

function resetAfterCommit() {}

function getRootHostContext() {
  return emptyObject
}

function getChildHostContext() {
  return emptyObject
}

function shouldSetTextContent() {
  return false
}

function resetTextContent() {}

function createTextInstance() {
  return null
}

// eslint-disable-next-line
function shouldDeprioritizeSubtree(type, props) {
  return false
}

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

function removeChild(parentInstance, child) {
  child.getElement().remove()
}

function removeChildFromContainer(parentInstance, child) {
  child.getElement().remove()
}

function insertBefore(parentInstance, child, beforeChild) {
  const parent =
    typeof parentInstance.getElement === 'function'
      ? parentInstance.getElement()
      : parentInstance
  parent
    .runtimeValue()
    .$insertSubview(
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
    .$insertSubview(
      child.getElement().runtimeValue(),
      beforeChild.getElement().runtimeValue()
    )
}

function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
  instance.update(oldProps, newProps)
}

function commitMount(instance, updatePayload, type, oldProps, newProps) {
  // console.log('commitMount', instance, updatePayload, type, oldProps, newProp)
}

function commitTextUpdate(textInstance, oldText, newText) {
  // console.log('commitTextUpdate', textInstance, oldText, newText)
}

const JSBoxRenderer = Reconciler({
  appendInitialChild,

  createInstance,

  createTextInstance,

  finalizeInitialChildren,

  getPublicInstance,

  prepareForCommit,

  prepareUpdate,

  resetAfterCommit,

  resetTextContent,

  getRootHostContext,

  getChildHostContext,

  shouldSetTextContent,

  scheduleDeferredCallback,

  shouldDeprioritizeSubtree,

  now,

  supportsMutation: true,

  appendChild,

  appendChildToContainer,

  commitMount,

  commitUpdate,

  insertBefore,

  insertInContainerBefore,

  removeChild,

  removeChildFromContainer,

  commitTextUpdate
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
