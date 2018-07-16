const DISCORD_CDN = /https:\/\/cdn.discordapp.com\/attachments\/(\d+)\/(\d+)\/(.+)\.(png|gif)/

const optimize = ({ width, height, url }) => {
  const match = url.match(DISCORD_CDN)

  if (match) {
    const [, id1, id2, file, type] = match

    return `https://media.discordapp.net/attachments/${id1}/${id2}/${file}.${type}?height=${height}&width=${width}${
      type === 'png' ? '&format=webp' : ''
    }`
  }

  return url
}

export default optimize
