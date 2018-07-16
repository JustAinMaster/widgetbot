import memoize from 'memoizee'

const DISCORD_CDN = /https:\/\/cdn.discordapp.com\/attachments\/(\d+)\/(\d+)\/(.+)\.(png|gif)/

const canUseWebP = memoize(() => {
  const elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }
  return false
})

const optimize = ({ width, height, url }) => {
  const match = url.match(DISCORD_CDN)

  if (match) {
    const [, id1, id2, file, type] = match

    return `https://media.discordapp.net/attachments/${id1}/${id2}/${file}.${type}?height=${height}&width=${width}${
      type === 'png' && canUseWebP() ? '&format=webp' : ''
    }`
  }

  return url
}

export default optimize
