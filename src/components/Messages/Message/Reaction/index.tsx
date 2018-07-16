import { Messages_server_channel_messages_TextMessage_reactions } from 'queries/__generated__/Messages'
import Tooltip from 'rc-tooltip'
import * as React from 'react'

import { Count, Emoji, Root } from './elements'

const Reaction = ({
  name,
  id,
  count
}: Messages_server_channel_messages_TextMessage_reactions) => (
  <Tooltip placement="top" overlay={`:${name}:`} mouseEnterDelay={0.5}>
    <span>
      <Root className="reaction">
        {id ? (
          <Emoji src={`https://cdn.discordapp.com/emojis/${id}`} />
        ) : (
          <Emoji className="reaction-emoji">{name}</Emoji>
        )}
        <Count className="reaction-count">{count}</Count>
      </Root>
    </span>
  </Tooltip>
)

export default Reaction
