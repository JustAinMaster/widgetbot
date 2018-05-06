import { connect } from 'fluent'
import Color from 'kolor'
import * as React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import styled from 'typed-emotion'

/**
 * Visible scrollbar
 */
export const Scrollable = styled(Scrollbars)`
  display: flex;
  height: 100%;
  width: 100%;
  & > div {
    &:nth-child(1) {
      overflow-x: hidden !important;
      overflow-y: scroll !important;
      & > div {
        &:nth-child(1) {
          margin-top: 15px;
        }
        &:last-child {
          margin-bottom: 15px;
        }
      }
    }
    &:nth-child(3) {
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 50px !important;
      width: 8px !important;
      & > div {
        cursor: default !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border-radius: 50px !important;
        width: 14px !important;
        margin-left: -3px !important;
        border: 3px solid ${({ theme }) => theme.colors.background};
      }
    }
  }
`

/**
 * Overlaid scrollbar
 */
export const OverlayedScroll = styled(Scrollbars)`
  & > div:nth-child(3) {
    & > div {
      cursor: default !important;
      opacity: 0;
      transition: opacity 0.1s ease;
      &:hover {
        opacity: 1;
      }
    }
  }
  & > div:hover + div + div {
    & > div {
      opacity: 1;
    }
  }
`

// prettier-ignore
export const Hash = styled('div')`
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3e%3cpath fill='${({ theme }) => encodeURIComponent(Color(theme.colors.primary).fadeOut(0.6).toString())}' d='M3.6 14l.5-2.7H1.4l.2-1.3h2.7L5 6H2.4l.2-1.3h2.7L5.7 2h1.4l-.5 2.7h4L11 2h1.3l-.5 2.7h2.7L14.4 6h-2.7l-.7 4h2.6l-.2 1.3h-2.7l-.4 2.7H8.9l.5-2.7h-4L5 14H3.6zm2.8-8l-.8 4h4l.8-4h-4z'/%3e%3c/svg%3e");
`

/**
 * Routable channel
 */
interface ChannelProps {
  id: string
  className?: string
}
export const Channel = connect<ChannelProps>()
  .with(({ state, signals, props }) => ({
    switchChannel: signals.switchChannel
  }))
  .toClass(
    props =>
      class Channel extends React.PureComponent<typeof props> {
        url: string

        componentWillMount() {
          this.url = this.getUrl()
        }

        getUrl() {
          const { id } = this.props
          const path = location.pathname.split('/')

          return path.length > 4 ? id : `/channels/${path[2]}/${id}/`
        }

        handleClick = (e: Event) => {
          const { switchChannel, id } = this.props
          e.preventDefault()

          history.pushState(null, null, this.url)

          switchChannel({
            channel: id
          })
        }

        render() {
          return (
            <a
              href={this.url}
              {...{
                className: this.props.className,
                children: this.props.children
              }}
              onClick={this.handleClick.bind(this)}
            />
          )
        }
      }
  )

/**
 * Expandable image
 */
export const ExpandableImage = connect<{ src: string }>()
  .with(({ state, signals, props }) => ({
    toggle: signals.modal
  }))
  .to(props => (
    <img
      {...props}
      onClick={() => {
        const { src, toggle } = props
        if (src) {
          toggle({
            open: true,
            type: 'image',
            data: src
          })
        }
      }}
    />
  ))
