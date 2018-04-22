import * as React from 'react'
import { connect } from 'fluent'
import { OverlayedScroll } from 'styled-elements'

import { Root } from './elements'
import Channel from './Channel'
import Header from './Header'

export default connect()
  .with(({ state, signals, props }) => ({
    channels: state.channels,
    activeChannel: state.activeChannel,
    visible: state.visible.channels
  }))
  .toClass(
    props =>
      class Channels extends React.PureComponent<typeof props> {
        render() {
          const { visible, channels, activeChannel } = this.props

          if (channels) {
            return (
              <Root visible={visible}>
                <Header />
                <OverlayedScroll>
                  {channels.map(({ name, id }, i) => (
                    <Channel
                      name={name}
                      id={id}
                      i={i}
                      active={id === activeChannel}
                      key={id}
                    />
                  ))}
                </OverlayedScroll>
              </Root>
            )
          }

          return <Root visible={visible} />
        }
      }
  )
