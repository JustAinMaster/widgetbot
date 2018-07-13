import { connect } from 'fluent'
import * as React from 'react'
import { Query } from 'react-apollo'
import CHANNEL, { ChannelData, VChannel } from './query.gql'
import ChannelLink from 'shared/Channel/link'

interface Payload {
  name: string
}

interface Props {
  id: string
  className?: string
  children: (channel: Payload) => any
}

class ChannelQuery extends Query<ChannelData, VChannel> {}

const Channel = connect<Props>()
  .with(({ state, signals, props }) => ({
    server: state.server
  }))
  .to(({ server, id: channel, children, className }) => (
    <ChannelQuery query={CHANNEL} variables={{ server, channel }}>
      {({ error, loading, data }) => {
        const success = !error && !loading && data && data.server
        const name = success ? data.server.channel.name : 'deleted-channel'

        return (
          <ChannelLink id={channel} className={className}>
            {children({ name })}
          </ChannelLink>
        )
      }}
    </ChannelQuery>
  ))

export default Channel

export { Hash } from 'shared/Channel/elements'
export { default as ChannelLink } from 'shared/Channel/link'
