import * as React from 'react'

import { Root } from './elements'
import { OverlayedScroll } from 'styled-elements'
import { connect } from 'fluent'

export default connect()
  .with(({ state, signals, props }) => ({
    channel: state.channel
  }))
  .toClass(
    props =>
      class Members extends React.PureComponent<typeof props> {
        render() {
          const channel = this.props.channel.get()

          if (channel) {
            const { messages } = channel

            return (
              <Root>
                <OverlayedScroll>hi</OverlayedScroll>
              </Root>
            )
          }

          return <span>LOADING</span>
        }
      }
  )
