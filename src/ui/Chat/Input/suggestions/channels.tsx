import controller from '@lib/cerebral'
import { Hash } from '@ui/shared/Channel'
import matchSorter from 'match-sorter'
import * as React from 'react'

import { Channel } from '../../../../store/types'
import { Description, Icon, Info, Name } from '../elements'
import { Suggestion } from '../types'

const Channels: Suggestion<Channel> = {
  getSuggestions: query =>
    matchSorter(controller.state.channels.values(), query, {
      keys: [
        {
          minRanking: matchSorter.rankings.STRING_CASE_ACRONYM,
          maxRanking: matchSorter.rankings.STARTS_WITH,
          threshold: matchSorter.rankings.STARTS_WITH,
          key: 'name'
        }
      ]
    }),

  extract: query => query[0] === '#' && query.substring(1),
  toString: ({ name }) => `#${name}`,

  description: query => (
    <Description>
      Text Channels
      {query && [` matching `, <strong>{`#${query}`}</strong>]}
    </Description>
  ),

  // @ts-ignore
  suggestion: ({ name, category }) => (
    <>
      <Icon>
        <Hash />
      </Icon>
      <Name>{name}</Name>
      <Info>{category}</Info>
    </>
  )
}

export default Channels
