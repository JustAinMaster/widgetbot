# @widgetbot/embed-api

```ts
import { Client } from '@widgetbot/embed-api'

const api = new Client(...)

api.on('signIn', (data) => {
  console.log('signed in as', data.name)

  api.emit('sendMessage', 'Hello world!')
})
```

# @widgetbot/react-embed

```ts
import { Embed } from 'react-embed'

class App extends React.Component {
  loaded(embed: Embed) {
    embed.on('signIn', data => {
      console.log('signed in as', data.name)

      embed.emit('sendMessage', 'Hello world!')
    })
  }

  render() {
    return (
      <WidgetBot
        server="343290429402"
        channel="29340209492304"
        onLoad={this.loaded.bind(this)}
      />
    )
  }
}
```

# @widgetbot/html-embed

```html
<widgetbot server="343290429402" channel="29340209492304" id="test" />
<script src="https://cdn.widgetbot.io/html-embed.js"></script>

<script>
const embed = document.querySelector('#test')

embed.on('signIn', data => {
  console.log('signed in as', data.name)

  embed.emit('sendMessage', 'Hello world!')
})
</script>
```
