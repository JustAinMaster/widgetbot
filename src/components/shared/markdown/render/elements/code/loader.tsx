import * as React from 'react'

import { Code } from '.'

interface Props {
  children: string
  language?: string
}

class Highlighter extends React.Component<Props> {
  state = {
    highlighted: null
  }

  async componentDidMount() {
    const { children, language } = this.props
    console.log(1, language)
    if (!language) return

    try {
      const hljs = await import('highlight.js')
      if (!hljs.getLanguage(language)) return

      const highlighted = hljs.highlight(language, children, true).value
      this.setState({ highlighted })
    } catch (e) {}
  }

  render() {
    const { children } = this.props
    const { highlighted } = this.state

    return highlighted ? (
      <Code dangerouslySetInnerHTML={{ __html: highlighted }} />
    ) : (
      <Code>{children}</Code>
    )
  }
}

export default Highlighter
