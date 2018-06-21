import matchSorter from 'match-sorter'
import * as React from 'react'
import { Emoji, emojis } from 'styled-elements/Emoji/emojiMap'

import { Description, Icon, Name } from '../elements'

export const getSuggestions = (query: string) =>
  matchSorter(emojis, query, {
    keys: [
      {
        minRanking: matchSorter.rankings.STRING_CASE_ACRONYM,
        maxRanking: matchSorter.rankings.STARTS_WITH,
        threshold: matchSorter.rankings.STARTS_WITH,
        key: 'keywords'
      }
    ]
  })

export const toString = ({ keywords: [keyword] }: Emoji) => `:${keyword}:`

export const description = (query: string) => (
  <Description>
    Emoji matching <strong>{`:${query}`}</strong>
  </Description>
)

export const suggestion = ({ emoji, keywords: [keyword] }: Emoji) => (
  <React.Fragment>
    <Icon>{emoji}</Icon>
    <Name>{`:${keyword}:`}</Name>
  </React.Fragment>
)
