import { State } from '../types'

export function activeChannel(state: State) {
  let activeChannel = null
  if (state.channels && state.activeChannel) {
    state.channels.map(channel => {
      if (channel.id === state.activeChannel) {
        activeChannel = channel
      }
    })
  }
  return activeChannel
}
