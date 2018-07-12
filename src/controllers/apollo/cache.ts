import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache({})
persistCache({ cache, storage: localStorage })

export default cache
