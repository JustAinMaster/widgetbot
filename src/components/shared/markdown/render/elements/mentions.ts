import Color from 'color'
import ChannelLink from 'shared/Channel'
import styled, { css } from 'typed-emotion'

interface Props {
  color?: string
  inline?: boolean
}

const base = (inline: boolean, color: string) => css`
  cursor: pointer;
  font-weight: 500;
  border-radius: 30px;

  ${inline
    ? css`
        color: ${color};
        &:hover {
          text-decoration: underline;
        }
      `
    : css`
        padding: 0 6px;
        background-color: ${Color(color)
          .fade(0.9)
          .string()};
        color: ${color} !important;
        text-decoration: none !important;

        &:hover {
          background-color: ${Color(color)
            .fade(0.3)
            .string()};
          color: rgba(255, 255, 255, 0.95) !important;
        }
      `};
`

export const Mention = styled('span')<Props>`
  ${({ theme, color, inline }) => base(inline, color || theme.colors.accent)};
`
export const Channel = styled(ChannelLink)<Props>`
  ${({ theme, inline }) => base(inline, theme.colors.accent)};
`

interface RoleProps extends Props {
  everyone?: boolean
}
export const Role = styled('span')<RoleProps>`
  ${({ theme, color, inline }) => base(inline, color || theme.colors.accent)};
`
