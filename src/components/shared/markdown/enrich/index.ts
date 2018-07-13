import pipe from 'function-pipe'
import customEmojis from 'shared/markdown/enrich/customEmojis'

import mentions from './mentions'

const enrich: (message: string) => string = pipe(
  mentions,
  customEmojis
)

export default enrich
