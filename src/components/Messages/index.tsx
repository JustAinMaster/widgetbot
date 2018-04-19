import * as React from 'react'
import { graphql, DataValue } from 'react-apollo'
import gql from 'graphql-tag'
import { messages } from '../../types/message'

import Message from '../Message'
import { Root } from './elements'

interface Props {
  data: DataValue<{ messages: messages }>
}

class Messages extends React.PureComponent<Props, any> {
  render() {
    const { messages } = this.props.data

    return messages ? (
      <Root>
        {messages.map(group => <Message messages={group} key={group[0].id} />)}
      </Root>
    ) : (
      <span>LOADING</span>
    )
  }
}

export default graphql(gql`
  query MessageQuery {
    messages {
      timestamp
      id
      content
      author {
        name
        avatar
        bot
        color
      }
    }
  }
`)(Messages)
