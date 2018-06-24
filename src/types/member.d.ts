export interface Member {
  name: string
  tag: string
  discriminator: string

  id: string
  avatarURL: string

  status: string
  roles: string[]
}
