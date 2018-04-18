import * as React from 'react'
import { ago as timeAgo } from 'time-ago'

import { Root, Name, Tag, Time } from './elements'
import { Author } from '../../../types/message'

interface Props {
  author: Author
  time: number
}

class MessageAuthor extends React.PureComponent<Props> {
  render() {
    const { author, time } = this.props

    return (
      <Root>
        <Name color={author.color}>{author.name}</Name>
        {author.bot && <Tag>Bot</Tag>}
        <Time>{timeAgo(time)}</Time>
      </Root>
    )
  }
}

export default MessageAuthor
