import styled, { css } from 'typed-emotion'
import Color from 'kolor'

interface Props {
  visible: boolean
}

export const Root = styled<Props, 'div'>('div')`
  position: absolute;
  z-index: 9;
  background-color: ${({ theme }) =>
    Color(theme.colors.background)
      .darken(0.036)
      .toString()};
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  will-change: transform;

  & > div > div:nth-child(1) {
    padding: 10px 0;
  }

  ${({ visible }) =>
    visible
      ? css`
          @media (max-width: 520px) {
            box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
              0px 16px 24px 2px rgba(0, 0, 0, 0.14),
              0px 6px 30px 5px rgba(0, 0, 0, 0.12);
          }
        `
      : css`
          transform: translateX(-250px);
        `};
`
