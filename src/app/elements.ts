import styled, { injectGlobal, Theme } from 'typed-emotion'

export const Notifications = styled('div')`
  * {
    word-break: initial;
  }

  button {
    cursor: pointer;
    outline: 0;
    font-weight: 500 !important;
  }

  .notifications-br {
    bottom: ${({ theme }) =>
      theme.url.height ? `calc(100% - ${theme.url.height}px)` : '0'};
  }

  .notification {
    background-color: ${({ theme }) =>
      theme.colors._background.lighten(0.1).toString()} !important;
  }

  .notification-dismiss {
    background-color: ${({ theme }) =>
      theme.colors._background.lighten(0.4).toString()} !important;
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
      position: relative;
      width: ${theme.url.width ? `${theme.url.width}px` : `100%`};
      height: ${theme.url.height ? `${theme.url.height}px` : `100%`};
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
      word-break: break-word;
    }
  `
  return null
}
