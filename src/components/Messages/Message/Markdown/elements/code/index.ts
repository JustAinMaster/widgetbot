import styled, { css } from 'typed-emotion'
import { light, dark } from './hljs'
import Color from 'kolor'

const fonts = `'${[
  'Operator Mono Lig',
  'Operator Mono Book',
  'Operator Mono',
  'Fira Code',
  'Menlo',
  'Consolas',
  'Monaco',
  'monospace'
].join(`','`)}'`

interface Props {
  inline?: boolean
  language?: string
}

export const Code = styled<Props, 'code'>('code')`
  background-color: rgba(0, 0, 0, 0.1) !important;
  font-family: ${fonts};
  font-size: 14px;
  font-weight: 100 !important;

  ${({ inline, theme }) =>
    inline
      ? css`
          padding: 0.2em;
          color: ${Color(theme.colors.primary)
            .darken(0.3)
            .toString()};
        `
      : css`
          color: ${Color(theme.colors.primary)
            .darken(0.4)
            .toString()} !important;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1),
            0px 1px 10px 0px rgba(0, 0, 0, 0.09), 0 1px 0 rgba(0, 0, 0, 0.1),
            0 2px 0 rgba(0, 0, 0, 0.06);
          display: block;
          line-height: 16px;
          margin-top: 6px;
          padding: 7px;
          border-radius: 5px;
        `};

  ${light(fonts)};
`
