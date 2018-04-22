import * as React from 'react'
import Header, { Name, Topic } from '../../Header'
import Wrapper from '../../Wrapper'
import { Chat } from '..'

const ChooseChannel = () => (
  <Wrapper>
    <Header>
      <Name>Select a channel</Name>
      <Topic>Pick a channel from the left</Topic>
    </Header>
    <Chat />
  </Wrapper>
)

export default ChooseChannel
