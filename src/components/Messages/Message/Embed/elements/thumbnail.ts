import styled, { css } from '../ThemeContext'

interface Props {
  rich?: boolean
}
export const Thumbnail = styled<Props, 'img'>('img')`
  border-radius: 3px;
  object-fit: contain;
  flex-shrink: 0;

  ${({ rich, theme }) =>
    rich
      ? css`
          width: auto;
          margin: 5px 0;
        `
      : theme.embed.type === 'article'
        ? css`
            margin-top: 8px;
            width: 400px;
            height: auto;
          `
        : css`
            max-height: 80px;
            margin-left: 20px;
            max-width: 80px;
          `};
`
