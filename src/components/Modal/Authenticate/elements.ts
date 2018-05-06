import * as Color from 'kolor'

import { Content } from '../elements'
import styled, { css } from '../elements/ThemeContext'

interface Props {
  loading: boolean
}
export const Root = styled<Props, any>(Content)`
  padding: 18px 40px;
  text-align: center;
  user-select: none;

  ${({ loading }) =>
    loading
      ? css`
          & > * {
            opacity: 0.35;
            pointer-events: none;
          }
        `
      : null};
`

export const Title = styled('h1')`
  font-size: 26px;
  line-height: 32px;
  font-weight: 300;
  margin-bottom: 8px;
`

export const Greeting = styled('h2')`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  opacity: 0.3;
  margin-bottom: 20px;
`

interface GroupProps {
  label: string
}
export const Group = styled<GroupProps, 'form'>('form')`
  &::before {
    display: block;
    content: ${({ label }) => JSON.stringify(label)};
    text-align: left;

    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 16px;
    font-size: 12px;
    opacity: 0.6;
  }

  & > * {
    display: block;
    width: 100%;
  }
`

export const Input = styled('input')`
  height: 40px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  font-size: 16px;

  background-color: rgba(0, 0, 0, 0.1);
  color: ${({ theme }) =>
    Color(theme.colors.primary)
      .fadeOut(0.1)
      .toString()};

  &:focus,
  &:active {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const Button = styled('button')`
  position: relative;
  overflow: hidden;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.accent};
  transition: transform 0.4s cubic-bezier(0.13, 0.78, 0, 2);

  margin: 20px 0 14px;
  height: 44px;
  min-height: 44px;
  min-width: 130px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  outline: none;
  border: none;

  &::before {
    display: block;
    content: '';
    position: absolute;
    background: rgb(0, 0, 0);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &::after {
    background: #fff;
    content: '';
    height: 500px;
    opacity: 0.2;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: rotate(35deg) translate(-215px, -215px);
    transition: transform 0.5s ease;
    width: 20px;
    pointer-events: none;
    box-shadow: 0 0 40px 24px #fff;
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 0.1;
    }

    &::after {
      transform: rotate(35deg) translate(500%, -50px);
    }
  }

  &:active {
    transform: scale(0.95);
    &::before {
      opacity: 0;
    }
  }
`

export const SSO = styled('div')`
  font-size: 14px;
  color: ${({ theme }) =>
    Color(theme.colors.primary)
      .fadeOut(0.8)
      .toString()};

  text-align: left;
`

export const Discord = styled('button')`
  font-size: 14px;
  display: inline-block;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: underline;
  }
`
