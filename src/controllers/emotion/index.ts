import styled, { ThemedReactEmotionInterface } from 'react-emotion'
export * from 'react-emotion'

import { Theme } from '../../store/types'
export default styled as ThemedReactEmotionInterface<Theme>

