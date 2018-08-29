import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Channel,
  ChannelVariables,
  OpenModal,
  OpenModalVariables
} from '@generated'
import Tooltip from 'rc-tooltip'
import CHANNEL from './Channel.graphql'
import OPEN_MODAL from '@queries/OpenModal.graphql'
import { Name, Topic, Join, Stretch } from '@ui/Header'

import { Root } from './elements'
import { Trans } from '@lingui/react'

const defaultInvite = 'https://discord.gg/mpMQCuj'

interface HeaderProps {
  channel: string
}

class Header extends React.PureComponent<HeaderProps> {
  render() {
    const { channel } = this.props

    return (
      <Query<Channel, ChannelVariables> query={CHANNEL} variables={{ channel }}>
        {({ loading, error, data }) => {
          const name = loading || error ? '' : data.channel.name
          const topic =
            loading || error || data.channel.__typename !== 'TextChannel'
              ? null
              : data.channel.topic

          return (
            <Root>
              <Stretch>
                <Name>{name}</Name>
                {topic && (
                  <Mutation<OpenModal, OpenModalVariables>
                    mutation={OPEN_MODAL}
                  >
                    {openModal => (
                      <Topic
                        onClick={() => {
                          openModal({
                            variables: { type: 'topic', data: topic }
                          })
                        }}
                        className="topic"
                      >
                        {topic}
                      </Topic>
                    )}
                  </Mutation>
                )}
              </Stretch>
              <Tooltip placement="bottom" overlay="Open in Discord app">
                <Join
                  className="join"
                  href={defaultInvite}
                  target="_blank"
                  // TODO: Fix join button
                  // onClick={this.join}
                >
                  <Trans id="Header.joinDiscord">Join on Discord</Trans>
                </Join>
              </Tooltip>
            </Root>
          )
        }}
      </Query>
    )
  }
}

export default Header
