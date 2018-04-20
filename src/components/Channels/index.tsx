import * as React from 'react'

import { Root } from './elements'
import { OverlayedScroll } from 'styled-elements'
import { connect } from 'fluent'
import Channel from './Channel'

export default connect()
  .with(({ state, signals, props }) => ({
    channels: state.channels,
    activeChannel: state.activeChannel
  }))
  .toClass(
    props =>
      class Members extends React.PureComponent<typeof props> {
        render() {
          const { channels, activeChannel } = this.props

          if (channels) {
            return (
              <Root>
                <OverlayedScroll>
                  {channels.map(({ name, id }) => (
                    <Channel
                      name={name}
                      id={id}
                      active={id === activeChannel}
                      key={id}
                    />
                  ))}
                </OverlayedScroll>
              </Root>
            )
          }

          return <span>LOADING</span>
        }
      }
  )
