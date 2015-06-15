domify = require 'domify'
cookie = require 'cookie'
bindTemplate = require 'bind-jade'

notificationBarView = bindTemplate require './views/notification-bar'

showCookieNotificationIfNeeded = ({cookieName, message, parentElement}) ->
    if not cookie cookieName
        notificationBar = domify notificationBarView {message}
        notificationBar.querySelector '.accept'
            .addEventListener 'click', ->
                cookie cookieName, '1', path: '/'
                notificationBar.classList.add 'closed'

        notificationBar.addEventListener 'transitionend', ->
            notificationBar.parentElement.removeChild notificationBar

        parentElement.insertBefore notificationBar, parentElement.firstChild

module.exports = showCookieNotificationIfNeeded
