cookie = require 'cookie'
{expect} = require 'chai'

COOKIE_ACCEPTED_NAME = 'test-cookie'

showCookieNotificationIfNeeded = require 'legal-notification-cookies'

describe 'legal-notification-cookies', ->
    mainContent = null

    beforeEach ->
        mainContent = document.body

        # reset cookie
        cookie COOKIE_ACCEPTED_NAME, null, path: '/'

        # reset notification bar
        mainContent.innerHTML = ''

    it 'should render if cookie is not there', ->
        showCookieNotificationIfNeeded mainContent

        expect(document.querySelector '#notification-bar').to.exist

    it 'should not render if cookie is already there', ->
        cookie COOKIE_ACCEPTED_NAME, '1', path: '/'
        showCookieNotificationIfNeeded mainContent

        expect(document.querySelector '#navigation-bar').to.not.exist

    it 'should close when "x" is clicked', ->
        showCookieNotificationIfNeeded mainContent
        document.querySelector('.accept').click()

        expect(document.querySelector('#notification-bar').classList.contains 'closed').to.be.true

    it 'should set the cookie when closing', ->
        showCookieNotificationIfNeeded mainContent
        document.body.querySelector('.accept').click()

        expect(cookie COOKIE_ACCEPTED_NAME).to.equal '1'
