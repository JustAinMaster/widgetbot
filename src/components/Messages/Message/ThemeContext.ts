import { Messages_server_channel_messages } from 'queries/__generated__/Messages'
import styled, { ThemedReactEmotionInterface } from 'react-emotion'
import { Theme } from 'typed-emotion'

export * from 'typed-emotion'

interface Context extends Theme {
  message: Messages_server_channel_messages
}
export default styled as ThemedReactEmotionInterface<Context>
