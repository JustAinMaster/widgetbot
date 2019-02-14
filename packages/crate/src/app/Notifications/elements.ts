import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { TransitionGroup } from 'react-transition-group'

export const Root = styled.div`
  display: flex;
  pointer-events: none;
  flex-direction: ${({ theme }) =>
    theme.coords.y.axis === 'bottom' ? `column-reverse` : `column`};

  position: fixed;
  z-index: 2147482999;
  padding: 7px 0;
  width: 300px;
  max-height: calc(70% - 100px);

  ${({ theme }) => {
    const { x, y } = theme.coords

    return css({
      [x.axis]: x.offset,
      [y.axis]: y.offset + 56,
      [`padding${y.axis}`]: '20px'
    })
  }};
`.withComponent(TransitionGroup)
