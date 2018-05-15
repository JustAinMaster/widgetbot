import { connect } from 'fluent'
import * as React from 'react'

import { Developer, Developers, Root, Version } from './elements'

const { version } = require('../../../../package.json')

export default connect()
  .with(({ state, signals, props }) => ({
    toggle: signals.modal
  }))
  .toClass(
    props =>
      class Panel extends React.PureComponent<typeof props> {
        toggleDev(name: string) {
          const { toggle } = this.props

          toggle({
            open: true,
            type: 'developer',
            data: name
          })
        }

        toggleAbout(event: Event) {
          const { toggle } = this.props
          event.preventDefault()

          toggle({
            open: true,
            type: 'about',
            data: null
          })
        }

        render() {
          const sam = (
            <Developer
              src="https://cdn.samdd.me/static/widgetbot/avatar.svg"
              onClick={() => this.toggleDev('samdd')}
              key="sam"
            />
          )
          const voakie = (
            <Developer
              src="https://voakie.com/favicon/android-icon-36x36.png"
              onClick={() => this.toggleDev('voakie')}
              key="voakie"
            />
          )

          return (
            <Root>
              <Developers>
                {Math.random() > 0.7 ? [voakie, sam] : [sam, voakie]}
              </Developers>

              <Version
                href={`https://github.com/widgetbot-io/embed`}
                target="_blank"
                onClick={this.toggleAbout.bind(this)}
              >
                {`v${version}`}
              </Version>
            </Root>
          )
        }
      }
  )
