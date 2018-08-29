import MESSAGES from './Messages.graphql'
import {
  Messages,
  MessagesVariables,
  Messages_channel_TextChannel_messages
} from '@generated'
import Message from '@ui/Message'
import { Info, Loading, NoMessages } from '@ui/Overlays'
import ErrorAhoy from '@ui/Overlays/ErrorAhoy'
import Wrapper from '@ui/Wrapper'
import Chat from '@ui/Chat'
import { ApolloError } from 'apollo-client'
import autobind from 'autobind-decorator'
import produce from 'immer'
import * as React from 'react'
import { ChildProps, graphql, Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import {
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  AutoSizer
} from 'react-virtualized'
import { MessagesWrapper, Scroller } from './elements'
import { formatError, groupMessages } from './utils'

import Header from './Header'

type InputProps = RouteComponentProps<{
  guild: string
  channel: string
}>

interface OwnProps {
  error: ApolloError
  loading: boolean
  ready: boolean

  fetchMessages(): Promise<void>

  messages: Messages_channel_TextChannel_messages[]
  groupedMessages: Messages_channel_TextChannel_messages[][]
}

const withMessages = graphql<InputProps, Messages, MessagesVariables, OwnProps>(
  MESSAGES,
  {
    options({ match }) {
      const { channel } = match.params

      return {
        fetchPolicy: 'cache-and-network',
        variables: {
          channel
        }
      }
    },
    props({ data, ownProps }) {
      const { channel } = ownProps.match.params

      const messages =
        (data &&
          data.channel &&
          data.channel.__typename === 'TextChannel' &&
          data.channel.messages) ||
        []

      return {
        loading: data.loading,
        error: data.error,

        ready:
          !data.loading ||
          (data && data.channel && data.channel.id === channel),

        async fetchMessages() {
          const [firstMessage] = messages
          if (!firstMessage) return

          const before = firstMessage.id
          console.log('getting before', before)

          await data.fetchMore({
            query: MESSAGES,
            variables: { channel, before },
            updateQuery: (prev, { fetchMoreResult }) =>
              produce(prev, draftState => {
                draftState.channel.messages = [
                  ...fetchMoreResult.channel.messages,
                  ...draftState.channel.messages
                ]
              })
          })
        },

        messages,
        groupedMessages: groupMessages(messages)
      }
    }
  }
)

type Props = ChildProps<InputProps & OwnProps, Messages>

interface State {
  scrollToIndex: number
}

@autobind
class MessagesView extends React.PureComponent<Props, State> {
  private loadingMore = false
  private readyToLoadMore = false
  private width: number

  private cache = new CellMeasurerCache({
    fixedWidth: true,
    keyMapper: this.getKey
  })

  public state = {
    scrollToIndex: -1
  }

  private getKey(rowIndex: number) {
    const { groupedMessages, match } = this.props
    const group = groupedMessages[rowIndex]
    const ids = group ? group.map(m => m.id).join(':') : 'placeholder'

    // Given the following data points, the group should be identical
    const identifier = [
      match.params.guild,
      match.params.channel,
      ids,
      this.width
    ]

    return identifier.join('$')
  }

  private renderRow({ index, key, style, parent }) {
    const { groupedMessages } = this.props

    return groupedMessages[index] ? (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        rowIndex={index}
      >
        <Message style={style} messages={groupedMessages[index]} />
      </CellMeasurer>
    ) : null
  }

  public async loadMoreRows() {
    if (this.loadingMore) return

    const prevMessageCount = this.props.groupedMessages.length
    this.loadingMore = true
    await this.props.fetchMessages()

    this.loadingMore = false

    // Clear the cache for the message at the top
    // could be a message added into its group
    this.cache.clear(2, 0)

    this.setState({
      scrollToIndex: this.props.groupedMessages.length - prevMessageCount
    })
  }

  public isRowLoaded({ index }) {
    const loadMore = index === 0

    if (loadMore) {
      if (this.readyToLoadMore) return false
      this.readyToLoadMore = true
    }

    return true
  }

  messages() {
    const { ready, groupedMessages } = this.props

    if (!ready) return <Loading />
    if (!groupedMessages.length)
      return (
        <NoMessages className="no-messages">
          <Info>No messages to be seen here</Info>
        </NoMessages>
      )

    const count = groupedMessages.length

    const { scrollToIndex } = this.state
    const index = scrollToIndex < 0 ? count + scrollToIndex : scrollToIndex

    return (
      <MessagesWrapper className="messages">
        <AutoSizer>
          {({ width, height }) => {
            this.width = width

            return (
              <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={Infinity}
                threshold={1}
              >
                {({ onRowsRendered, registerChild }) => (
                  <Scroller
                    width={width}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    listRef={registerChild}
                    deferredMeasurementCache={this.cache}
                    rowHeight={this.cache.rowHeight}
                    rowRenderer={this.renderRow}
                    rowCount={count + 2}
                    scrollToIndex={index}
                    scrollToAlignment="start"
                    overscanRowCount={5}
                  />
                )}
              </InfiniteLoader>
            )
          }}
        </AutoSizer>
      </MessagesWrapper>
    )
  }

  render() {
    const { error } = this.props
    const { channel } = this.props.match.params

    if (error) return <ErrorAhoy message={formatError(error)} />

    return (
      <Wrapper>
        <Header channel={channel} />
        <this.messages />
        <Chat />
      </Wrapper>
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

  // @autobind
  // async join(event) {
  //   const { channel } = this.props.match.params
  //   const { window, document } = self.open()

  //   event.preventDefault()

  //   document.body.style.backgroundColor = '#36393F'
  //   document.title = `Join Discord server`

  //   // Attempt to get an invite for the specified channel
  //   // if it fails, fallback to one on a random channel
  //   try {
  //     const invite = await fetchInvite(channel)
  //     document.location.href = invite
  //   } catch (e) {
  //     window.close()
  //     addNotification({
  //       level: 'error',
  //       title: 'Unable to Join',
  //       message:
  //         'WidgetBot does not have permissions to invite you to this server...',
  //       autoDismiss: 5000
  //     })
  //   }
  // }

  // /**
  //  * Captures scroll positions from channels, so when
  //  * you switch channels, your position is retained
  //  */
  // positions = new Map() as Map<string, number>
  // position = -1
  // scrollable

  // componentWillReceiveProps(nextProps) {
  //   const prevMatch = this.props.match.params
  //   const nextMatch = nextProps.match.params

  //   if (prevMatch.channel !== nextMatch.channel) {
  //     if (this.scrollable) {
  //       // Record scroll position of the current channel
  //       this.positions.set(prevMatch.channel, this.scrollable.getScrollTop())

  //       // Extract the last scroll position of the next channel
  //       if (this.positions.has(nextMatch.channel)) {
  //         this.position = this.positions.get(nextMatch.channel)
  //       } else {
  //         this.position = -1
  //       }
  //     }
  //   }
  // }

  // scroll(ref) {
  //   if (!ref) return
  //   this.scrollable = ref

  //   if (this.scrollable) {
  //     if (this.position === -1) {
  //       this.scrollable.scrollToBottom()
  //     } else {
  //       this.scrollable.scrollTop(this.position)
  //     }
  //   }
  // }
}

export default withMessages(MessagesView)
