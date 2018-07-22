import autobind from 'autobind-decorator'
import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { DataProps, graphql, Mutation } from 'react-apollo'
import Hotkeys from 'react-hot-keys'

import { ModalInfo } from './__generated__/ModalInfo'
import About from './About'
import Authenticate from './Authenticate'
import { Box, Close, Image, OpenImage, Root, Content } from './elements'
import { CLOSE_MODAL, GET_MODAL } from 'queries/modal'
import { CloseModal } from 'queries/__generated__/CloseModal'
import Markdown from 'shared/markdown/render'

class Modal extends React.PureComponent<DataProps<ModalInfo>> {
  @autobind
  theme(theme) {
    return {
      ...theme,
      modal: this.props.data.modal
    }
  }

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

    if (modal.type === 'topic') {
      return (
        <Content>
          <Markdown>{modal.data}</Markdown>
        </Content>
      )
    }

    if (modal.type === 'about') {
      return <About />
    }

    return null
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Mutation<CloseModal> mutation={CLOSE_MODAL}>
          {close => (
            <Hotkeys keyName="escape" onKeyDown={close}>
              <Root
                onClick={e => (e.target === e.currentTarget ? close() : null)}
                className="modal"
              >
                <Box className="box">
                  <Close onClick={() => close()} className="close" />
                  <this.content complete={close} />
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
