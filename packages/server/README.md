# Discord embed server

[![Greenkeeper badge](https://badges.greenkeeper.io/samdenty99/server.svg?token=a5471ab4fb2cdbd6fe592bdfbb3c7e1c2a31ac3d6f8e199fb699a3ea1cea5f9a&ts=1526412148892)](https://greenkeeper.io/)

Server for hosting Discord embeds.

## Tools

- [Typescript](https://typescriptlang.org) - ensures everything is typed, allowing for effortless maintenance.
- [GraphQL](https://graphql.org/learn/) - for static data requests
- [Socket.IO](https://socket.io/) - for realtime requests
- [prettier](http://prettier.io) - for code formatting

## Setting up

First of all rename `config.example.ts` to `config.ts`. Open it up in a text editor and replace the appropiate values.

To start a development server, simple run the following:

```bash
# Install dependencies
yarn
# Start app
yarn start
```

Once you've done that, an API server will be running on `localhost:7000`. You can then start the `embed` repo.

## Testing

Cross-browser testing proudly sponsered by [BrowserStack](https://browserstack.com)

[![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)](https://browserstack.com
