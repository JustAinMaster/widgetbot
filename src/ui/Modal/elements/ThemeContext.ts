import styled, { ThemedReactEmotionInterface } from 'react-emotion'
import { Theme } from '@lib/emotion'

import Modal from '../../../types/modal'

export * from '@lib/emotion'

interface Context extends Theme {
  modal: Modal
}
export default styled as ThemedReactEmotionInterface<Context>
