import { Define, Load } from './helpers'

export interface Translation {
  'message.join_message': string
  'message.channel': string
  'header.join': string
}

export const locales = Define(['en'])

export type Locales = (typeof locales)[number]

export const translations = Load(locales)
