<h1 align="center">Welcome to react-jsbox 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.57-blue.svg?cacheSeconds=2592000" />
</p>

> A Custom React renderer for writing JSBox apps in React.

This package is experimental, **Use it at your own risk.**

npm: <https://www.npmjs.com/package/react-jsbox>

React doc: <https://reactjs.org/docs/getting-started.html>

JSBox doc: <https://docs.xteko.com>

Example App: <https://github.com/Nicify/react-jsbox-example>

## Examples

### Class

```jsx
import React from 'react'
import ReactJSBox from 'react-jsbox'
const {width, height} = $device.info.screen

// Create a root Container:
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
      }
    }
  ]
})

// Create React Components:
class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this._listTemplate = {
      props: {
        bgcolor: $color('#fff')
      },
      views: [
        {
          type: 'label',
          props: {
            bgcolor: $color('#474b51'),
            textColor: $color('#abb2bf'),
            align: $align.center,
            font: $font('iosevka', 24)
          },
          layout: $layout.fill
        }
      ]
    }
  }

  render() {
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
          radius={10}
          bgcolor={$color('#ededed')}
          data={['INCREASE', 'DECREASE', 'RESET']}
          template={this._listTemplate}
          events={{
            didSelect: (sender, {row}, data) =>
              this.setState({
                count: this.state.count + [1, -1, -this.state.count][row]
              })
          }}
        />
      </view>
    )
  }
}

const styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  list: $rect(0, 200, width, height - 280)
}

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

#### Use ref to access JSBox view instance

```jsx
import * as React from 'react'
import * as ReactJSBox from 'react-jsbox'
const { width, height } = $device.info.screen

// Create a root Container:
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
      }
    }
  ]
})

// Create React component:
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

const styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  textInput: $rect(10, 160, width - 20, 48)
}

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

### Hooks

#### useReducer

```jsx
import React from 'react'
import ReactJSBox from 'react-jsbox'
const {width, height} = $device.info.screen

// Create a root Container:
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
      }
    }
  ]
})

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {...state, count: state.count + 1}
    case 'DECREASE':
      return {...state, count: state.count - 1}
    case 'RESET':
      return {...state, count: 0}
    default:
      throw new Error()
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(counterReducer, {count: 0})
  const listTemplate = {
    props: {
      bgcolor: $color('#fff')
    },
    views: [
      {
        type: 'label',
        props: {
          bgcolor: $color('#474b51'),
          textColor: $color('#abb2bf'),
          align: $align.center,
          font: $font('iosevka', 24)
        },
        layout: $layout.fill
      }
    ]
  }

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
        radius={10}
        bgcolor={$color('#ededed')}
        data={['INCREASE', 'DECREASE', 'RESET']}
        template={listTemplate}
        events={{
          didSelect: (sender, indexPath, data) => dispatch({type: data})
        }}
      />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  list: $rect(0, 200, width, height - 280)
}

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

#### useEffect

In **useCache.js**

```jsx
import {useEffect, useState} from 'react'

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
import React from 'react'
import ReactJSBox from 'react-jsbox'
import useCache from './useCache'
import rootContainer from './Containers/root'
const {width, height} = $device.info.screen

const App = () => {
  const [count, setCount] = useCache('count', 0)
  const listTemplate = {
    views: [
      {
        type: 'label',
        props: {
          bgcolor: $color('#474b51'),
          textColor: $color('#abb2bf'),
          align: $align.center,
          font: $font('iosevka', 24)
        },
        layout: $layout.fill
      }
    ]
  }

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
        radius={5}
        bgcolor={$color('#ededed')}
        data={['INCREASE', 'DECREASE', 'RESET']}
        template={listTemplate}
        events={{
          didSelect: (sender, {row}, data) => setCount(count => count + [1, -1, -count][row])
        }}
      />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  list: $rect(0, (height - 40) * 0.3, width, 132)
}

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

#### JsxLiteral

```javascript
const htm = require("htm")
const { createElement, useState } = require("react")
const ReactJSBox = require("react-jsbox")
const jsx = htm.bind(createElement)
const { width, height } = $device.info.screen

const listTemplate = {
    views: [
        {
            type: "label",
            props: {
                bgcolor: $color("#474b51"),
                textColor: $color("#abb2bf"),
                align: $align.center,
                font: $font("iosevka", 24)
            },
            layout: $layout.fill
        }
    ]
}

$ui.render({
    props: {
        title: "JsxLiteralExample"
    },
    views: [
        {
            type: "view",
            props: {
                id: "root"
            },
            layout: $layout.fill
        }
    ]
})

function JsxLiteralExample() {
    const [count, setCount] = useState(0);
    return jsx`<view frame=${styles.container}>
      <label
        frame=${styles.text}
        align=${$align.center}
        font=${$font(26)}
        text=${String(count)}
        autoFontSize=${true}
      />
      <progress
      frame=${$rect(15, 150, width - 30, 30)}
      value=${0.5 + count * 0.01}
      }}
      />
      <list
        frame=${styles.list}
        scrollEnabled=${false}
        radius=${5}
        bgcolor=${$color("#ededed")}
        data=${["INCREASE", "DECREASE", "RESET"]}
        template=${listTemplate}
        events=${{
            didSelect: (sender, { row }, data) => {
                setCount(count => count + [1, -1, -count][row])
            }
        }}
      />
    </view>`
}

const styles = {
    container: $rect(0, 0, width, height),
    text: $rect(0, 64, width, 30),
    list: $rect(0, width * 0.5, width, 132)
}

ReactJSBox.render(jsx`<${JsxLiteralExample} />`, $("root"))
```

## Author

👤 **Eva1ent**

- Github: [@Nicify](https://github.com/Nicify)

## Show your support

Give a ⭐️ if this project helped you !
