import { connect } from 'fluent'
import { addNotification } from 'notify'
import { Channel, ChannelVariables } from 'queries/__generated__/Channel'
import { Messages, MessagesVariables } from 'queries/__generated__/Messages'
import CHANNEL from 'queries/channel'
import MESSAGES from 'queries/messages'
import Tooltip from 'rc-tooltip'
import * as React from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { fetchInvite } from 'socket-io'

import Header, { Name, Topic } from '../Header'
import { Join, Stretch } from '../Header/elements'
import { Info, Loading, NoMessages } from '../Overlays'
import ErrorAhoy from '../Overlays/ErrorAhoy'
import Wrapper from '../Wrapper'
import { Scroller } from './elements'
import Group from './group'
import Message from './Message'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router'

const defaultInvite = 'https://discord.gg/mpMQCuj'

class MessagesView extends React.PureComponent<
  RouteComponentProps<{ server: string; channel: string }>
> {
  private cache = new CellMeasurerCache({
    fixedWidth: true
  })

  header = () => {
    const { server, channel } = this.props.match.params
    return (
      <Query<Channel, ChannelVariables>
        query={CHANNEL}
        variables={{ server, channel }}
      >
        {({ loading, error, data }) => {
          const name = loading || error ? '' : data.server.channel.name
          const topic = loading || error ? null : data.server.channel.topic

          return (
            <Header>
              <Stretch>
                <Name>{name}</Name>
                {topic && <Topic className="topic">{topic}</Topic>}
              </Stretch>
              <Tooltip placement="bottom" overlay="Open in Discord app">
                <Join
                  className="join"
                  href={defaultInvite}
                  target="_blank"
                  onClick={this.join.bind(this)}
                >
                  <FormattedMessage id="header.join" />
                </Join>
              </Tooltip>
            </Header>
          )
        }}
      </Query>
    )
  }

  renderRow = messages => ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <Message style={style} messages={messages[index]} />
      </CellMeasurer>
    )
  }

  render() {
    const { server, channel } = this.props.match.params
    return (
      <Query<Messages, MessagesVariables>
        query={MESSAGES}
        variables={{ server, channel }}
        fetchPolicy="cache-and-network"
        // pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (error) {
            let message = error.message

            if (error.graphQLErrors.length) {
              const [err] = error.graphQLErrors
              if (err.name && err.message) {
                message = `${err.message} (${err.name})`
              }
            }

            return <ErrorAhoy message={message} />
          }

          let content = <Loading />

          if (
            !loading ||
            (data && data.server && data.server.channel.id === channel)
          ) {
            const grouped = Group(data.server.channel.messages)

            content = grouped.length ? (
              <AutoSizer>
                {({ width, height }) => (
                  <Scroller
                    width={width}
                    height={height - 47}
                    deferredMeasurementCache={this.cache}
                    rowHeight={this.cache.rowHeight}
                    rowRenderer={this.renderRow(grouped)}
                    rowCount={grouped.length}
                    scrollToIndex={grouped.length - 1}
                    overscanRowCount={3}
                  />
                )}
              </AutoSizer>
            ) : (
              <NoMessages className="no-messages">
                <Info>No messages to be seen here</Info>
              </NoMessages>
            )
          }

          return (
            <Wrapper>
              <this.header />
              {content}
            </Wrapper>
          )
        }}
      </Query>
    )

    // return content ? (
    //   <Wrapper>
    //     {/*header*/}
    //     {content}
    //     {/*channel && channel.permissions.SEND_MESSAGES && <Chat />*/}
    //   </Wrapper>
    // ) : (
    //   <ErrorAhoy />
    // )
  }

  async join(event: Event) {
    const { channel } = this.props.match.params
    const { window, document } = self.open()

    event.preventDefault()

    document.body.style.backgroundColor = '#36393F'
    document.title = `Join Discord server`

    // Attempt to get an invite for the specified channel
    // if it fails, fallback to one on a random channel
    try {
      const invite = await fetchInvite(channel)
      document.location.href = invite
    } catch (e) {
      window.close()
      addNotification({
        level: 'error',
        title: 'Unable to Join',
        message:
          'WidgetBot does not have permissions to invite you to this server...',
        autoDismiss: 5000
      })
    }
  }

  /**
   * Captures scroll positions from channels, so when
   * you switch channels, your position is retained
   */
  positions = new Map() as Map<string, number>
  position = -1
  scrollable

  componentWillReceiveProps(nextProps) {
    const { channel } = this.props.match.params
    const nextChannel = nextProps.match.params.channel

    if (!channel || !this.scrollable) return

    if (nextChannel !== channel) {
      // Record scroll position of the current channel
      this.positions.set(channel, this.scrollable.getScrollTop())

      // Extract the last scroll position of the next channel
      if (this.positions.has(nextChannel)) {
        this.position = this.positions.get(nextChannel)
      } else {
        this.position = -1
      }
    }
  }

  scroll(ref) {
    if (!ref) return
    this.scrollable = ref

    if (this.scrollable) {
      if (this.position === -1) {
        this.scrollable.scrollToBottom()
      } else {
        this.scrollable.scrollTop(this.position)
      }
    }
  }
}

export default MessagesView
