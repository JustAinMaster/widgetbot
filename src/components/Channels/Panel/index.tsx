import { Mutation } from 'react-apollo'
import Tooltip from 'rc-tooltip'
import * as React from 'react'

import { Root, Version } from './elements'
import { OpenModal, OpenModalVariables } from 'queries/__generated__/OpenModal'
import { OPEN_MODAL } from 'queries/modal'

const { version } = require('../../../../package.json')

class Panel extends React.PureComponent {
  // toggleDev(name: string) {
  //   const { toggle } = this.props

  //   toggle({
  //     open: true,
  //     type: 'developer',
  //     data: name
  //   })
  // }

  // toggleAbout(event: Event) {
  //   const { toggle } = this.props
  //   event.preventDefault()

  //   toggle({
  //     open: true,
  //     type: 'about',
  //     data: null
  //   })
  // }

  render() {
    return (
      <Mutation<OpenModal, OpenModalVariables> mutation={OPEN_MODAL}>
        {openModal => (
          <Root>
            <Tooltip placement="top" overlay="About WidgetBot">
              <Version
                href={`https://widgetbot.io`}
                target="_blank"
                onClick={e => {
                  e.preventDefault()
                  openModal({ variables: { type: 'about', data: null } })
                }}
              >
                {`v${version}`}
              </Version>
            </Tooltip>
          </Root>
        )}
      </Mutation>
    )
  }
}

export default Panel
