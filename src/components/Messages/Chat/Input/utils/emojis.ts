import emojiKeywords from 'emojis-keywords'
import emojiList from 'emojis-list'

export const emojis = emojiKeywords.map((keyword, index) => {
  return {
    keyword: emojiKeywords[index],
    character: emojiList[index]
  }
})

export function getEmojiMatches(query) {
  const matches = []
  emojis.forEach(emoji => {
    const matchingIndex =
      emoji.keyword === `:${query}:` ? 0 : emoji.keyword.indexOf(query)

    if (matchingIndex !== -1) {
      matches.push({
        ...emoji,
        index: matchingIndex + emoji.keyword.length
      })
    }
  })

  return matches.sort((a, b) => {
    return a.index - b.index
  })
}
