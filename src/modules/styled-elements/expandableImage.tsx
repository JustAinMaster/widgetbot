import { connect } from 'fluent'
import * as React from 'react'

interface Props {
  src: string
}

/**
 * Expandable image
 */
const ExpandableImage = connect<Props>()
  .with(({ state, signals, props }) => ({
    toggle: signals.modal
  }))
  .to(props => (
    <img
      {...props}
      onClick={() => {
        const { src, toggle } = props
        if (src) {
          toggle({
            open: true,
            type: 'image',
            data: src
          })
        }
      }}
    />
  ))

export default ExpandableImage
