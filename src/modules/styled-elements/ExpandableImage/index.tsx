import { connect } from 'fluent'
import * as React from 'react'

import { Image, Loader, Root } from './elements'

interface Props {
  src: string
  className?: string
}

/**
 * Expandable image
 */
const ExpandableImage = connect<Props>()
  .with(({ state, signals, props }) => ({
    toggle: signals.modal
  }))
  .toClass(
    props =>
      class ExpandableImage extends React.PureComponent<typeof props> {
        state = {
          type: 'loading'
        }

        open = () => {
          const { src, toggle } = this.props
          if (src) {
            toggle({
              open: true,
              type: 'image',
              data: src
            })
          }
        }

        render() {
          const { className, src } = this.props

          return (
            <Root className={className || null} onClick={this.open}>
              <Image
                src={src}
                onLoad={() => this.setState({ type: 'loaded' })}
                onError={() => this.setState({ type: 'error' })}
              />
              {this.state.type === 'loading' && <Loader />}
            </Root>
          )
        }
      }
  )

export default ExpandableImage
