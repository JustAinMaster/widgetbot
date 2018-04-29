import { State } from '../types'

export function activeChannel(state: State) {
  return state.channels.get(state.activeChannel) || null
}
