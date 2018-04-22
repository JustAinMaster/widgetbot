import styled, { ThemedReactEmotionInterface } from 'react-emotion'
export default styled as ThemedReactEmotionInterface<Theme>
export * from 'react-emotion'

export type Theme = {
  colors: {
    primary: string
    accent: string
    background: string
  }
  compact: boolean
  light: boolean
}

export const defaultTheme = (): Theme => ({
  colors: {
    primary: '#fff',
    accent: '#7289da',
    background: '#36393E'
  },
  light: false,
  compact: false
})
