import styled from 'typed-emotion'
import { Hash } from 'styled-elements'
import * as Color from 'kolor'

export const Root = styled('header')`
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  z-index: 8;
  height: 47px;
  line-height: 25px;
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1),
    0px 4px 5px 0px rgba(0, 0, 0, 0.12), 0px 1px 10px 0px rgba(0, 0, 0, 0.09),
    0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.06);
`

// prettier-ignore
export const Name = styled(Hash)`
  font-size: 18px;
  font-weight: 600;
  height: 25px;
  margin: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;

  background-position: 0 50%;
  padding-left: 25px;
  padding-right: 15px;
  border-right: 1px solid ${({ theme }) =>
      Color(theme.colors.primary)
        .fadeOut(0.9)
        .toString()};

  @media (max-width: 350px) {
    background: none;
    padding-left: 0;
  }
`
export const Topic = styled('div')`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) =>
    Color(theme.colors.primary)
      .fadeOut(0.4)
      .toString()};
`
