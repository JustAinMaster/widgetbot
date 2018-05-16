import { Category } from '../../types/category'
import { Channels } from '../../types/responses'

const Categorise = (channels: Channels): Category[] => {
  let indexes = new Map<string, number>()
  let categorised = [] as Category[]

  channels.forEach((channel, i) => {
    const newCategory = {
      name: channel.category,
      channels: [channel]
    }

    if (channel.category) {
      let index = indexes.get(channel.category)
      if (typeof index === 'number') {
        categorised[index].channels.push(channel)
      } else {
        index = categorised.push(newCategory) - 1
        indexes.set(channel.category, index)
      }
    } else {
      const lastCategory = categorised[categorised.length - 1]

      if (!lastCategory.name) {
        lastCategory.channels.push(channel)
      } else {
        categorised.push(newCategory)
      }
    }
  })

  return categorised
}

export default Categorise
