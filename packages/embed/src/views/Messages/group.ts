import { Messages_channel_TextChannel_messages } from '@generated/Messages'
import memoize from 'memoizee'

/**
 * Compares whether a message should go in a group
 */
const compareGroupability = (
  a: Messages_channel_TextChannel_messages,
  b: Messages_channel_TextChannel_messages
) =>
  a.__typename === 'JoinMessage' ||
  // If the ID is not equal to the previous message
  a.author.id !== b.author.id ||
  // If the name is not equal to the previous message
  a.author.username !== b.author.username ||
  // If the interval between the previous message is greater than 5 mins
  b.createdAt - a.createdAt > 5 * 60 * 1000

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
