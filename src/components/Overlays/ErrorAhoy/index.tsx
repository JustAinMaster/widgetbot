import * as React from 'react'
import Header, { Name, Topic } from '../../Header'
import Wrapper from '../../Wrapper'
import { Error } from '..'

const ErrorAhoy = () => (
  <Wrapper>
    <Header>
      <Name>Error ahoy!</Name>
      <Topic>Something went wrong. Try reloading</Topic>
    </Header>
    <Error />
  </Wrapper>
)

export default ErrorAhoy
