import Color from 'kolor'
import styled, { injectGlobal } from 'typed-emotion'

import { Theme } from '../store/types'

export const Notifications = styled('div')`
  * {
    word-break: initial;
  }

  button {
    cursor: pointer;
    outline: 0;
    font-weight: 500 !important;
  }

  .notification {
    background-color: ${({ theme }) =>
      Color(theme.colors.background)
        .lighten(0.1)
        .toString()} !important;
  }
  .notification-dismiss {
    background-color: ${({ theme }) =>
      Color(theme.colors.background)
        .lighten(0.4)
        .toString()} !important;
  }
`

export const Root = styled('main')`
  width: 100%;
  height: 100%;
  ${({ theme }) => globals(theme)};
`

function globals(theme: Theme) {
  injectGlobal`
    html, body, #root {
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.background};
      overflow: hidden;
    }

    #root {
      opacity: 1 !important;
      transform: initial !important;
    }

    /* Resets */
    * {
      color: ${theme.colors.primary};
      font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande,
        sans-serif;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      word-break: break-all;
    }

    @font-face {
      font-family: Whitney;
      font-weight: 300;
      src: url(https://discordapp.com/assets/6c6374bad0b0b6d204d8d6dc4a18d820.woff)
        format('woff');
    }

    @font-face {
      font-family: Whitney;
      font-weight: 400;
      src: url(https://discordapp.com/assets/e8acd7d9bf6207f99350ca9f9e23b168.woff)
        format('woff');
    }

    @font-face {
      font-family: Whitney;
      font-weight: 500;
      src: url(https://discordapp.com/assets/3bdef1251a424500c1b3a78dea9b7e57.woff)
        format('woff');
    }

    @font-face {
      font-family: Whitney;
      font-weight: 600;
      src: url(https://discordapp.com/assets/be0060dafb7a0e31d2a1ca17c0708636.woff)
        format('woff');
    }

    @font-face {
      font-family: Whitney;
      font-weight: 700;
      src: url(https://discordapp.com/assets/8e12fb4f14d9c4592eb8ec9f22337b04.woff)
        format('woff');
    }
  `
  return null
}
