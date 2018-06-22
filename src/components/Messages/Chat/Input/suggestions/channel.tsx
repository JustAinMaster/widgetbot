import matchSorter from 'match-sorter'
import * as React from 'react'

import controller from '../../../../../controllers/cerebral'
import { Channel } from '../../../../../types/responses'
import { Description, Icon, Name } from '../elements'

// Get suggestions for a query
export const getSuggestions = (query: string) =>
  matchSorter(controller.state.channels.values(), query, {
    keys: [
      {
        minRanking: matchSorter.rankings.STRING_CASE_ACRONYM,
        maxRanking: matchSorter.rankings.STARTS_WITH,
        threshold: matchSorter.rankings.STARTS_WITH,
        key: 'name'
      }
    ]
  })

// Extract the emoji name from a query
export const extract = (query: string) => query[0] === '#' && query.substring(1)

// Convert the emoji to a string
export const toString = ({ name }: Channel) => `#${name}`

// Render a description for a query
export const description = (query: string) => (
  <Description>Text Channels</Description>
)

// Render a suggestion for an emoji
export const suggestion = ({ name }: Channel) => (
  <React.Fragment>
    <Icon>😊</Icon>
    <Name>{`#${name}`}</Name>
  </React.Fragment>
)
