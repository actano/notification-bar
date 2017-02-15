import domify from 'domify'
import cookie from 'component-cookie'
import './styles/notification-bar.styl'
import notificationBarTemplate from './views/notification-bar.jade'

module.exports = ({ cookieName, message, parentElement }, iconStyling = { className: 'fa fa-times', content: '' }) => {
  if ((cookieName != null) && cookie(cookieName)) { return null }

  const notificationBar = domify(notificationBarTemplate({ message, iconStyling }))
  notificationBar.querySelector('.accept')
        .addEventListener('click', () => {
          if (cookieName != null) { cookie(cookieName, '1', { path: '/' }) }
          notificationBar.classList.add('closed')
        })

  notificationBar.addEventListener('transitionend', () => notificationBar.parentElement.removeChild(notificationBar))

  return parentElement.insertBefore(notificationBar, parentElement.firstChild)
}
