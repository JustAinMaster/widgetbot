import controller from '../../../../lib/cerebral'

const mentions = (message: string) => {
  let result = message

  controller.state.channels
    .entries()
    .forEach(
      ([id, { name }]) => (result = result.split(`#${name}`).join(`<#${id}>`))
    )

  controller.state.members
    .entries()
    .forEach(
      ([id, { tag }]) => (result = result.split(`@${tag}`).join(`<@${id}>`))
    )

  return result
}

export default mentions
