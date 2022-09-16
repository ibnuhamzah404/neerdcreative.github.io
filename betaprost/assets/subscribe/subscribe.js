firebase.initializeApp({
    messagingSenderId: '399837804389'
});

function umHide() {
    document.querySelector('.um-push').style = 'opacity: 0; visibility: hidden;';
    writeCanClosePopup();
}
function umAccept() {
    umHide();
    subscribe();
}

var subscribePopup = {
    init: function () {
        subscribePopup.appendCss();
        subscribePopup.appendPopup();
        subscribePopup.translatePopup();
    },
    umLanguage: {
        "en" : {title : 'Allow "SITE_NAME" to send notifications?',allow : 'Allow',ban : 'Disable'},
        "ru" : {title : 'Разрешить "SITE_NAME" отправлять уведомления?',allow : 'Разрешить',ban : 'Запретить'},
        "uk" : {title : 'Дозволити "SITE_NAME" відправляти повідомлення?',allow : 'Дозволити',ban : 'Заборонити'},
        "id" : {title : 'Izinkan "SITE_NAME" mengirim pemberitahuan?',allow : 'Mengizinkan',ban : 'Nonaktifkan'},
        "vi" : {title : 'Cho phép "SITE_NAME" gửi thông báo?',allow : 'Cho phép',ban : 'Vô hiệu hóa'},
        "hi" : {title : '"SITE_NAME" को सूचनाएं भेजने की अनुमति दें?',allow : 'अनुमति',ban : 'अक्षम करें'},
    },
    translatePopup: function () {
        var lang = window.navigator.language || navigator.userLanguage;
        lang = lang.toLowerCase();
        var title = document.querySelector('.um-title'),
            allow = document.querySelector('.um-allow'),
            ban = document.querySelector('.um-ban');
        var arr = [];
        for (var prop in subscribePopup.umLanguage) {
            arr.push(prop);
        }
        arr.forEach( function(item, i, arr) {
            if ( lang.indexOf(item) != -1 ) {
                title.innerText = subscribePopup.umLanguage[item].title;
                allow.innerText = subscribePopup.umLanguage[item].allow;
                ban.innerText = subscribePopup.umLanguage[item].ban;
            }
        });
        title.innerHTML = title.innerHTML.replace('SITE_NAME', window.location.hostname);
    },
    appendCss: function () {
        var styleSheet = document.createElement("style")
        styleSheet.innerHTML = subscribePopup.styleContent();
        styleSheet.type = 'text/css';
        document.head.appendChild(styleSheet);
    },
    appendPopup: function () {
        var div = document.createElement('div');
        div.innerHTML = subscribePopup.popUpContent().trim();
        document.body.appendChild(div);
    },
    popUpContent: function () {
        return '<div class="um-push"><div class="um-title">Allow "SITE_NAME" to send notifications?</div><div class="um-row"><button class="um-ban" onclick="umHide();">Disable</button><button class="um-allow" onclick="umAccept();">Allow</button></div></div>';
    },
    styleContent: function () {
        return '.um-push{opacity: 0; visibility: hidden;-webkit-box-sizing: border-box;box-sizing: border-box;position: fixed;left: 10px;top: 10px;display: inline-block;width: auto;min-width: -170px;padding: 30px;margin: 15px;font-family: sans-serif;font-weight: bold;line-height: 1.2;background: #fff;border: 1px solid #d6e6ff;border-radius: 10px;-webkit-box-shadow: 0 4px 10px rgba(106, 155, 234, .3);box-shadow: 0 4px 10px rgba(106, 155, 234, .3);-webkit-transition: all .2s ease-out;-o-transition: all .2s ease-out;transition: all .2s ease-out;z-index: 9999;}\n' +
            '.um-title{position: relative;margin-bottom: 20px;font-size: 14px;color: #0f2142;}\n' +
            '.um-title:before{content: \'i\';display: inline-block;width: 20px;height: 20px;margin-right: 10px;color: #fff;font-size: 16px;font-weight: bold;text-align: center;background: #9ec2fe;border-radius: 50%;}\n' +
            '.um-row{display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: end;-ms-flex-pack: end;justify-content: flex-end;}\n' +
            '.um-ban, .um-allow{display: inline-block;background: transparent;border:  0;cursor: pointer;}\n' +
            '.um-ban{margin-right: 20px;font-size: 12px;font-weight: bold;color: #3463ae;}\n' +
            '.um-allow{padding: 10px 20px;font-weight: bold;color:  #3463ae;background: #ebf2ff;border-radius: 6px;}\n' +
            '@media screen and (max-width:  768px) {\n' +
            '.um-push{top: 50%;left: 50%;margin: 0;padding-left: 45px;border-radius: 0;-webkit-transform:  translate(-50%, -50%);-ms-transform:  translate(-50%, -50%);transform:  translate(-50%, -50%);}\n' +
            '.um-title:before{position: absolute;left: -30px;top: -2px;}\n' +
            '.um-row{-webkit-box-pack: start;-ms-flex-pack: start;justify-content: flex-start;}\n' +
            '}\n' +
            '@media screen and (max-width:  480px) {.um-push{width: 100%;max-width: 380px;}}';
    },
    showPopup: function () {
        document.querySelector('.um-push').style = 'opacity: 1; visibility: visible;';
    }
}


if ('Notification' in window) {
    subscribePopup.init();
    var messaging = firebase.messaging();
    if (Notification.permission === 'granted') {
        console.log('Already subscribed');
        subscribe();
    } else {
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            if (checkCanShowPopup()) {
                subscribePopup.showPopup();
            }
        } else {
            subscribe();
        }
        // console.log('New subscribe');
    }
    messaging.onMessage(function(message) {
        navigator.serviceWorker.register('firebase-messaging-sw.js');
        Notification.requestPermission(function(permission) {
            if (permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    message.data.data = JSON.parse(JSON.stringify(message.data));
                    registration.showNotification(message.data.title, message.data);
                }).catch(function(error) {});
            }
        });
    });


    messaging.onTokenRefresh(function() {
        messaging.getToken()
            .then(function(refreshedToken) {
                setTokenSentToServer(false);
                sendTokenToServer(refreshedToken);
            })
            .catch(function(error) {});
    });
}

function checkCanShowPopup() {
    return window.localStorage.getItem('subscribeClosePopup') !== 'true';
}

function writeCanClosePopup() {
    window.localStorage.setItem('subscribeClosePopup', 'true');
}

function subscribe() {
    messaging.requestPermission()
        .then(function () {
            messaging.getToken()
                .then(function (currentToken) {
                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    setTokenSentToServer(false);
                });
        })
        .catch(function (err) {});
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        try{umpstat('subscribe');}catch(e){}
    }
    try {
        let url = 'https://umpush.com/token/add';
        var fd = new FormData();
        fd.append('h', document.URL);
        if (window.sid !== undefined) {
            fd.append('sid', window.sid);
        }
        fd.append('token', currentToken);
        fd.append('topic', typeof topic != 'undefined' ? topic : '');
        if (!isTokenSentToServer(currentToken)) {
            setTokenSentToServer(currentToken);
        }
        if (navigator.sendBeacon) {
            navigator.sendBeacon(url, fd);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('post', url, true);
            xhr.withCredentials = false;
            xhr.send(fd);
            throw Error('beacon unsupported');
        }
    } catch (e) {}

}

function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}
