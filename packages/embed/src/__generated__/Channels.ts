/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Channels
// ====================================================

export interface Channels_guild_channels_CategoryChannel {
  __typename: 'CategoryChannel' | 'VoiceChannel'
  name: string
  id: any
}

export interface Channels_guild_channels_TextChannel_parent {
  __typename: 'CategoryChannel'
  name: string
}

export interface Channels_guild_channels_TextChannel {
  __typename: 'TextChannel'
  name: string
  id: any
  parent: Channels_guild_channels_TextChannel_parent | null
}

export type Channels_guild_channels =
  | Channels_guild_channels_CategoryChannel
  | Channels_guild_channels_TextChannel

export interface Channels_guild {
  __typename: 'Guild'
  channels: Channels_guild_channels[]
}

export interface Channels {
  guild: Channels_guild | null
}

export interface ChannelsVariables {
  guild: any
}
