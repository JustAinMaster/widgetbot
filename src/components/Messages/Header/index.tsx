import * as React from 'react'
import { Root, Name, Topic } from './elements'
import Hamburger from '../../Hamburger'
import { Channel } from '../../../store/types'

interface Props {
  toggle: Function
  open: boolean
  channel: Channel
}

const Header = ({ toggle, open, channel }: Props) => (
  <Root>
    <Hamburger onClick={toggle} open={open} />
    <Name>{channel.name}</Name>
    <Topic>{channel.topic}</Topic>
  </Root>
)

export default Header
