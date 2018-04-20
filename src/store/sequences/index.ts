import { sequence, sequenceWithProps } from 'fluent'
import * as actions from '../actions'

export const fetchServer = sequenceWithProps<{
  server: string
  channel?: string
}>(s =>
  s.branch(actions.select).paths({
    cached: s => s,
    uncached: s =>
      s
        // .action(actions.loading(true))
        .branch(actions.GraphQL.fetchServer)
        .paths({
          success: s => s.action(actions.GraphQL.store),
          error: s => s
        })
        // .action(actions.loading(false))
  })
)

export const switchChannel = sequenceWithProps<{
  channel: string
}>(s =>
  s.branch(actions.select).paths({
    cached: s => s,
    uncached: s =>
      s
        // .action(actions.loading(true))
        .branch(actions.GraphQL.fetchChannel)
        .paths({
          success: s => s.action(actions.GraphQL.updateChannel),
          error: s => s
        })
        // .action(actions.loading(false))
  })
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
