> A custom React renderer for writing JSBox apps in React.

npm: <https://www.npmjs.com/package/react-jsbox>

React doc: <https://reactjs.org/docs/getting-started.html>

JSBox doc: <https://docs.xteko.com/#/en/>

Example App: <https://github.com/Nicify/react-jsbox-example>

## Examples

### Class

```jsx
import React from 'react'
import { render } from 'react-jsbox'

// Create React Components:
class App extends React.PureComponent {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            count: 0
        }
    }

    render() {
        const { width, height } = this.props
        const styles = {
            container: $rect(0, 0, width, height),
            text: $rect(0, height * 0.25 - 15, width, 30),
            list: $rect(0, height * 0.5, width, 140)
        }
        return (
            <view frame={styles.container}>
                <label
                    frame={styles.text}
                    align={$align.center}
                    font={$font('ArialRoundedMTBold', 26)}
                    text={String(this.state.count)}
                    autoFontSize={true}
                />
                <list
                    frame={styles.list}
                    scrollEnabled={false}
                    data={['INCREASE', 'DECREASE', 'RESET']}
                    events={{
                        didSelect: (sender, { row }, data) =>
                            this.setState({
                                count: this.state.count + [1, -1, -this.state.count][row]
                            })
                    }}
                />
            </view>
        )
    }
}

// Create JSBox root container and render the React component into it
$ui.render({
    props: {
        title: '',
        debugging: true
    },
    views: [
        {
            type: 'view',
            props: {
                id: 'root'
            },
            layout(make, view) {
                make.edges.equalTo(view.super.safeArea)
            },
            events: {
                layoutSubviews(view) {
                    const { width, height } = view.frame
                    render(<App width={width} height={height} />, view)
                }
            }
        }
    ]
})
```

#### Use ref to access JSBox view instance

```jsx
import React from 'react'
import { render } from 'react-jsbox'

class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
        this._input = React.createRef()
        this._handleTextChange = this.handleTextChange.bind(this)
    }

    handleTextChange(sender) {
        this.setState({ text: sender.text })
    }

    componentDidMount() {
        this._input.current.focus()
    }

    render() {
        const { width, height } = this.props
        const styles = {
            container: $rect(0, 0, width, height - 40),
            text: $rect(0, 64, width, 30),
            textInput: $rect(10, 160, width - 20, 48)
        }
        return (
            <view
                id="container"
                frame={styles.container}
                bgcolor={$color('#2ac')}
                events={{
                    tapped: () => this._input.current.blur()
                }}
            >
                <label
                    id={'text'}
                    frame={styles.text}
                    align={$align.center}
                    font={$font('ArialRoundedMTBold', 26)}
                    text={this.state.text || 'Hello World!'}
                    textColor={$color('#fff')}
                    autoFontSize={true}
                />
                <input
                    id={'textInput'}
                    // use ref to access JSBox view instance
                    ref={this._input}
                    frame={styles.textInput}
                    font={$font('ArialRoundedMTBold', 24)}
                    tintColor={$color('orange')}
                    placeholder={'Type here...'}
                    events={{
                        changed: this._handleTextChange
                    }}
                />
            </view>
        )
    }
}

$ui.render({
    props: {
        title: '',
        debugging: true
    },
    views: [
        {
            type: 'view',
            props: {
                id: 'root'
            },
            layout(make, view) {
                make.edges.equalTo(view.super.safeArea)
            },
            events: {
                layoutSubviews(view) {
                    const { width, height } = view.frame
                    render(<App width={width} height={height} />, view)
                }
            }
        }
    ]
})
```

### Hooks

#### useReducer

```jsx
import React, { useMemo } from 'react'
import { render } from 'react-jsbox'

function App({ width, height }) {
    const [state, dispatch] = React.useReducer(counterReducer, { count: 0 })

    const styles = useMemo(
        () => ({
            container: $rect(0, 0, width, height),
            text: $rect(0, height * 0.25 - 15, width, 30),
            list: $rect(0, height * 0.5, width, 140)
        }),
        [width, height]
    )

    return (
        <view frame={styles.container}>
            <label
                frame={styles.text}
                align={$align.center}
                font={$font('ArialRoundedMTBold', 26)}
                text={String(state.count)}
                autoFontSize={true}
            />
            <list
                frame={styles.list}
                scrollEnabled={false}
                data={['INCREASE', 'DECREASE', 'RESET']}
                events={{
                    didSelect: (sender, indexPath, data) => dispatch({ type: data })
                }}
            />
        </view>
    )
}

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'INCREASE':
            return { ...state, count: state.count + 1 }
        case 'DECREASE':
            return { ...state, count: state.count - 1 }
        case 'RESET':
            return { ...state, count: 0 }
        default:
            throw new Error()
    }
}

$ui.render({
    props: {
        title: '',
        debugging: true
    },
    views: [
        {
            type: 'view',
            props: {
                id: 'root'
            },
            layout(make, view) {
                make.edges.equalTo(view.super.safeArea)
            },
            events: {
                layoutSubviews(view) {
                    const { width, height } = view.frame
                    render(<App width={width} height={height} />, view)
                }
            }
        }
    ]
})
```

#### useEffect

In **useCache.js**

```jsx
import { useEffect, useState } from 'react'

const useCache = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const cacheValue = $cache.get(key)
        if (cacheValue === undefined) {
            $cache.set(key, initialValue)
            return initialValue
        }
        return cacheValue
    })
    useEffect(() => $cache.set(key, state))

    return [state, setState]
}

export default useCache
```

In **app.js**

```jsx
import React, { useMemo } from 'react'
import { render, useCache } from 'react-jsbox'
import useCache from './useCache'

function App({ width, height }) {
    const [count, setCount] = useCache('count', 0)

    const styles = useMemo(
        () => ({
            container: $rect(0, 0, width, height),
            text: $rect(0, height * 0.25 - 15, width, 30),
            list: $rect(0, height * 0.5, width, 140)
        }),
        [width, height]
    )

    return (
        <view frame={styles.container}>
            <label
                frame={styles.text}
                align={$align.center}
                font={$font('ArialRoundedMTBold', 26)}
                text={String(count)}
                autoFontSize={true}
            />
            <list
                frame={styles.list}
                scrollEnabled={false}
                data={['INCREASE', 'DECREASE', 'RESET']}
                events={{
                    didSelect(sender, { row }) {
                        setCount(x => x + [1, -1, -x][row])
                    }
                }}
            />
        </view>
    )
}

$ui.render({
    props: {
        title: '',
        debugging: true
    },
    views: [
        {
            type: 'view',
            props: {
                id: 'root'
            },
            layout(make, view) {
                make.edges.equalTo(view.super.safeArea)
            },
            events: {
                layoutSubviews(view) {
                    const { width, height } = view.frame
                    render(<App width={width} height={height} />, view)
                }
            }
        }
    ]
})
```

#### JsxLiteral

```javascript
const htm = require('htm')
const { createElement, useState, useMemo } = require('react')
const ReactJSBox = require('react-jsbox')
const jsx = htm.bind(createElement)

function JsxLiteralExample({ width, height }) {
    const [count, setCount] = useState(0)

    const styles = useMemo(
        () => ({
            container: $rect(0, 0, width, height),
            text: $rect(0, height * 0.25 - 15, width, 30),
            list: $rect(0, height * 0.5, width, 140)
        }),
        [width, height]
    )

    return jsx`<view frame=${styles.container}>
      <label
        frame=${styles.text}
        align=${$align.center}
        font=${$font(26)}
        text=${String(count)}
        autoFontSize=${true}
      />
      <list
        frame=${styles.list}
        scrollEnabled=${false}
        data=${['INCREASE', 'DECREASE', 'RESET']}
        events=${{
            didSelect: (sender, { row }) => {
                setCount(x => x + [1, -1, -x][row])
            }
        }}
      />
    </view>`
}

$ui.render({
    props: {
        title: 'JsxLiteralExample'
    },
    views: [
        {
            type: 'view',
            props: {
                id: 'root'
            },
            layout(make, view) {
                make.edges.equalTo(view.super.safeArea)
            },
            events: {
                layoutSubviews(view) {
                    const { width, height } = view.frame
                    ReactJSBox.render(jsx`<${JsxLiteralExample} width=${width} height=${height} />`, view)
                }
            }
        }
    ]
})
```

