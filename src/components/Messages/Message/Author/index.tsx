import * as Moment from 'moment'
import * as React from 'react'

import { Author } from '../../../../types/message'
import parseUsername from '../parseUsername'
import { Sysadmin, Tag, Verified } from './Badges'
import { Name, Root, Time } from './elements'

interface Props {
  author: Author
  time: number
}

export const Timestamp = ({ time }: { time: number }) => (
  <Time className="time">{Moment(time).calendar()}</Time>
)

class MessageAuthor extends React.PureComponent<Props> {
  tags() {
    const { author } = this.props

    return (
      <React.Fragment>
        {author.type === 'bot' && <Tag className="bot">Bot</Tag>}
        {author.type === 'guest' && <Tag className="guest">Guest</Tag>}
        {author.type === 'sysadmin' && (
          <Sysadmin className="sysadmin" title="Sysadmin" />
        )}

        <this.verified id={author.id} />
      </React.Fragment>
    )
  }

  render() {
    const { author, time } = this.props
    const { name } = parseUsername(author.name)

    return (
      <Root className="author">
        <Name color={author.color} className="name">
          {name}
        </Name>
        {this.tags()}
        <Timestamp time={time} />
      </Root>
    )
  }

  verified({ id }: { id: string }) {
    if (id === '294916911194570754') {
      // samdd
      return <Verified href="https://samdd.me/" title="Developer" />
    }

    if (id === '111783814740594688') {
      // Voakie
      return <Verified href="https://voakie.com/" title="Developer" />
    }

    return null
  }
}

export default MessageAuthor
