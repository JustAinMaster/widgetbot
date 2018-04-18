import * as React from 'react'
import { Name, Tag, Root } from './elements'
import { Author } from '../../../types/message'

interface Props {
  author: Author
}

class MessageAuthor extends React.PureComponent<Props> {
  render() {
    const { author } = this.props
    return (
      <Root>
        <Name>{author.name}</Name>
        {author.bot && <Tag>Bot</Tag>}
      </Root>
    )
  }
}

export default MessageAuthor
