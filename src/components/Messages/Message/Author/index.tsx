import * as React from 'react'
import * as Moment from 'moment'

import { Root, Name, Time } from './elements'
import { Author } from '../../../../types/message'

import { Tag, Verified } from './Badges'

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
        {author.id === '294916911194570754' && (
          <Verified href="https://samdd.me/" title="Developer" />
        )}
        <Time>{Moment(time).calendar()}</Time>
      </Root>
    )
  }
}

export default MessageAuthor
