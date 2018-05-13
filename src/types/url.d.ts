import { Locales } from '../app/locales'

export interface RawUrl {
  server?: string
  channel?: string

  height?: string
  width?: string

  lang?: string
}

export interface ParsedUrl {
  server?: string
  channel?: string

  height?: number
  width?: number

  lang?: Locales
}
