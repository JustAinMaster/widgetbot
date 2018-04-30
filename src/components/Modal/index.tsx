import * as React from 'react'
import { connect } from 'fluent'
import { ThemeProvider } from 'emotion-theming'

import { Root, Box, Close, Image, OpenImage } from './elements'

export default connect()
  .with(({ state, signals, props }) => ({
    modal: state.modal,
    toggle: signals.modal
  }))
  .toClass(
    props =>
      class Modal extends React.PureComponent<typeof props> {
        theme = theme => ({
          ...theme,
          modal: this.props.modal
        })

        content = () => {
          const { modal } = this.props

          if (modal.type === 'image') {
            return (
              <React.Fragment>
                <Image src={modal.data} />
                <OpenImage
                  href={modal.data}
                  target="_blank"
                  onClick={this.close.bind(this)}
                >
                  Open original
                </OpenImage>
              </React.Fragment>
            )
          }
          return null
        }

        render() {
          return (
            <ThemeProvider theme={this.theme.bind(this)}>
              <Root
                onClick={e =>
                  e.target === e.currentTarget ? this.close() : null
                }
              >
                <Box>
                  <Close onClick={this.close.bind(this)} />
                  <this.content />
                </Box>
              </Root>
            </ThemeProvider>
          )
        }

        componentDidMount() {
          window.addEventListener('keydown', this.listener)
        }

        componentWillUnmount() {
          window.removeEventListener('keydown', this.listener)
        }

        listener = ({ keyCode }) => {
          const { modal } = this.props

          if (modal.open) {
            switch (keyCode) {
              case 27:
              case 8: {
                this.close()
              }
            }
          }
        }

        close() {
          const { toggle } = this.props

          toggle({
            open: false
          })
        }
      }
  )
