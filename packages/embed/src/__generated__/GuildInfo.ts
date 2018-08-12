/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GuildInfo
// ====================================================

export interface GuildInfo_guild {
  __typename: 'Guild'
  name: string
  iconURL: string
  memberCount: number
}

export interface GuildInfo {
  guild: GuildInfo_guild | null
}

export interface GuildInfoVariables {
  guild: any
}
