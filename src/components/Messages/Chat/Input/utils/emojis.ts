import emojiMap from 'styled-elements/Emoji/emojiMap'

export function getEmojiMatches(query) {
  const matches = []

  Object.keys(emojiMap).forEach(character =>
    emojiMap[character].forEach(keyword => {
      const matchingIndex = keyword === query ? 0 : keyword.indexOf(query)

      console.log(keyword)
      if (matchingIndex !== -1) {
        matches.push({
          keyword: `:${keyword}:`,
          character,
          index: matchingIndex + keyword.length
        })
      }
    })
  )

  return matches.sort((a, b) => {
    return a.index - b.index
  })
}
