import autobind from 'autobind-decorator'
import { addNotification } from 'notify'
import { Channel, ChannelVariables } from 'queries/__generated__/Channel'
import { Messages, MessagesVariables } from 'queries/__generated__/Messages'
import CHANNEL from 'queries/channel'
import MESSAGES, { MESSAGE_SUBSCRIPTION } from 'queries/messages'
import Tooltip from 'rc-tooltip'
import produce from 'immer'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { RouteComponentProps } from 'react-router'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader
} from 'react-virtualized'
import { fetchInvite } from 'socket-io'
import { NewMessages } from 'queries/__generated__/NewMessages'

import Header, { Name, Topic } from '../Header'
import { Join, Stretch } from '../Header/elements'
import { Info, Loading, NoMessages } from '../Overlays'
import ErrorAhoy from '../Overlays/ErrorAhoy'
import Wrapper from '../Wrapper'
import { Scroller } from './elements'
import Group from './group'
import Message from './Message'
import { OPEN_MODAL } from 'queries/modal'
import { OpenModal } from 'queries/__generated__/OpenModal'
import { OpenModalVariables } from '../Channels/Panel/__generated__/OpenModal'

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
                  onClick={this.join}
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
    return messages[index] ? (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <Message style={style} messages={messages[index]} />
      </CellMeasurer>
    ) : null
  }

  isRowLoaded = messages => ({ index }) => {
    return !!messages[index]
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
        {({ loading, error, data, subscribeToMore }) => {
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
            this.cache.clearAll()

            content = grouped.length ? (
              <AutoSizer>
                {({ width, height }) => (
                  <InfiniteLoader
                    isRowLoaded={this.isRowLoaded(grouped)}
                    loadMoreRows={async (...args) => {
                      console.log('called', args)
                      return []
                    }}
                    rowCount={300}
                  >
                    {({ onRowsRendered, registerChild }) => (
                      <Scroller
                        width={width}
                        height={height - 47}
                        onRowsRendered={onRowsRendered}
                        listRef={registerChild}
                        deferredMeasurementCache={this.cache}
                        rowHeight={this.cache.rowHeight}
                        rowRenderer={this.renderRow(grouped)}
                        rowCount={300}
                        scrollToIndex={grouped.length - 1}
                        scrollToAlignment="start"
                        overscanRowCount={3}
                      />
                    )}
                  </InfiniteLoader>
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
              <button
                onClick={() => {
                  subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { server, channel },
                    updateQuery: (prev, payload) =>
                      produce(prev, (draftState: Messages) => {
                        const {
                          data
                        }: {
                          data: NewMessages
                        } = payload.subscriptionData as any

                        draftState.server.channel.messages.push(
                          data.message.message
                        )
                      })
                  })
                }}
              >
                this one
              </button>
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

  @autobind
  async join(event) {
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
    const prevMatch = this.props.match.params
    const nextMatch = nextProps.match.params

    if (prevMatch.channel !== nextMatch.channel) {
      if (this.scrollable) {
        // Record scroll position of the current channel
        this.positions.set(prevMatch.channel, this.scrollable.getScrollTop())

        // Extract the last scroll position of the next channel
        if (this.positions.has(nextMatch.channel)) {
          this.position = this.positions.get(nextMatch.channel)
        } else {
          this.position = -1
        }
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
