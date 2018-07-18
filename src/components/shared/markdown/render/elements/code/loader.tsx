import * as React from 'react'

import { Code } from '.'

interface Props {
  children: string
  language?: string
}

class Highlighter extends React.Component<Props> {
  private mounted = true
  state = {
    highlighted: null
  }

  async componentWillUnmount() {
    this.mounted = false
  }

  async componentDidMount() {
    const { children, language } = this.props
    if (!language) return

    try {
      const hljs = await import('highlight.js')
      if (!this.mounted) return
      if (!hljs.getLanguage(language)) return

      const highlighted = hljs.highlight(language, children, true).value
      if (this.mounted) this.setState({ highlighted })
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
