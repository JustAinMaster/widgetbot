import * as _ from 'lodash'
import Spinner from 'react-spinkit'
import Loadable from 'react-loadable'
import autobind from 'autobind-decorator'
import GET_MODAL from '@queries/ModalInfo.graphql'
import CLOSE_MODAL from '@queries/CloseModal.graphql'

import * as React from 'react'
import { DataProps, graphql, Mutation } from 'react-apollo'
import Hotkeys from 'react-hot-keys'

import { Root } from './elements'
import { ModalInfo } from '@generated/ModalInfo'
import { CloseModal } from '@generated/CloseModal'

export interface IScreenProps extends ModalInfo {
  close: () => void
}

@autobind
class Modal extends React.PureComponent<DataProps<ModalInfo>> {
  render() {
    const { modal } = this.props.data

    const Screen: any = Loadable({
      loader: () =>
        import(/* webpackMode: "lazy", webpackChunkName: "modal-screen-[index]" */ `./screens/${_.capitalize(
          modal.type
        )}`),
      loading: props =>
        props.pastDelay ? <Spinner name="ball-clip-rotate-multiple" /> : null
    })

    return (
      <Mutation<CloseModal> mutation={CLOSE_MODAL}>
        {close => (
          <Hotkeys keyName="escape" onKeyDown={close}>
            <Root
              onClick={e => (e.target === e.currentTarget ? close() : null)}
              open={modal.open}
              className="modal"
            >
              <Screen modal={modal} close={close} />
            </Root>
          </Hotkeys>
        )}
      </Mutation>
    )
  }
}

export default graphql(GET_MODAL)(Modal)
export { Box, Close, Content } from './elements'
