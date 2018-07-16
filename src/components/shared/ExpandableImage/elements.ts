import { Scale } from 'shared/ScaledImage'
import styled from 'typed-emotion'

import { Loading } from '../../../components/Overlays'

interface Props {
  scale: Scale
}

export const Root = styled('div')<Props>`
  position: relative;
  overflow: hidden;
  ${({ scale }) => scale.css};
`

export const Image = styled('img')`
  width: 100%;
  height: 100%;
`

export const Loader = styled(Loading)`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
`
