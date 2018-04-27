import * as React from 'react'
import { connect } from 'fluent'

import { Root } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({}))
  .toClass(
    props =>
      class Chat extends React.PureComponent<typeof props> {
        render() {
          return <Root>chat</Root>
        }
      }
  )
