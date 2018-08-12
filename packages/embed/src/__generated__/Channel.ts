/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Channel
// ====================================================

export interface Channel_channel_CategoryChannel {
  __typename: 'CategoryChannel' | 'VoiceChannel'
  name: string
  id: any
}

export interface Channel_channel_TextChannel {
  __typename: 'TextChannel'
  name: string
  id: any
  topic: string | null
}

export type Channel_channel =
  | Channel_channel_CategoryChannel
  | Channel_channel_TextChannel

export interface Channel {
  channel: Channel_channel | null
}

export interface ChannelVariables {
  channel: any
}
