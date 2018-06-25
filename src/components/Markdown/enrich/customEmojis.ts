import controller from '../../../controllers/cerebral'

const customEmojis = (message: string) => {
  let result = message

  controller.state.emojis
    .values()
    .forEach(({ category, emoji, keywords: [keyword] }) => {
      console.log(category, emoji, keyword, result)

      if (category === 'custom')
        result = result.split(`:${keyword}:`).join(`<:${keyword}:${emoji}>`)
    })

  return result
}

export default customEmojis
