import { connect } from 'fluent'
import * as React from 'react'
import { OverlayedScroll } from 'styled-elements'

import Channel from './Channel'
import { Root } from './elements'
import Header from './Header'

export default connect()
  .with(({ state, signals, props }) => ({
    channels: state.channels.entries(),
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
                  {channels.map(([id, { name }], i) => (
                    <Channel
                      name={name}
                      id={id}
                      order={i}
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
