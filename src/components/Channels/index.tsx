import { connect } from 'fluent'
import { Channels, ChannelsVariables } from 'queries/__generated__/Channels'
import CHANNELS from 'queries/channels'
import * as React from 'react'
import { Query } from 'react-apollo'

import categorise, { Category } from './categorise'
import CCategory from './Category'
import { Categories, Root } from './elements'
import Header from './Header'
import Panel from './Panel'

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server,
    channel: state.activeChannel,
    visible: state.visible.channels
  }))
  .to(({ server, channel, visible }) => (
    <Query<Channels, ChannelsVariables> query={CHANNELS} variables={{ server }}>
      {({ loading, error, data }) => {
        const categories = new Array<Category>()
        if (!loading && !error) {
          const sorted = categorise(data.server.channels)
          categories.push(...sorted)
        }

        return (
          <Root visible={visible} className="channels">
            <Header />
            <Categories>
              {categories.map((category, i) => (
                <CCategory
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
  ))
