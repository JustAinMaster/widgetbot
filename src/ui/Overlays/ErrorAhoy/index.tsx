import * as React from 'react'

import { Error } from '..'
import Header, { Name, Topic } from '../../Header'
import Wrapper from '../../Wrapper'
import { Message } from './elements'

const ErrorAhoy = ({ message }: { message?: string }) => (
  <Wrapper>
    <Header>
      <Name>Error</Name>
      <Topic>Something unexpected occurred</Topic>
    </Header>
    <Error>
      {message ? <Message length={message.length}>{message}</Message> : null}
    </Error>
  </Wrapper>
)

export default ErrorAhoy
