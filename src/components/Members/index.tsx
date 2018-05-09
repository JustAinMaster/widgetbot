import { connect } from 'fluent'
import * as React from 'react'
import { ScrollOverlay } from 'styled-elements/scrollable'

import { Root } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    channel: state.channel.get()
  }))
  .toClass(
    props =>
      class Members extends React.PureComponent<typeof props> {
        render() {
          const { channel } = this.props

          if (channel) {
            const { messages } = channel

            return (
              <Root>
                <ScrollOverlay>hi</ScrollOverlay>
              </Root>
            )
          }

          return <span>LOADING</span>
        }
      }
  )
