import { Context, BranchContext } from 'fluent'

export { default as GraphQL } from './graphql'

export function select({
  state,
  props
}: Context<{ server?: string; channel?: string }>) {
  if (props.server) state.server.id = props.server
  if (props.channel) state.activeChannel = props.channel
}

export function loading({ state, props }: Context<{ loading: boolean }>) {
  console.warn(props)
  // state.loading = props.loading
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
