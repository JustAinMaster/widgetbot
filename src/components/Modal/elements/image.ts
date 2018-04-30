import styled, { css } from './ThemeContext'
import Color from 'kolor'

export const Image = styled('img')`
  max-width: 70vw;
  max-height: 70vh;
  border-radius: 3px;
`

export const OpenImage = styled('a')`
  line-height: 30px;
  opacity: 0.5;
  transition: opacity 0.15s ease;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    opacity: 1;
  }
`
