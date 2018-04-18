export interface Message {
  id: string
  author: {
    name: string
    discriminator: string
    bot: boolean
    avatar: string | null
    id: string
    color: string
    roles: Role[] | null
  }
  timestamp: number
  content: string | null
  embeds: Embed[]
  editedAt: Date
  type: string
  reactions: undefined[] | Reaction[]
  attachment: {
    url: string | null
    height: number | null
    width: number | null
  }
  mentions: {
    channels: {
      name: string
      id: string
    }[]
    members: {
      name: string
      id: string
      roles: Role[] | null
      avatar: string
    }[]
    roles: {
      name: string
      color: string
      id: string
    }[]
    everyone: boolean
  }
}

interface Role {
  color: string
  position: number
  name: string
}

interface Embed {
  fields: {}[]
  footer: {}
  thumbnail: {}
  author: {}
  image: {}
  provider: {}
  video: {}
  embed: {}
  message: {}
}

interface Reaction {
  message: {
    id: string
  }
  id: string
  name: string
  count: number
}
