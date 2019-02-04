import config from 'config'

import { IArgs } from '../types'

const isAdmin = (id: string) => config.discord.admins.includes(id)
const context = (require as any).context('./commands', true)
const shift = (payload: string) => {
  const arr = payload.split(' ')
  arr.shift()
  return arr.join(' ')
}

async function Invite({ payload, message }: IArgs) {
  if (!isAdmin(message.author.id))
    return message.reply(
      `Unauthorised! only server admins can use this command`
    )

  if (context.keys().includes(`./${payload.split(' ')[0]}`)) {
    return context(`./${payload.split(' ')[0]}`).default({
      payload: shift(payload),
      message
    })
  }

  message.reply(
    `Unable to locate command! Available commands:` +
      '```json\n' +
      JSON.stringify(context.keys(), null, 2) +
      '```'
  )
}

export default Invite
