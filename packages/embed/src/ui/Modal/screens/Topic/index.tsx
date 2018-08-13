import * as React from 'react'
import Markdown from '@ui/shared/markdown/render'

import { Box, Close, IScreenProps } from '@ui/Modal'
import { Content } from './elements'

class Topic extends React.PureComponent<IScreenProps> {
  render() {
    const { modal, close } = this.props

    return (
      <Box>
        <Close onClick={() => close()} />
        <Content>
          <Markdown>{modal.data}</Markdown>
        </Content>
      </Box>
    )
  }
}

export default Topic
