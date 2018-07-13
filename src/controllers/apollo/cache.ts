import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

const introspectionQueryResultData = require('./codegen/fragmentTypes.json')
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })
persistCache({ cache, storage: localStorage })

export default cache
