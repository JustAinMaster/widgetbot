import { ThemeProvider as Provider } from 'emotion-theming'
import { connect } from 'fluent'
import * as Color from 'kolor'
import * as React from 'react'

const ThemeProvider = connect()
  .with(({ state, signals, props }) => ({
    theme: {
      ...state.theme,
      colors: {
        ...state.theme.colors,
        _primary: Color(state.theme.colors.primary),
        _background: Color(state.theme.colors.background),
        _accent: Color(state.theme.colors.accent)
      },
      url: state.url
    }
  }))
  .to(props => <Provider theme={props.theme}>{props.children}</Provider>)

export default ThemeProvider
