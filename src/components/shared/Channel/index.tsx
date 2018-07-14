import { connect } from 'fluent'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'

import { ChannelInfo, ChannelInfoVariables } from './__generated__/ChannelInfo'
import ChannelLink from './link'

const CHANNEL = gql`
  query ChannelInfo($server: ID!, $channel: ID!) {
    server(id: $server) {
      channel(id: $channel) {
        name
        id
      }
    }
  }
`

interface Props {
  id: string
  className?: string
  children: (
    channel: {
      name: string
    }
  ) => any
}

const Channel = connect<Props>()
  .with(({ state, signals, props }) => ({
    server: state.server
  }))
  .to(({ server, id: channel, children, className }) => (
    <Query<ChannelInfo, ChannelInfoVariables>
      query={CHANNEL}
      variables={{ server, channel }}
    >
      {({ error, loading, data }) => {
        const success = !error && !loading && data && data.server
        const name = success ? data.server.channel.name : 'deleted-channel'

        return (
          <ChannelLink id={channel} className={className}>
            {children({ name })}
          </ChannelLink>
        )
      }}
    </Query>
  ))

export default Channel

export { Hash } from 'shared/Channel/elements'
export { default as ChannelLink } from 'shared/Channel/link'
