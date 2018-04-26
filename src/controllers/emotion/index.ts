import styled, { ThemedReactEmotionInterface } from 'react-emotion'
export * from 'react-emotion'

import * as Store from '../../store/types'
export type Theme = Store.Theme
export default styled as ThemedReactEmotionInterface<Store.Theme>

