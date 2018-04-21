import styled from 'typed-emotion'
import { Hash } from 'styled-elements'

export const Root = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Header = styled('header')`
  display: flex;
  height: 47px;
  line-height: 25px;
  padding: 10px 0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);
`

export const Name = styled(Hash)`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  height: 25px;
  margin: 0 15px;

  opacity: 1;
  background-position: 0 50%;
  padding-left: 25px;
  padding-right: 15px;
  border-right: 1px solid hsla(240, 6%, 97%, 0.1);
`
export const Topic = styled('div')`
  font-size: 14px;
  font-weight: 500;
  color: hsla(240, 6%, 97%, 0.6);
`
