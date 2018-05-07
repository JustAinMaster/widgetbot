import * as React from 'react'

import {
  Bio,
  Card,
  Chip,
  Description,
  Graph,
  Heading,
  Mugshot,
  Root,
} from '../elements'

class Developer extends React.PureComponent {
  render() {
    return (
      <Card>
        <Root>
          <Mugshot src="https://cdn.samdd.me/static/widgetbot/avatar.svg" />
          <Bio>
            <Heading>samdd</Heading>
            <Description>
              {`Hey there! I build products for humans.\nI started the second iteration of this service from scratch.\n`}
            </Description>

            <Chip href="https://samdd.me/r?github">GitHub</Chip>
            <Chip href="https://twitter.com/thesamdd">Twitter</Chip>
            <Chip href="https://samdd.me">Site</Chip>
            <Chip
              // href="/channels/335836376031428618/339910176956219403/"
              href="https://discord.gg/dxxFh9Q"
            >
              Discord
            </Chip>
          </Bio>
        </Root>
        <Graph
          username="samdenty99"
          onClick={() => window.open('https://samdd.me/r?github')}
        />
      </Card>
    )
  }
}

export default Developer
