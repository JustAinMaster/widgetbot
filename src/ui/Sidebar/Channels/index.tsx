import gql from 'graphql-tag'
import React from 'react'
import { Route } from 'react-router'
import { Query } from 'react-apollo'
import { Channels, ChannelsVariables } from './__generated__/Channels'

import { Root } from './elements'
import Category from './Category'
import categorise, { ICategory } from './categorise'

const CHANNELS = gql`
  query Channels($server: ID!) {
    server(id: $server) {
      channels {
        name
        category
        id
      }
    }
  }
`

const ChannelSwitcher = () => (
  <Route path="/:server/:channel?">
    {({
      match: {
        params: { server, channel }
      }
    }) => (
      <Query<Channels, ChannelsVariables>
        query={CHANNELS}
        variables={{ server }}
      >
        {({ loading, error, data }) => {
          const categories = new Array<ICategory>()
          if (!loading && !error) {
            const sorted = categorise(data.server.channels)
            categories.push(...sorted)
          }

          return (
            <Root className="channels">
              {categories.map((category, i) => (
                <Category key={i} category={category} activeChannel={channel} />
              ))}
            </Root>
          )
        }}
      </Query>
    )}
  </Route>
)

export default ChannelSwitcher
