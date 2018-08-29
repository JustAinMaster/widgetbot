import { OpenModal, OpenModalVariables } from '@generated'
import OPEN_MODAL from '@queries/OpenModal.graphql'
import Tooltip from 'rc-tooltip'
import * as React from 'react'
import { Mutation } from 'react-apollo'

import { Root, Settings, Version } from './elements'
import { Trans } from '@lingui/react'

const { version } = require('../../../../package.json')

class Panel extends React.PureComponent {
  render() {
    return (
      <Mutation<OpenModal, OpenModalVariables> mutation={OPEN_MODAL}>
        {openModal => (
          <Root className="panel">
            <Tooltip
              placement="top"
              overlay={<Trans id="Panel.settings">Settings</Trans>}
            >
              <Settings
                onClick={_ =>
                  openModal({ variables: { type: 'settings', data: null } })
                }
              />
            </Tooltip>
            {/* <Tooltip
              placement="top"
              overlay={<Trans id="Panel.about">About</Trans>}
            >
              <Version
                href={`https://widgetbot.io`}
                target="_blank"
                onClick={e => {
                  e.preventDefault()
                  openModal({ variables: { type: 'settings', data: null } })
                }}
              >
                {`v${version}`}
              </Version>
            </Tooltip> */}
          </Root>
        )}
      </Mutation>
    )
  }
}

export default Panel
