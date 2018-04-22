import { messages } from '../../types/message'

/**
 * Groups messages into their array form.
 * @example
 * // Demo input
 * [{ author: 1 }, { author: 2 }, { author: 1 }, { author: 1 }]
 * // Output
 * [[{ author: 1 }], [{ author: 2 }], [{ author: 1 }, { author: 1 }]]
 * @param messages The messages to group
 */
const Group = (messages: messages): messages[] => {
  const result = []
  let group = null
  let previous = []

  messages.map((message, i) => {
    if (
      previous[0] !== message.author.id ||
      previous[1] !== message.author.name ||
      group === null
    ) {
      group = result.push([]) - 1
      previous = [message.author.id, message.author.name]
    }
    result[group].push(message)
  })

  return result
}

export default Group
