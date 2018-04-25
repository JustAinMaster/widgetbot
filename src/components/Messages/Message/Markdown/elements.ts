import styled, { css } from 'typed-emotion'
import Color from 'kolor'
import { Role as RoleType } from '../../../../types/message'

export const Emoji = styled('img')`
`

export const Image = styled('img')``

export const Mention = styled('span')``
export const Channel = styled('span')``

interface RoleProps {
  everyone?: boolean
  role?: RoleType
}
export const Role = styled<RoleProps, 'span'>('span')``
