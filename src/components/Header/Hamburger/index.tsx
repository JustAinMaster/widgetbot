import * as React from 'react'
import { Ham, Burger } from './elements'

interface Props {
  onClick?: Function
  open?: boolean
}

const Hamburger = ({ onClick, open }: Props) => (
  <Ham open={open || false} onClick={onClick ? onClick.bind(this) : null}>
    <Burger />
  </Ham>
)

export default Hamburger
