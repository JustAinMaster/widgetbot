import { Context, BranchContext } from 'fluent'
import { Channel } from '../../types/responses'
import Log from 'logger';

export { default as GraphQL } from './graphql'

/**
 * Selects a server (and or) channel and returns a branch
 * from whether the selected server / channel is already cached
 */
export function select({
  state,
  props,
  path
}: BranchContext<
  {
    cached: boolean
    uncached: boolean
  },
  { server?: string; channel?: string }
>) {
  let cached = false

  // If the server field has an icon entry, it's cached
  if (props.server) {
    state.server.id = props.server
    cached = !!state.server.icon
  }

  // Marks a channel as selected
  // If the channels array contains the selected channel ID
  // and contains the messages field, then it's cached
  if (props.channel) {
    state.activeChannel = props.channel

    if (state.channels) {
      let channelCached = false
      state.channels.map(channel => {
        if (channel.id === props.channel && channel.messages) {
          channelCached = true
        }
      })
      cached = channelCached
    } else {
      cached = false
    }
  }

  Log('warn', `Selected`, props, cached ? `from cache` : `from network`)
  return cached ? path.cached(true) : path.uncached(true)
}

export function loading({ state, props }: Context) {
  state.loading = true
}

export function loaded({ state, props }: Context) {
  state.loading = false
}

// export function increment({ state, props }: Context<{ title: string }>) {
//   state.count++
// }

// export function changeNewTodoTitle({
//   state,
//   props,
// }: Context<{ title: string }>) {
//   state.newTodoTitle = props.title
// }

// export function removeTodo({ state, props }: Context<{ uid: string }>) {
//   state.todos.delete(props.uid)
// }

// export function toggleAllChecked({ state }: Context) {
//   const isAllChecked = state.isAllChecked.get()
//   state.visibleTodosUids.get().forEach((uid) => {
//     const todo = state.todos.get(uid)

//     if (todo) {
//       todo.completed = !isAllChecked
//     }
//   })
// }
