import { Theme } from '@lib/emotion'
import styled, { ThemedReactEmotionInterface } from 'react-emotion'

import { Embed } from '../../../types/message.d'

export * from '@lib/emotion'

interface Context extends Theme {
  embed: Embed
}
export default styled as ThemedReactEmotionInterface<Context>
