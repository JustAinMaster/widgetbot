import { connect } from 'fluent'
import * as React from 'react'

interface Props {
  id?: string
  className?: string
}

/**
 * Routable channel
 */
const MemberLink = connect<Props>()
  .with(({ state, signals, props }) => ({}))
  .toClass(
    props =>
      class Member extends React.PureComponent<typeof props> {
        // state = {
        //   url: null
        // }

        // static getDerivedStateFromProps(props, state) {
        //   if (props.id) {
        //     const path = location.pathname.split('/')
        //     const url =
        //       path.length > 5 ? props.id : `/channels/${path[2]}/${props.id}/`

        //     return { url }
        //   }

        //   return null
        // }

        // handleClick = (e: Event) => {
        //   const { url } = this.state
        //   if (!url) return

        //   const { switchChannel, id } = this.props
        //   e.preventDefault()

        //   history.pushState(null, null, url)

        //   switchChannel({
        //     channel: id
        //   })
        // }

        render() {
          // const { url } = this.state
          return (
            <a
              // href={url}
              {...{
                className: this.props.className,
                children: this.props.children
              }}
              // onClick={this.handleClick.bind(this)}
            />
          )
        }
      }
  )

export default MemberLink
