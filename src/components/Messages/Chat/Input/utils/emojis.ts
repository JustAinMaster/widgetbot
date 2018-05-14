import emojiMap from 'styled-elements/Emoji/emojiMap'

export function getEmojiMatches(query) {
  const matches = []
  Object.keys(emojiMap).forEach(keyword => {
    const character = emojiMap[keyword]
    const matchingIndex = keyword === query ? 0 : keyword.indexOf(query)

    if (matchingIndex !== -1) {
      matches.push({
        keyword: `:${keyword}:`,
        character,
        index: matchingIndex + keyword.length
      })
    }
  })

  return matches.sort((a, b) => {
    return a.index - b.index
  })
}
