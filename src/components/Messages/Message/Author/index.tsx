import * as React from 'react'
import * as Moment from 'moment'

import { Root, Name, Tag, Time } from './elements'
import { Author } from '../../../../types/message'

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
        <Time>{Moment(time).calendar()}</Time>
      </Root>
    )
  }
}

export default MessageAuthor
