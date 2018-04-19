import { Scrollbars } from 'react-custom-scrollbars'
import styled, { css, injectGlobal } from './controllers/emotion'

const scrollbar = css`
  background-color: #2f3136;
  border-radius: 50px !important;
  border: 3px solid #36393e;
  & > div {
    cursor: default !important;
    background-color: #1e2124 !important;
    border-radius: 50px !important;
    border: 3px solid #36393e;
  }
`

export const Wrapper = styled(Scrollbars)`
  display: flex;
  height: 100%;
  width: 100%;
  /* & > div:nth-child(2) {
    ${scrollbar};
    height: 14px !important;
    & > div {
      height: 14px !important;
      margin-top: -3px !important;
    }
  } */
  & > div:nth-child(3) {
    ${scrollbar};
    width: 14px !important;
    & > div {
      width: 14px !important;
      margin-left: -3px !important;
    }
  }
  & * {
    color: ${({ theme }) => (theme.light ? '#2f3136' : '#fff')};
  }
`

injectGlobal`
  html, body, #root {
    width: 100%;
    height: 100%;
  }

  * {
    font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande,
      sans-serif;
    box-sizing: border-box;
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
