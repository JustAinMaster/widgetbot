import { sequence, sequenceWithProps } from 'fluent'
import * as actions from '../actions'
import { Toggles } from '../types'
import { message } from '../../types/socket'

export const routeHome = () => {
  location.href = '/'
}

/**
 * Router
 */
export const fetchServer = sequenceWithProps<{
  server: string
}>(s =>
  s
    .action(actions.switchScreen('choose-channel'))
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchServer)
          .paths({
            success: s => s.action(actions.GraphQL.store),
            error: s => s.action(actions.notify)
          })
          .action(actions.loading(false))
    })
)

export const fetchChannel = sequenceWithProps<{
  server: string
  channel: string
}>(s =>
  s
    .action(actions.switchScreen('active-channel'))
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchServer)
          .paths({
            success: s => s.action(actions.GraphQL.store),
            error: s => s.action(actions.notify)
          })
          .action(actions.loading(false))
    })
)

export const insertMessage = sequenceWithProps<message>(s =>
  s.action(actions.setMessage)
)

export const updateMessage = sequenceWithProps<message>(s =>
  s.action(actions.setMessage)
)

export const switchChannel = sequenceWithProps<{
  channel: string
}>(s =>
  s
    .action(actions.closeDrawerOnMobile)
    .action(actions.switchScreen('active-channel'))
    .branch(actions.select)
    .paths({
      cached: s => s,
      uncached: s =>
        s
          .action(actions.loading(true))
          .branch(actions.GraphQL.fetchChannel)
          .paths({
            success: s => s.action(actions.GraphQL.updateChannel),
            error: s => s.action(actions.notify)
          })
          .action(actions.loading(false))
    })
)

export const toggle = sequenceWithProps<{ component: Toggles }>(s =>
  s.action(actions.toggle)
)
