import styled, { css } from 'typed-emotion'
import { Role as RoleType } from '../../../../../types/message'

export const Mention = styled('span')``
export const Channel = styled('span')``

interface RoleProps {
  everyone?: boolean
  role?: RoleType
}
export const Role = styled<RoleProps, 'span'>('span')``
