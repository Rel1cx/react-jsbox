# react-jsbox-renderer

This is a `Custom Renderer` for writing `JSBox` apps in `React`.

This package is experimental **Use it at your own risk.**

npm: <https://www.npmjs.com/package/react-jsbox>

React doc: <https://reactjs.org/docs/getting-started.html>

JSBox doc: <https://docs.xteko.com>

### Hello World

``` javascript
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

![IMG_3367.PNG](https://i.loli.net/2019/04/17/5cb5fdb3e42b7.png)