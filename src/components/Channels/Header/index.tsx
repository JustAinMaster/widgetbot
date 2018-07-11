import { connect } from 'fluent'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'

import { Count, Icon, Name, Root } from './elements'

const GET_INFO = gql`
  query ServerInfo($server: ID!) {
    server(id: $server) {
      name
      icon
      memberCount
    }
  }
`

export default connect()
  .with(({ state, signals, props }) => ({
    server: state.server
  }))
  .to(({ server }) => (
    <InfoQuery
      query={GET_INFO}
      variables={{ server }}
      fetchPolicy="cache-first"
    >
      {({ loading, error, data }) => {
        if (loading || !data.server) return null
        if (error) return null

        const plural = data.server.memberCount !== 1

        return (
          <Root className="header">
            <Icon src={data.server.icon} className="icon" />
            <Name className="name">{data.server.name}</Name>
            <Count
              title={`${data.server.memberCount} ${
                plural ? 'members' : 'member'
              } in this server`}
              className="count"
            >
              {data.server.memberCount}
            </Count>
          </Root>
        )
      }}
    </InfoQuery>
  ))

interface Data {
  server: {
    name: string
    icon: string
    memberCount: number
  }
}

interface Variables {
  server: string
}

class InfoQuery extends Query<Data, Variables> {}
