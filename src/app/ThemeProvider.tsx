import * as React from 'react'
import { connect } from 'fluent'
import { ThemeProvider as Provider } from 'emotion-theming'

const ThemeProvider = connect()
  .with(({ state, signals, props }) => ({
    theme: state.theme
  }))
  .to(props => <Provider theme={props.theme}>{props.children}</Provider>)

export default ThemeProvider
