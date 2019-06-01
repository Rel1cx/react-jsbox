# react-jsbox

A `Custom Renderer` for writing `JSBox` apps in `React`.

This package is experimental **Use it at your own risk.**

npm: <https://www.npmjs.com/package/react-jsbox>

React doc: <https://reactjs.org/docs/getting-started.html>

JSBox doc: <https://docs.xteko.com/#/en/quickstart/intro>

Example App: <https://github.com/Nicify/react-jsbox-example>

## Examples

### Classes

```javascript
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

let styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  list: $rect(0, 200, width, height - 280)
}

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

#### Use ref to access JSBox view instance

```javascript
import * as React from 'react'
import * as ReactJSBox from 'react-jsbox'
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

// Create React component:
class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleTextChange(sender) {
    this.setState({text: sender.text})
  }

  render() {
    return (
      <view
        id="container"
        frame={styles.container}
        bgcolor={$color('#2ac')}
        events={{
          tapped: () => this._input && this._input.blur()
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
          ref={input => {
            if (!input) return
            this._input = input
            this._input.focus()
          }}
          frame={styles.textInput}
          font={$font('ArialRoundedMTBold', 24)}
          tintColor={$color('orange')}
          placeholder={'Type here...'}
          events={{
            changed: this.handleTextChange.bind(this)
          }}
        />
      </view>
    )
  }
}

let styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  textInput: $rect(10, 160, width - 20, 48)
}

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

### React Hooks

#### useReducer

```javascript
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

let styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  list: $rect(0, 200, width, height - 280)
}

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```

#### Use Effect

In **useMotion.js**

```javascript
import {useEffect, useState} from 'react'

const defaultState = {
  attitude: {
    yaw: null,
    quaternion: {
      y: null,
      w: null,
      z: null,
      x: null
    },
    rotationMatrix: {
      m31: null,
      m21: null,
      m11: null,
      m33: null,
      m23: null,
      m13: null,
      m32: null,
      m22: null,
      m12: null
    },
    pitch: null,
    roll: null
  },
  magneticField: {
    field: {
      x: null,
      y: null,
      z: null
    },
    accuracy: null
  },
  rotationRate: {
    x: null,
    y: null,
    z: null
  },
  acceleration: {
    x: null,
    y: null,
    z: null
  },
  gravity: {
    x: null,
    y: null,
    z: null
  }
}

const useMotion = (initialState = defaultState) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const handler = resp => {
      setState(resp)
    }

    $motion.startUpdates({
      interval: 1 / 30,
      handler
    })

    return () => $motion.stopUpdates()
  }, [])

  return [state]
}

export default useMotion
```

In **app.js**

```javascript
import React from 'react'
import ReactJSBox from 'react-jsbox'
import rootContainer from './Containers/root'
import useMotion from './hooks/useMotion'
const {width, height} = $device.info.screen

const App = () => {
  const [state] = useMotion()

  return (
    <view frame={styles.container}>
      <text
        frame={styles.container}
        font={$font(12)}
        text={JSON.stringify(state, null, 2)}
        autoFontSize={true}
      />
    </view>
  )
}

let styles = {
  container: $rect(0, 0, width, height - 40)
}

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
```
