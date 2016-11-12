domify = require 'domify'
cookie = require 'cookie'
bindTemplate = require 'bind-jade'

notificationBarView = bindTemplate require './views/notification-bar'

module.exports = ({cookieName, message, parentElement}) ->
    return if cookieName? and cookie cookieName

    notificationBar = domify notificationBarView {message}
    notificationBar.querySelector '.accept'
        .addEventListener 'click', ->
            cookie cookieName, '1', path: '/' if cookieName?
            notificationBar.classList.add 'closed'

    notificationBar.addEventListener 'transitionend', ->
        notificationBar.parentElement.removeChild notificationBar

    parentElement.insertBefore notificationBar, parentElement.firstChild
