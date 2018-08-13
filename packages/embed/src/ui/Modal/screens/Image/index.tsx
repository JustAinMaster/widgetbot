import * as React from 'react'

import { Root, OpenImage } from './elements'
import { Trans } from '@lingui/react'
import { Box, Close, IScreenProps } from '@ui/Modal'

class Image extends React.PureComponent<IScreenProps> {
  render() {
    const { modal, close } = this.props

    return (
      <Box>
        <Close onClick={() => close()} />

        <Root src={modal.data} />
        <OpenImage href={modal.data} target="_blank" onClick={close}>
          <Trans id="Modal.openOriginal">Open original</Trans>
        </OpenImage>
      </Box>
    )
  }
}

export default Image
