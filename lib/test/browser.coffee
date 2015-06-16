cookie = require 'component~cookie@1.1.1'

COOKIE_ACCEPTED_NAME = 'test-cookie'

showNotificationBarIfNeeded = require 'notification-bar'

describe 'notification bar', ->
    mainContent = null

    beforeEach ->
        mainContent = document.body

        # reset cookies
        for cookieName of cookie()
            cookie cookieName, null, path: '/'

        # reset notification bar
        mainContent.innerHTML = ''

    describe 'with cookieName', ->
        it 'should render if cookie is not there', ->
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME

            expect(document.querySelector '.notificationBar-container').to.exist

        it 'should not render if cookie is already there', ->
            cookie COOKIE_ACCEPTED_NAME, '1', path: '/'
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME

            expect(document.querySelector '#navigation-bar').to.not.exist

        it 'should close when "x" is clicked', ->
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME
            document.querySelector('.accept').click()

            expect(document.querySelector('.notificationBar-container').classList.contains 'closed').to.be.true

        it 'should set the cookie when closing', ->
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME
            document.body.querySelector('.accept').click()

            expect(cookie COOKIE_ACCEPTED_NAME).to.equal '1'

    describe 'without cookieName', ->
        it 'should always render', ->
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo'

            expect(document.querySelector '.notificationBar-container').to.exist

        it 'should close when "x" is clicked', ->
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo'
            document.querySelector('.accept').click()

            expect(document.querySelector('.notificationBar-container').classList.contains 'closed').to.be.true

        it 'should not set the cookie when closing', ->
            showNotificationBarIfNeeded parentElement: mainContent, message: 'foo'
            document.body.querySelector('.accept').click()

            expect(cookie()).to.deep.equal {}
