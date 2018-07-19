import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { DataProps, graphql, Mutation } from 'react-apollo'
import Hotkeys from 'react-hot-keys'

import { ModalInfo } from './__generated__/ModalInfo'
import About from './About'
import Authenticate from './Authenticate'
import { Sam, Voakie } from './Developer'
import { Box, Close, Image, OpenImage, Root } from './elements'
import { CLOSE_MODAL, GET_MODAL } from 'queries/modal'
import { CloseModal } from 'queries/__generated__/CloseModal'

class Modal extends React.PureComponent<DataProps<ModalInfo>> {
  state = {
    open: false
  }
  timer

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps.data.modal
    if (open) {
      this.setState({ open })
    } else {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.setState({ open }), 100)
    }
  }

  theme = theme => ({
    ...theme,
    modal: this.props.data.modal
  })

  content = ({ complete }) => {
    const { modal } = this.props.data

    if (modal.type === 'authenticate') {
      return <Authenticate />
    }

    if (modal.type === 'image') {
      return (
        <React.Fragment>
          <Image src={modal.data} />
          <OpenImage href={modal.data} target="_blank" onClick={complete}>
            Open original
          </OpenImage>
        </React.Fragment>
      )
    }

    if (modal.type === 'about') {
      return <About />
    }

    if (modal.type === 'developer') {
      return modal.data === 'voakie' ? <Voakie /> : <Sam />
    }

    return null
  }

  render() {
    return (
      <ThemeProvider theme={this.theme.bind(this)}>
        <Mutation<CloseModal> mutation={CLOSE_MODAL}>
          {close => (
            <Hotkeys keyName="escape" onKeyDown={close}>
              <Root
                onClick={e => (e.target === e.currentTarget ? close() : null)}
                className="modal"
              >
                <Box className="box">
                  <Close onClick={() => close()} className="close" />
                  {this.state.open && <this.content complete={close} />}
                </Box>
              </Root>
            </Hotkeys>
          )}
        </Mutation>
      </ThemeProvider>
    )
  }
}

export default graphql(GET_MODAL)(Modal)
