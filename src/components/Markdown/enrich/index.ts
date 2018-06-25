import pipe from 'function-pipe'
import customEmojis from 'markdown/enrich/customEmojis'

import mentions from './mentions'

const enrich: (message: string) => string = pipe(
  mentions,
  customEmojis
)

export default enrich
