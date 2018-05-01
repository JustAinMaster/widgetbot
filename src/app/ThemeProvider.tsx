import { ThemeProvider as Provider } from 'emotion-theming'
import { connect } from 'fluent'
import * as React from 'react'

const ThemeProvider = connect()
  .with(({ state, signals, props }) => ({
    theme: state.theme
  }))
  .to(props => <Provider theme={props.theme}>{props.children}</Provider>)

export default ThemeProvider
