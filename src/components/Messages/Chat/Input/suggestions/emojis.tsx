import matchSorter from 'match-sorter'
import * as React from 'react'
import { Emoji, emojis } from 'styled-elements/Emoji/emojiMap'

import controller from '../../../../../controllers/cerebral'
import { Description, Icon, Name } from '../elements'
import { Suggestion } from '../types'

const Emojis: Suggestion<Emoji> = {
  getSuggestions: query =>
    matchSorter([...controller.state.emojis.values(), ...emojis], query, {
      keys: [
        {
          minRanking: matchSorter.rankings.STRING_CASE_ACRONYM,
          maxRanking: matchSorter.rankings.STARTS_WITH,
          threshold: matchSorter.rankings.STARTS_WITH,
          key: 'keywords'
        }
      ]
    }),
  extract: query =>
    query.length > 2 &&
    query[0] === ':' &&
    query[1] !== ':' &&
    query.substring(1),

  toString: ({ keywords: [keyword] }) => `:${keyword}:`,

  description: query => (
    <Description>
      Emoji
      {query && [` matching `, <strong>{`:${query}`}</strong>]}
    </Description>
  ),

  suggestion: ({ category, emoji, keywords: [keyword] }) => (
    <React.Fragment>
      {category === 'custom' ? (
        <Icon src={`https://cdn.discordapp.com/emojis/${emoji}.png`} />
      ) : (
        <Icon>{emoji}</Icon>
      )}
      <Name>{`:${keyword}:`}</Name>
    </React.Fragment>
  )
}

export default Emojis
