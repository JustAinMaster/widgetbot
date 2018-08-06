import * as React from 'react'

import { Chat } from '@ui/Overlays'
import Header, { Name, Topic } from '@ui/Header'
import Wrapper from '@ui/Wrapper'
import { Trans } from '@lingui/react'

const ChooseChannel = () => (
  <Wrapper>
    <Header>
      <Name>
        <Trans id="PickChannelScreen.Title">Select a channel</Trans>
      </Name>
      <Topic>
        <Trans id="PickChannelScreen.Description">
          Pick a channel from the left
        </Trans>
      </Topic>
    </Header>
    <Chat />
  </Wrapper>
)

export default ChooseChannel
