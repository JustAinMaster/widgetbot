import { sequence, sequenceWithProps } from 'fluent'
import * as actions from '../actions'
import { Toggles } from '../types'
import { message } from '../../types/socket'

export const fetchServer = sequenceWithProps<{
  server: string
  channel?: string
}>(s =>
  s.branch(actions.select).paths({
    cached: s => s,
    uncached: s =>
      s
        .action(actions.loading(true))
        .branch(actions.GraphQL.fetchServer)
        .paths({
          success: s => s.action(actions.GraphQL.store),
          error: s => s
        })
        .action(actions.loading(false))
  })
)

export const insertMessage = sequenceWithProps<message>(s =>
  s.action(actions.insertMessage)
)

export const switchChannel = sequenceWithProps<{
  channel: string
}>(s =>
  s
    .action(actions.closeDrawerOnMobile)
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchChannel)
          .paths({
            success: s => s.action(actions.GraphQL.updateChannel),
            error: s => s
          })
          .action(actions.loading(false))
    })
)

export const toggle = sequenceWithProps<{ component: Toggles }>(s =>
  s.action(actions.toggle)
)
