import styled from './ThemeContext'

export const Image = styled('img')`
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 3px;
  max-width: 70vw;
  max-height: 70vh;
  user-select: none;
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
