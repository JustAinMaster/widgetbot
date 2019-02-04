import path from 'path'

const dev = process.env.NODE_ENV === 'development'

export const data = dev
  ? path.join(__dirname, '../../../../data/')
  : path.join(__dirname, './data/')

export const embed = dev
  ? path.join(__dirname, '../../../../../embed/build/')
  : path.join(__dirname, './www/channels/')

export const configurator = dev
  ? path.join(__dirname, '../../../../../configurator/public/')
  : path.join(__dirname, './www/')
