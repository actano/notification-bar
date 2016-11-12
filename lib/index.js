import 'font-awesome/css/font-awesome.css'
import domify from 'domify'
import cookie from 'component-cookie'
import notificationBarTemplate from './views/notification-bar.jade'

export default function ({ cookieName, message, parentElement }) {
  if ((cookieName != null) && cookie(cookieName)) { return null }

  const notificationBar = domify(notificationBarTemplate({ message }))
  notificationBar.querySelector('.accept')
        .addEventListener('click', () => {
          if (cookieName != null) { cookie(cookieName, '1', { path: '/' }) }
          notificationBar.classList.add('closed')
        })

  notificationBar.addEventListener('transitionend', () => notificationBar.parentElement.removeChild(notificationBar))

  return parentElement.insertBefore(notificationBar, parentElement.firstChild)
}
