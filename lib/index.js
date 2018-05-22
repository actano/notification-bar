import domify from 'domify'
import cookie from 'component-cookie'
import _debug from 'debug'

import './styles/notification-bar.styl'
import notificationBarTemplate from './views/notification-bar.jade'

const debug = _debug('notification-bar')

module.exports = ({ cookieName, message, parentElement, maxage }, iconStyling = { className: 'fa fa-times', content: '' }) => {
  if ((cookieName != null) && cookie(cookieName)) { return null }
  debug('init, cookieName: ', cookieName, 'maxage: ', maxage)
  const notificationBar = domify(notificationBarTemplate({ message, iconStyling }))
  notificationBar.querySelector('.accept')
    .addEventListener('click', () => {
      notificationBar.addEventListener('transitionend', (evt) => {
        if (evt.target === notificationBar) {
          debug('`close` transition finished, removing notificationBar element')
          notificationBar.parentElement.removeChild(notificationBar)
        }
      })
      if (cookieName != null) {
        cookie(cookieName, '1', { path: '/', maxage: maxage })
      }
      notificationBar.classList.add('closed')
    })

  return parentElement.insertBefore(notificationBar, parentElement.firstChild)
}
