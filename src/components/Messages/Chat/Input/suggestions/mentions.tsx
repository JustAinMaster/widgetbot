import matchSorter from 'match-sorter'
import * as React from 'react'

import parseUsername, { Username } from '../../../Message/parseUsername'
import { Description, Icon, Info, Name } from '../elements'
import { Suggestion } from '../types'

interface Mention {
  avatar: string
  username: Username
}

const users: Mention[] = [
  {
    username: parseUsername('samdd#3245'),
    avatar:
      'https://cdn.discordapp.com/avatars/294916911194570754/fb6276c39d47d5c6c0d65f922d43b116.png?size=64'
  }
]

const Mentions: Suggestion<Mention> = {
  getSuggestions: query =>
    matchSorter(users, query, {
      keys: [
        {
          minRanking: matchSorter.rankings.STRING_CASE_ACRONYM,
          maxRanking: matchSorter.rankings.STARTS_WITH,
          threshold: matchSorter.rankings.STARTS_WITH,
          key: 'username.name'
        }
      ]
    }),

  extract: query => query[0] === '@' && query.substring(1),
  toString: ({ username }) => `@${username}`,

  description: query => (
    <Description>
      Members
      {query && [` matching `, <strong>{`@${query}`}</strong>]}
    </Description>
  ),

  suggestion: ({ username, avatar }) => (
    <React.Fragment>
      <Icon src={avatar} />
      <Name>{username.name}</Name>
      <Info>{username}</Info>
    </React.Fragment>
  )
}

export default Mentions
