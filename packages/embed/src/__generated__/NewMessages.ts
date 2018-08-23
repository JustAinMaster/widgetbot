/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewMessages
// ====================================================

export interface NewMessages_message_message_JoinMessage_author_GuestMember {
  __typename: 'GuestMember' | 'Member'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
}

export interface NewMessages_message_message_JoinMessage_author_GuildMember {
  __typename: 'GuildMember'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
  displayHexColor: string
}

export type NewMessages_message_message_JoinMessage_author =
  | NewMessages_message_message_JoinMessage_author_GuestMember
  | NewMessages_message_message_JoinMessage_author_GuildMember

export interface NewMessages_message_message_JoinMessage {
  __typename: 'JoinMessage' | 'PinnedMessage'
  /**
   * Message ID
   */
  id: any
  /**
   * Message timestamp
   */
  createdAt: any
  /**
   * Message author
   */
  author: NewMessages_message_message_JoinMessage_author
}

export interface NewMessages_message_message_TextMessage_author_GuestMember {
  __typename: 'GuestMember' | 'Member'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
}

export interface NewMessages_message_message_TextMessage_author_GuildMember {
  __typename: 'GuildMember'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
  displayHexColor: string
}

export type NewMessages_message_message_TextMessage_author =
  | NewMessages_message_message_TextMessage_author_GuestMember
  | NewMessages_message_message_TextMessage_author_GuildMember

export interface NewMessages_message_message_TextMessage_reactions_emoji_CustomEmoji {
  __typename: 'CustomEmoji'
  name: string
  id: any
  url: string
}

export interface NewMessages_message_message_TextMessage_reactions_emoji_TextEmoji {
  __typename: 'TextEmoji'
  name: string
  utf8: string
}

export type NewMessages_message_message_TextMessage_reactions_emoji =
  | NewMessages_message_message_TextMessage_reactions_emoji_CustomEmoji
  | NewMessages_message_message_TextMessage_reactions_emoji_TextEmoji

export interface NewMessages_message_message_TextMessage_reactions {
  __typename: 'Reaction'
  count: number
  emoji: NewMessages_message_message_TextMessage_reactions_emoji
}

export interface NewMessages_message_message_TextMessage_attachments {
  __typename: 'Attachment'
  url: string
  height: number
  width: number
}

export interface NewMessages_message_message_TextMessage_embeds_fields {
  __typename: 'EmbedField'
  value: string
  name: string
  inline: boolean
}

export interface NewMessages_message_message_TextMessage_embeds_footer {
  __typename: 'EmbedFooter'
  iconURL: string | null
  proxyIconURL: string | null
  text: string
}

export interface NewMessages_message_message_TextMessage_embeds_thumbnail {
  __typename: 'EmbedThumbnail'
  height: number
  width: number
  proxyURL: string
  url: string
}

export interface NewMessages_message_message_TextMessage_embeds_video {
  __typename: 'EmbedVideo'
  height: number
  width: number
  url: string
}

export interface NewMessages_message_message_TextMessage_embeds {
  __typename: 'MessageEmbed'
  title: string | null
  description: string | null
  url: string | null
  timestamp: any | null
  hexColor: string | null
  fields: NewMessages_message_message_TextMessage_embeds_fields[]
  footer: NewMessages_message_message_TextMessage_embeds_footer | null
  thumbnail: NewMessages_message_message_TextMessage_embeds_thumbnail | null
  video: NewMessages_message_message_TextMessage_embeds_video | null
}

export interface NewMessages_message_message_TextMessage {
  __typename: 'TextMessage'
  /**
   * Message ID
   */
  id: any
  /**
   * Message timestamp
   */
  createdAt: any
  /**
   * Message author
   */
  author: NewMessages_message_message_TextMessage_author
  /**
   * Message content
   */
  content: string | null
  /**
   * Time the message was edited
   */
  editedAt: any | null
  /**
   * Message reactions
   */
  reactions: NewMessages_message_message_TextMessage_reactions[]
  /**
   * Message attachments
   */
  attachments: NewMessages_message_message_TextMessage_attachments[]
  /**
   * Message embeds
   */
  embeds: NewMessages_message_message_TextMessage_embeds[] | null
}

export type NewMessages_message_message =
  | NewMessages_message_message_JoinMessage
  | NewMessages_message_message_TextMessage

export interface NewMessages_message {
  __typename: 'MessageSub'
  message: NewMessages_message_message
}

export interface NewMessages {
  message: NewMessages_message
}

export interface NewMessagesVariables {
  guild: any
  channel: any
}
