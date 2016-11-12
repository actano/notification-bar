import domify from 'domify';
import cookie from 'cookie';
import bindTemplate from 'bind-jade';

let notificationBarView = bindTemplate(require('./views/notification-bar'));

export default function({cookieName, message, parentElement}) {
    if ((cookieName != null) && cookie(cookieName)) { return; }

    let notificationBar = domify(notificationBarView({message}));
    notificationBar.querySelector('.accept')
        .addEventListener('click', function() {
            if (cookieName != null) { cookie(cookieName, '1', {path: '/'}); }
            return notificationBar.classList.add('closed');
    });

    notificationBar.addEventListener('transitionend', () => notificationBar.parentElement.removeChild(notificationBar));

    return parentElement.insertBefore(notificationBar, parentElement.firstChild);
};
