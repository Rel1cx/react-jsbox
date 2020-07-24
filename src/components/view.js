import { hasOwnProperty } from '../helper'
export default class View {
    constructor(type, props) {
        const { layout, events, animate } = props
        this._element = $ui.create({
            type,
            props,
            events
        })
        this._layout = layout
        this._animate = animate
    }

    _element = null

    _layout = null

    _animate = null

    get element() {
        return this._element
    }

    applyLayout() {
        if (typeof this._layout === 'function') {
            this.element.layout(this._layout)
        }
    }

    updateLayout() {
        if (typeof this._layout === 'function') {
            this.element.updateLayout(this._layout)
        }
    }

    remakeLayout() {
        if (typeof this._layout === 'function') {
            this.element.remakeLayout(this._layout)
        }
    }

    appendChild(child) {
        this.element.add(child.element)
        child.applyLayout()
    }

    removeChild(child) {
        child.element.remove()
    }

    insertBefore(child, beforeChild) {
        this.element.insertBelow(child.element, beforeChild.element)
        child.applyLayout()
    }

    update(updatePayload) {
        let needsUpdateLayout = false
        if (hasOwnProperty.call(updatePayload, 'layout')) {
            this._layout = updatePayload.layout
            needsUpdateLayout = true
            delete updatePayload.layout
        }
        if (hasOwnProperty.call(updatePayload, 'animate')) {
            this._animate = updatePayload.animate
            delete updatePayload.animate
        }
        const element = this.element
        if (this._animate) {
            const { duration = 0.4, damping = 0, velocity = 0, options = 0, completion = () => {} } = this._animate
            $ui.animate({
                duration,
                animation() {
                    Object.keys(updatePayload).forEach(prop => {
                        element[prop] = updatePayload[prop]
                    })
                },
                damping,
                velocity,
                options,
                completion
            })
            this.showOverlay()
            return
        }
        Object.keys(updatePayload).forEach(prop => {
            element[prop] = updatePayload[prop]
        })
        needsUpdateLayout && this.updateLayout()
        this.showOverlay()
    }

    showOverlay() {
        if (!global.__REACT_JSBOX_HIGHLIGHT_UPDATES__) {
            return
        }
        const { cornerRadius, smoothCorners, size } = this.element
        const overlayView = $ui.create({
            type: 'view',
            props: {
                frame: $rect(0, 0, size.width, size.height),
                alpha: 0.6,
                cornerRadius,
                smoothCorners,
                bgcolor: $color('clear'),
                borderColor: $color('#37afa9'),
                borderWidth: 2,
                userInteractionEnabled: false
            }
        })
        this.element.add(overlayView)
        setTimeout(() => {
            overlayView.remove()
        }, 300)
    }
}
