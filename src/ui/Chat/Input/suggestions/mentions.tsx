import matchSorter from 'match-sorter'
import * as React from 'react'

import controller from '@lib/cerebral'
import { Member } from '../../../../types/member'
import { Description, Icon, Info, Name } from '../elements'
import { Suggestion } from '../types'

const Mentions: Suggestion<Member> = {
  getSuggestions: query =>
    matchSorter(controller.state.members.values(), query, {
      keys: [
        {
          minRanking: matchSorter.rankings.STRING_CASE_ACRONYM,
          maxRanking: matchSorter.rankings.STARTS_WITH,
          threshold: matchSorter.rankings.STARTS_WITH,
          key: 'name'
        }
      ]
    }),

  extract: query => query[0] === '@' && query.substring(1),
  toString: ({ tag }) => `@${tag}`,

  description: query => (
    <Description>
      Members
      {query && [` matching `, <strong>{`@${query}`}</strong>]}
    </Description>
  ),

  suggestion: ({ name, tag, avatarURL }) => (
    <>
      <Icon src={avatarURL} />
      <Name>{name}</Name>
      <Info>{tag}</Info>
    </>
  )
}

export default Mentions
