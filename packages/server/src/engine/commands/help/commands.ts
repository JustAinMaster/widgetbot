import { IHelp } from 'engine/commands/types'
import pipe from 'function-pipe'

export type Command = [string, IHelp]

const modules = (require as any).context('../', true, /.\/*[a-zA-Z]\/index$/)

const getName = path => path.split('/')[1]
const getHelp = (paths): Command[] =>
  paths.map(path => [getName(path), modules(path).help])
const filterHelp = (commands: Command[]) =>
  commands.filter(command => !!command[1])

const commands = pipe(getHelp, filterHelp)(modules.keys()) as Command[]

export default commands
