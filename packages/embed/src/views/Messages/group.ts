import { Messages_channel_TextChannel_messages } from '@generated/Messages'
import memoize from 'memoizee'

/**
 * Compares whether a message should go in a group
 */
const compareGroupability = (
  a: Messages_channel_TextChannel_messages,
  b: Messages_channel_TextChannel_messages
) => {
  const nonGroupable = a.__typename === 'JoinMessage'
  const differentAuthor =
    a.author.id !== b.author.id || a.author.username !== b.author.username
  const staleGroup = b.createdAt - a.createdAt > 5 * 60 * 1000

  return nonGroupable || differentAuthor || staleGroup
}

/**
 * Groups messages into an array
 * @example
 * [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 1 }]
 * // Output
 * [[{ id: 1 }], [{ id: 2 }], [{ id: 1 }, { id: 1 }]]
 * @param messages The messages to group
 */
const Group = <Group extends Messages_channel_TextChannel_messages[]>(
  messages: Group
): Group[] => {
  const result = new Array<Group>()
  let group = null
  let previous: Messages_channel_TextChannel_messages

  messages.forEach((message, i) => {
    if (group === null || compareGroupability(previous, message)) {
      group = result.push([] as Group) - 1
    }
    result[group].push(message)
    previous = message
  })

  return result
}

export default memoize(Group, {
  normalizer: ([messages]) => JSON.stringify(messages)
})
