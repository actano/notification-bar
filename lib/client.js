/* eslint-disable
    consistent-return,
    import/no-extraneous-dependencies,
    import/no-unresolved,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
import domify from 'domify'
import cookie from 'cookie'
import bindTemplate from 'bind-jade'

const notificationBarView = bindTemplate(require('./views/notification-bar'))

export default function ({ cookieName, message, parentElement }) {
  if ((cookieName != null) && cookie(cookieName)) { return }

  const notificationBar = domify(notificationBarView({ message }))
  notificationBar.querySelector('.accept')
        .addEventListener('click', () => {
          if (cookieName != null) { cookie(cookieName, '1', { path: '/' }) }
          return notificationBar.classList.add('closed')
        })

  notificationBar.addEventListener('transitionend', () => notificationBar.parentElement.removeChild(notificationBar))

  return parentElement.insertBefore(notificationBar, parentElement.firstChild)
}
