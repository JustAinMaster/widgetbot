import controller from '../../../../lib/cerebral'

const customEmojis = (message: string) => {
  let result = message

  controller.state.emojis
    .values()
    .forEach(({ category, emoji, keywords: [keyword] }) => {
      if (category === 'custom')
        result = result.split(`:${keyword}:`).join(`<:${keyword}:${emoji}>`)
    })

  return result
}

export default customEmojis
