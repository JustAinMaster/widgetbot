import styled from 'typed-emotion'

import { Loading } from '../../../components/Overlays'

export const Root = styled('div')`
  position: relative;
  overflow: hidden;
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
