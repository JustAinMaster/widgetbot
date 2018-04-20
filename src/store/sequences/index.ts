import { sequence, sequenceWithProps } from 'fluent'
import * as actions from '../actions'

export const fetchMessages = sequenceWithProps<{
  server: string
  channel?: string
}>(s =>
  s
    .action(actions.select)
    .branch(actions.GraphQL.fetch)
    .paths({
      success: s => s.action(actions.GraphQL.store),
      error: s => s
    })
    // .action(actions.loading)
)

// export const increment = sequenceWithProps<{ title: string }>((s) =>
//   s.action(actions.increment)
// )

// export const changeNewTodoTitle = sequenceWithProps<{ title: string }>((s) =>
//   s.action(actions.changeNewTodoTitle)
// )

// export const removeTodo = sequenceWithProps<{ uid: string }>((s) =>
//   s.action(actions.removeTodo)
// )

// export const toggleAllChecked = sequence((s) =>
//   s.action(actions.toggleAllChecked)
// )
