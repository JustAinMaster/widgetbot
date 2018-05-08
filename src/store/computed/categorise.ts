import { Category } from '../../types/category'
import { Channels } from '../../types/responses'

const Categorise = (channels: Channels): Category[] => {
  let categorised = [] as Category[]

  channels.forEach((channel, i) => {
    const lastCategory = categorised[categorised.length - 1]

    if (lastCategory && lastCategory.name === channel.category) {
      lastCategory.channels.push(channel)
    } else {
      categorised.push({
        name: channel.category || null,
        channels: [channel]
      })
    }
  })

  return categorised
}

export default Categorise
