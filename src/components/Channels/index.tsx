import { connect } from 'fluent'
import * as React from 'react'

import CCategory from './Category'
import { Categories, Root } from './elements'
import Header from './Header'
import Panel from './Panel'
import { Query } from 'react-apollo'
import CHANNELS, { Channels, VChannels } from 'queries/channels'
import categorise, { Category } from './categorise'

class ChannelsQuery extends Query<Channels, VChannels> {}

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server,
    channel: state.activeChannel,
    visible: state.visible.channels
  }))
  .to(({ server, channel, visible }) => (
    <ChannelsQuery query={CHANNELS} variables={{ server }}>
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
    </ChannelsQuery>
  ))
