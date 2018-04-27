import * as React from 'react'
import * as N from 'react-notification-system'
import { Notifications } from './elements'

const initial: N.Notification[] = []
let ref

export const addNotification = (
  notification: N.Notification | N.Notification[]
) => {
  if (notification instanceof Array) {
    for (let notif of notification) {
      if (!ref) {
        initial.push(notif)
      } else {
        ref(notif)
      }
    }
  } else {
    if (!ref) {
      initial.push(notification)
    } else {
      ref(notification)
    }
  }
}

class Notify extends React.PureComponent {
  notifications: N.System

  render() {
    return (
      <Notifications>
        <N ref={ref => (this.notifications = ref)} />
      </Notifications>
    )
  }

  componentDidMount() {
    if (initial.length) {
      for (let notification of initial) {
        this.addNotification(notification)
      }
    }
    ref = this.addNotification.bind(this)
  }

  addNotification(notification: N.Notification) {
    if (this.notifications) {
      this.notifications.addNotification({
        position: 'br',
        ...notification
      })
    }
  }
}

export default Notify

// Debugging
if (window) {
  ;(window as any).addNotification = addNotification
}
