import { ThemeProvider as Provider } from 'emotion-theming'
import { connect } from 'fluent'
import gql from 'graphql-tag'
import * as Color from 'kolor'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Theme as ThemeContext } from 'typed-emotion'

import { Theme } from '../store/types'
import { GlobalStyles } from './elements'

const GET_THEME = gql`
  query Theme($server: ID!) {
    server(id: $server) {
      theme {
        css
        colors {
          primary
          accent
          background
        }
      }
    }
  }
`

interface Data {
  server: {
    theme: Theme
  }
}

interface Variables {
  server: string
}

class ThemeQuery extends Query<Data, Variables> {}

const ThemeProvider = connect()
  .with(({ state, signals, props }) => ({
    server: state.server,
    url: state.url
  }))
  .to(({ server, url, children }) => (
    <ThemeQuery query={GET_THEME} variables={{ server }}>
      {({ loading, error, data }) => {
        let theme: Theme = {
          colors: {
            primary: '#fff',
            accent: '#7289da',
            background: '#36393E'
          },
          css: ``
        }

        if (!error && !loading && data.server.theme) {
          theme = {
            ...theme,
            ...data.server.theme
          }
        }

        const themeContext: ThemeContext = {
          ...theme,
          colors: {
            ...theme.colors,
            _primary: Color(theme.colors.primary),
            _background: Color(theme.colors.background),
            _accent: Color(theme.colors.accent)
          },
          url: url || {}
        }

        GlobalStyles.inject(themeContext)

        return <Provider theme={themeContext}>{children}</Provider>
      }}
    </ThemeQuery>
  ))

export default ThemeProvider
