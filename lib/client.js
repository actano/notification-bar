/* eslint-disable
    import/no-unresolved,
*/
import domify from 'domify'
import cookie from 'cookie'
import bindTemplate from 'bind-jade'

const notificationBarView = bindTemplate(require('./views/notification-bar'))

export default function ({ cookieName, message, parentElement }) {
  if ((cookieName != null) && cookie(cookieName)) { return null }

  const notificationBar = domify(notificationBarView({ message }))
  notificationBar.querySelector('.accept')
        .addEventListener('click', () => {
          if (cookieName != null) { cookie(cookieName, '1', { path: '/' }) }
          notificationBar.classList.add('closed')
        })

  notificationBar.addEventListener('transitionend', () => notificationBar.parentElement.removeChild(notificationBar))

  return parentElement.insertBefore(notificationBar, parentElement.firstChild)
}
