import * as React from 'react'
import * as N from 'react-notification-system'

import { Notifications } from './elements'

const initial: N.Notification[] = []
let ref

export const addNotification = (
  notifications: N.Notification | N.Notification[]
) => {
  if (!(notifications instanceof Array)) notifications = [notifications]

  for (const n of notifications) {
    const notification = {
      ...n,
      message:
        typeof n.message === 'string' ? n.message : JSON.stringify(n.message)
    }

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
