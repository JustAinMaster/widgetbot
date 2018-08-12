/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Author
// ====================================================

export interface Author_GuestMember {
  __typename: 'GuestMember' | 'Member'
  id: any
  username: string
  discriminator: string
  avatarURL: string
}

export interface Author_GuildMember {
  __typename: 'GuildMember'
  id: any
  username: string
  discriminator: string
  avatarURL: string
  displayHexColor: string
}

export type Author = Author_GuestMember | Author_GuildMember
