import { Embed } from './../../../../types/message.d'
import styled, { ThemedReactEmotionInterface } from 'react-emotion'
export * from 'typed-emotion'

import { Theme } from 'typed-emotion'
interface Context extends Theme {
  embed: Embed
}
export default styled as ThemedReactEmotionInterface<Context>
