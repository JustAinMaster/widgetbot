import { ConnectFactory, IBranchContext, IContext, SequenceFactory, SequenceWithPropsFactory } from '@cerebral/fluent'
import { Provider as RouterProvider } from '@cerebral/router'

import { Signals, State } from '../../store/types'

// Create an interface where you compose your providers together
interface Providers {
  router: RouterProvider
  state: State
}

// Create a type used with your sequences and actions
export type Context<Props = {}> = IContext<Props> & Providers

// This type is used when you define actions that returns a path
export type BranchContext<Paths, Props = {}> = IBranchContext<Paths, Props> &
  Providers

// This function is used to connect components to Cerebral
export const connect = ConnectFactory<State, Signals>()

// This function is used to define sequences
export const sequence = SequenceFactory<Context>()

// This function is used to define sequences that expect to receive some initial
// props
export const sequenceWithProps = SequenceWithPropsFactory<Context>()
