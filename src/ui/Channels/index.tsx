import { Channels, ChannelsVariables } from 'queries/__generated__/Channels'
import CHANNELS from 'queries/channels'
import * as React from 'react'
import { Query } from 'react-apollo'

import categorise, { ICategory } from './categorise'
import Category from './Category'
import { Categories, Root } from './elements'
import Header from './Header'
import Panel from './Panel'
import { Route, withRouter } from 'react-router'

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
            <Root visible={true} className="channels">
              <Header />
              <Categories>
                {categories.map((category, i) => (
                  <Category
                    key={i}
                    category={category}
                    activeChannel={channel}
                  />
                ))}
              </Categories>
              <Panel />
            </Root>
          )
        }}
      </Query>
    )}
  </Route>
)

export default ChannelSwitcher
