import { ClientStateConfig } from 'apollo-link-state'
import i18n, { loadCatalog } from '@lib/i18n'

const locale: ClientStateConfig = {
  defaults: {
    language: 'en',
    locale: []
  },
  resolvers: {
    Mutation: {
      async setLanguage(_, { name }, { cache }) {
        try {
          var catalog = await loadCatalog(name)
        } catch (e) {
          throw new Error(`Specified language hasn't been translated!`)
        }

        i18n.activate(name)

        cache.writeData({
          id: '$ROOT_QUERY.language',
          language: name
        })

        return this.locale
      }
    }
  }
}

export default locale
