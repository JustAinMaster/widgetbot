/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Messages
// ====================================================

export interface Messages_channel_CategoryChannel {
  __typename: 'CategoryChannel' | 'VoiceChannel'
  id: any
}

export interface Messages_channel_TextChannel_messages_JoinMessage_author_GuestMember {
  __typename: 'GuestMember' | 'Member'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
}

export interface Messages_channel_TextChannel_messages_JoinMessage_author_GuildMember {
  __typename: 'GuildMember'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
  displayHexColor: string
}

export type Messages_channel_TextChannel_messages_JoinMessage_author =
  | Messages_channel_TextChannel_messages_JoinMessage_author_GuestMember
  | Messages_channel_TextChannel_messages_JoinMessage_author_GuildMember

export interface Messages_channel_TextChannel_messages_JoinMessage {
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
  author: Messages_channel_TextChannel_messages_JoinMessage_author
}

export interface Messages_channel_TextChannel_messages_TextMessage_author_GuestMember {
  __typename: 'GuestMember' | 'Member'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
}

export interface Messages_channel_TextChannel_messages_TextMessage_author_GuildMember {
  __typename: 'GuildMember'
  id: any
  username: string
  discriminator: string
  avatarURL: string | null
  displayHexColor: string
}

export type Messages_channel_TextChannel_messages_TextMessage_author =
  | Messages_channel_TextChannel_messages_TextMessage_author_GuestMember
  | Messages_channel_TextChannel_messages_TextMessage_author_GuildMember

export interface Messages_channel_TextChannel_messages_TextMessage_reactions_emoji_CustomEmoji {
  __typename: 'CustomEmoji'
  name: string
  id: any
  url: string
}

export interface Messages_channel_TextChannel_messages_TextMessage_reactions_emoji_TextEmoji {
  __typename: 'TextEmoji'
  name: string
  utf8: string
}

export type Messages_channel_TextChannel_messages_TextMessage_reactions_emoji =
  | Messages_channel_TextChannel_messages_TextMessage_reactions_emoji_CustomEmoji
  | Messages_channel_TextChannel_messages_TextMessage_reactions_emoji_TextEmoji

export interface Messages_channel_TextChannel_messages_TextMessage_reactions {
  __typename: 'Reaction'
  count: number
  emoji: Messages_channel_TextChannel_messages_TextMessage_reactions_emoji
}

export interface Messages_channel_TextChannel_messages_TextMessage_attachments {
  __typename: 'Attachment'
  url: string
  height: number
  width: number
}

export interface Messages_channel_TextChannel_messages_TextMessage_embeds_fields {
  __typename: 'EmbedField'
  value: string
  name: string
  inline: boolean
}

export interface Messages_channel_TextChannel_messages_TextMessage_embeds_footer {
  __typename: 'EmbedFooter'
  iconURL: string | null
  proxyIconURL: string | null
  text: string
}

export interface Messages_channel_TextChannel_messages_TextMessage_embeds_thumbnail {
  __typename: 'EmbedThumbnail'
  height: number
  width: number
  proxyURL: string
  url: string
}

export interface Messages_channel_TextChannel_messages_TextMessage_embeds_video {
  __typename: 'EmbedVideo'
  height: number
  width: number
  url: string
}

export interface Messages_channel_TextChannel_messages_TextMessage_embeds {
  __typename: 'MessageEmbed'
  title: string | null
  description: string | null
  url: string | null
  timestamp: any | null
  hexColor: string | null
  fields: Messages_channel_TextChannel_messages_TextMessage_embeds_fields[]
  footer: Messages_channel_TextChannel_messages_TextMessage_embeds_footer | null
  thumbnail: Messages_channel_TextChannel_messages_TextMessage_embeds_thumbnail | null
  video: Messages_channel_TextChannel_messages_TextMessage_embeds_video | null
}

export interface Messages_channel_TextChannel_messages_TextMessage {
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
  author: Messages_channel_TextChannel_messages_TextMessage_author
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
  reactions: Messages_channel_TextChannel_messages_TextMessage_reactions[]
  /**
   * Message attachments
   */
  attachments: Messages_channel_TextChannel_messages_TextMessage_attachments[]
  /**
   * Message embeds
   */
  embeds: Messages_channel_TextChannel_messages_TextMessage_embeds[] | null
}

export type Messages_channel_TextChannel_messages =
  | Messages_channel_TextChannel_messages_JoinMessage
  | Messages_channel_TextChannel_messages_TextMessage

export interface Messages_channel_TextChannel {
  __typename: 'TextChannel'
  id: any
  messages: Messages_channel_TextChannel_messages[] | null
}

export type Messages_channel =
  | Messages_channel_CategoryChannel
  | Messages_channel_TextChannel

export interface Messages {
  channel: Messages_channel | null
}

export interface MessagesVariables {
  channel: any
  around?: any | null
  before?: any | null
  after?: any | null
  limit?: number | null
}
