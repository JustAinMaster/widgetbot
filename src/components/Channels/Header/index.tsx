import { connect } from 'fluent'
import gql from 'graphql-tag'
import Tooltip from 'rc-tooltip'
import * as React from 'react'
import { Query } from 'react-apollo'

import { ServerInfo, ServerInfoVariables } from './__generated__/ServerInfo'
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
    <Query<ServerInfo, ServerInfoVariables>
      query={GET_INFO}
      variables={{ server }}
      fetchPolicy="cache-first"
    >
      {({ loading, error, data }) => {
        if (loading || !data) return null
        if (error) return null

        const plural = data.server.memberCount !== 1

        return (
          <Root className="header">
            <Icon src={data.server.icon} className="icon" />
            <Name className="name">{data.server.name}</Name>
            <Tooltip
              placement="bottom"
              overlay={`${data.server.memberCount} ${
                plural ? 'members' : 'member'
              } in this server`}
            >
              <Count className="count">{data.server.memberCount}</Count>
            </Tooltip>
          </Root>
        )
      }}
    </Query>
  ))
