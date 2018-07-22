import Color from 'color'
import { ThemeProvider as Provider } from 'emotion-theming'
import { connect } from 'fluent'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Theme as ThemeContext } from '@lib/emotion'

import {
  Theme,
  Theme_server_theme,
  ThemeVariables
} from './__generated__/Theme'
import { GlobalStyles } from './elements'
import { Route } from 'react-router'

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

const ThemeProvider = connect()
  .with(({ state, signals, props }) => ({
    url: state.url
  }))
  .to(({ url, children }) => (
    <Route path="/:server">
      {({
        match: {
          params: { server }
        }
      }) => (
        <Query<Theme, ThemeVariables> query={GET_THEME} variables={{ server }}>
          {({ loading, error, data }) => {
            let theme: Theme_server_theme = {
              __typename: 'Theme',
              colors: {
                __typename: 'Colors',
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
        </Query>
      )}
    </Route>
  ))

export default ThemeProvider
