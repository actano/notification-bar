import cookie from 'component~cookie@1.1.1';

let COOKIE_ACCEPTED_NAME = 'test-cookie';

import showNotificationBarIfNeeded from 'notification-bar';

describe('notification bar', function() {
    let mainContent = null;

    before(function() {
        mainContent = document.createElement('div');
        return document.body.appendChild(mainContent);
    });

    after(function() {
        // show the notification bar for demo purposes
        mainContent.innerHTML = '';
        return showNotificationBarIfNeeded({parentElement: mainContent, message: 'Hello, World!', cookieName: COOKIE_ACCEPTED_NAME});
    });

    beforeEach(function() {
        // reset cookies
        for (let cookieName in cookie()) {
            cookie(cookieName, null, {path: '/'});
        }

        // reset notification bar
        return mainContent.innerHTML = '';
    });

    describe('with cookieName', function() {
        it('should render if cookie is not there', function() {
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME});

            return expect(document.querySelector('.notificationBar-container')).to.exist;
        });

        it('should not render if cookie is already there', function() {
            cookie(COOKIE_ACCEPTED_NAME, '1', {path: '/'});
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME});

            return expect(document.querySelector('#navigation-bar')).to.not.exist;
        });

        it('should close when "x" is clicked', function() {
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME});
            document.querySelector('.accept').click();

            return expect(document.querySelector('.notificationBar-container').classList.contains('closed')).to.be.true;
        });

        return it('should set the cookie when closing', function() {
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo', cookieName: COOKIE_ACCEPTED_NAME});
            document.body.querySelector('.accept').click();

            return expect(cookie(COOKIE_ACCEPTED_NAME)).to.equal('1');
        });
    });

    return describe('without cookieName', function() {
        it('should always render', function() {
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo'});

            return expect(document.querySelector('.notificationBar-container')).to.exist;
        });

        it('should close when "x" is clicked', function() {
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo'});
            document.querySelector('.accept').click();

            return expect(document.querySelector('.notificationBar-container').classList.contains('closed')).to.be.true;
        });

        return it('should not set the cookie when closing', function() {
            showNotificationBarIfNeeded({parentElement: mainContent, message: 'foo'});
            document.body.querySelector('.accept').click();

            return expect(cookie()).to.deep.equal({});});});});
