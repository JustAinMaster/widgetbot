import { Locales } from '../app/locales'

export interface RawUrl {
  [key: string]: any

  token?: string

  server?: string
  channel?: string

  height?: string
  width?: string

  lang?: string
}

export interface ParsedUrl {
  token?: string

  server?: string
  channel?: string

  height?: number
  width?: number

  lang?: Locales
}
