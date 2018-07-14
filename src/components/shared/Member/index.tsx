import { cx } from 'emotion'
import { connect } from 'fluent'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'

import {
  MemberInfo,
  MemberInfo_server_member,
  MemberInfoVariables
} from './__generated__/MemberInfo'
import MemberLink from './link'

const MEMBER_INFO = gql`
  query MemberInfo($server: ID!, $member: ID!) {
    server(id: $server) {
      member(id: $member) {
        name
        id
      }
    }
  }
`

interface Props {
  id: string
  className?: string
  children: (member: MemberInfo_server_member) => any
}

const Channel = connect<Props>()
  .with(({ state, signals, props }) => ({
    server: state.server
  }))
  .to(({ server, id: member, children, className }) => (
    <Query<MemberInfo, MemberInfoVariables>
      query={MEMBER_INFO}
      variables={{ server, member }}
    >
      {({ error, loading, data }) => {
        const success = !error && !loading && data && data.server
        const name = success ? `@${data.server.member.name}` : `<@${member}>`

        return (
          <MemberLink id={member} className={cx('member-link', className)}>
            {children({
              __typename: 'Member',
              name,
              id: member
            })}
          </MemberLink>
        )
      }}
    </Query>
  ))

export default Channel

export { default as MemberLink } from 'shared/Channel/link'
