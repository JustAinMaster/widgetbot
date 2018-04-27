import * as React from 'react'
import { connect } from 'fluent'

import { Root, Field } from './elements'
import Emoji from './Emoji'
import Input from './Input'

export default connect()
  .with(({ state, signals, props }) => ({}))
  .toClass(
    props =>
      class Chat extends React.PureComponent<typeof props> {
        render() {
          return (
            <Root>
              <Field>
                <Input />
                <Emoji />
              </Field>
            </Root>
          )
        }
      }
  )
