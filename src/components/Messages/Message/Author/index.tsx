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
  verified(authorID: string): JSX.Element {
    if (authorID === "294916911194570754") { // samdd
      return <Verified href="https://samdd.me/" title="Developer" />
    }
    
    if (authorID === "111783814740594688") { // Voakie
      return <Verified href="https://voakie.com/" title="Developer" />
    }
    
    return null
  }

  render() {
    const { author, time } = this.props

    return (
      <Root>
        <Name color={author.color}>{author.name}</Name>
        {author.bot && <Tag>Bot</Tag>}
        {this.verified(author.id)}
        <Time>{Moment(time).calendar()}</Time>
      </Root>
    )
  }
}

export default MessageAuthor
