import styled, { ThemedReactEmotionInterface } from 'react-emotion'
import Modal from '../../../types/modal'
import { Theme } from 'typed-emotion'
export * from 'typed-emotion'

interface Context extends Theme {
  modal: Modal
}
export default styled as ThemedReactEmotionInterface<Context>
