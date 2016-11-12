/* eslint-disable
    guard-for-in,
    import/extensions,
    import/first,
    import/no-extraneous-dependencies,
    import/no-unresolved,
    no-return-assign,
    no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
import cookie from 'component~cookie@1.1.1'

const COOKIE_ACCEPTED_NAME = 'test-cookie'

import showNotificationBarIfNeeded from 'notification-bar'

describe('notification bar', () => {
  let mainContent = null

  before(() => {
    mainContent = document.createElement('div')
    return document.body.appendChild(mainContent)
  })

  after(() => {
        // show the notification bar for demo purposes
    mainContent.innerHTML = ''
    return showNotificationBarIfNeeded({ parentElement: mainContent, message: 'Hello, World!', cookieName: COOKIE_ACCEPTED_NAME })
  })

  beforeEach(() => {
        // reset cookies
    for (const cookieName in cookie()) {
      cookie(cookieName, null, { path: '/' })
    }

        // reset notification bar
    return mainContent.innerHTML = ''
  })

  describe('with cookieName', () => {
    it('should render if cookie is not there', () => {
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME })

      return expect(document.querySelector('.notificationBar-container')).to.exist
    })

    it('should not render if cookie is already there', () => {
      cookie(COOKIE_ACCEPTED_NAME, '1', { path: '/' })
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME })

      return expect(document.querySelector('#navigation-bar')).to.not.exist
    })

    it('should close when "x" is clicked', () => {
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME })
      document.querySelector('.accept').click()

      return expect(document.querySelector('.notificationBar-container').classList.contains('closed')).to.be.true
    })

    return it('should set the cookie when closing', () => {
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME })
      document.body.querySelector('.accept').click()

      return expect(cookie(COOKIE_ACCEPTED_NAME)).to.equal('1')
    })
  })

  return describe('without cookieName', () => {
    it('should always render', () => {
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo' })

      return expect(document.querySelector('.notificationBar-container')).to.exist
    })

    it('should close when "x" is clicked', () => {
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo' })
      document.querySelector('.accept').click()

      return expect(document.querySelector('.notificationBar-container').classList.contains('closed')).to.be.true
    })

    return it('should not set the cookie when closing', () => {
      showNotificationBarIfNeeded({ parentElement: mainContent, message: 'foo' })
      document.body.querySelector('.accept').click()

      return expect(cookie()).to.deep.equal({})
    })
  })
})
