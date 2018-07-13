import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import cacheRedirects from './cacheRedirects'

const introspectionQueryResultData = require('../codegen/fragmentTypes.json')
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher, cacheRedirects })
persistCache({ cache, storage: localStorage })

export default cache
