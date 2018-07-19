import gql from 'graphql-tag'

export const OPEN_MODAL = gql`
  mutation OpenModal($type: ID!, $data: String) {
    openModal(type: $type, data: $data) @client
  }
`

export const CLOSE_MODAL = gql`
  mutation CloseModal {
    closeModal @client
  }
`

export const GET_MODAL = gql`
  query ModalInfo {
    modal @client {
      open
      type
      data
    }
  }
`
