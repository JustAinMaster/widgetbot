import { setupI18n } from '@lingui/core'

const i18n = setupI18n({ language: 'en' })

export const loadCatalog = async (language: string) => {
  const catalog = await import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
  `../locale/${language}/messages.js`)

  i18n.load({ [language]: catalog })

  return catalog
}

export default i18n
