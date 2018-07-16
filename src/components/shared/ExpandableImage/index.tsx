import { connect } from 'fluent'
import * as React from 'react'
import optimize from 'shared/ExpandableImage/optimize'
import { Scale } from 'shared/ScaledImage'

import { Image, Loader, Root } from './elements'

interface Props {
  src: string
  className?: string

  height?: number
  width?: number
  maxWidth?: number
  maxHeight?: number
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

        open() {
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
          const { className, src: url } = this.props
          const scale = new Scale(this.props)

          return (
            <Root
              className={className || null}
              onClick={this.open.bind(this)}
              scale={scale}
            >
              <Image
                src={optimize({
                  width: scale.width,
                  height: scale.height,
                  url
                })}
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
