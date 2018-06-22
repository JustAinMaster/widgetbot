import controller from '../../controllers/cerebral'

const resolveMessage = (content: string) => {
  let result = content

  // Resolve channel mentions
  {
    const channels = controller.state.channels.entries()

    channels.forEach(
      ([id, { name }]) => (result = result.split(`#${name}`).join(`<#${id}>`))
    )
  }

  return result
}

export default resolveMessage
