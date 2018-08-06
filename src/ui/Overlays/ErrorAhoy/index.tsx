import * as React from 'react'

import { Error } from '..'
import Header, { Name, Topic } from '../../Header'
import Wrapper from '../../Wrapper'
import { Message } from './elements'
import { Trans } from '@lingui/react'

const ErrorAhoy = ({ message }: { message?: string }) => (
  <Wrapper>
    <Header>
      <Name>
        <Trans id="ErrorScreen.Title">Error</Trans>
      </Name>
      <Topic>
        <Trans id="ErrorScreen.Description">
          Something unexpected occurred
        </Trans>
      </Topic>
    </Header>
    <Error>
      {message ? <Message length={message.length}>{message}</Message> : null}
    </Error>
  </Wrapper>
)

export default ErrorAhoy
