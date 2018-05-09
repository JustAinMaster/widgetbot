import styled, { ThemedReactEmotionInterface } from 'react-emotion'

import * as Store from '../../store/types'

export * from 'react-emotion'

type Color = any

export interface Theme extends Store.Theme {
  colors: {
    _primary: Color
    _accent: Color
    _background: Color

    primary: string
    accent: string
    background: string
  }
}

export default styled as ThemedReactEmotionInterface<Theme>
