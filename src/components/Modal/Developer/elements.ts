import styled from 'typed-emotion'

import { Content } from '../elements'

export const Card = styled(Content)`
  padding: 18px 40px;
  padding-left: 15px;
`

export const Root = styled('div')`
  display: flex;
  flex-direction: row;
`

export const Mugshot = styled('img')`
  height: 130px;
  width: 145px;
  padding: 10px;
  padding-right: 25px;
  margin-right: 20px;

  border-right: 1px solid rgba(255, 255, 255, 0.1);
  -webkit-user-drag: none;
`

export const Bio = styled('p')`
  max-width: 300px;
  white-space: pre-line;
`

export const Heading = styled('h3')`
  margin: 0;
  font-weight: 600;
  margin-bottom: 15px;
`

export const Description = styled('span')`
  font-size: 14px;
  margin-bottom: 12px;
  display: inline-block;
`

interface ChipProps {
  color?: string
}
export const Chip = styled<ChipProps, 'a'>('a')`
  height: 24px;
  cursor: pointer;
  min-width: 60px;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  border-radius: 40px;
  opacity: 0.8;
  background: ${({ color }) => (color ? color : `rgba(255, 255, 255, 0.15)`)};
  line-height: 24px;
  padding: 0 10px;
  font-size: 14px;
  margin: 2px 0;
  margin-right: 5px;
  user-select: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`

interface GraphProps {
  username: string
}
export const Graph = styled<GraphProps, 'div'>('div')`
  background-image: url(${({ username }) =>
    `"https://ghchart.rshah.org/${username}"`});

  display: block;
  width: 100%;
  height: 89px;
  margin-left: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;
`
