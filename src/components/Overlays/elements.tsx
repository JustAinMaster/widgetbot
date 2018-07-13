import * as React from 'react'
import styled, { css } from 'typed-emotion'

const svg = css``

const Root = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  > *:first-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  > svg {
    height: 40%;
    width: 40%;
    opacity: 0.08;
  }
`

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 40%;
  > * {
    width: 100%;
    height: 20%;
  }
  > svg {
    height: 100%;
    opacity: 0.08;
  }
`

export const Wrap = function<T>(wrapper: T): T {
  const Component: any = wrapper
  return (({ children, ...props }) => (
    <Root {...props}>
      {children ? (
        <Container>
          <Component />
          {children}
        </Container>
      ) : (
        <Component />
      )}
    </Root>
  )) as any
}
