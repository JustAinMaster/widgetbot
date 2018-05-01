import styled, { ThemedReactEmotionInterface } from 'react-emotion'

import * as Store from '../../store/types'

export * from 'react-emotion'

export type Theme = Store.Theme
export default styled as ThemedReactEmotionInterface<Store.Theme>
