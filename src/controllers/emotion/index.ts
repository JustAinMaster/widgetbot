import styled, { ThemedReactEmotionInterface } from 'react-emotion'
export default styled as ThemedReactEmotionInterface<Theme>
export * from 'react-emotion'

export type Theme = {
  styles: {
    color: string
    background: string
  }
  compact: boolean
  light: boolean
}

export const defaultTheme = (): Theme => ({
  styles: {
    color: '#fff',
    background: '#36393E' // 36393E
  },
  light: false,
  compact: false
})
