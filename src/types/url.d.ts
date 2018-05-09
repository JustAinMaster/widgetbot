export interface RawUrl {
  server?: string
  channel?: string

  height?: string
  width?: string
}

export interface ParsedUrl {
  server?: string
  channel?: string

  height?: number
  width?: number
}
