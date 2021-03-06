// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
	messagingSenderId: "576374877660"
});


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function (payload) {

	console.log('Handling background message ', payload);

	return self.registration.showNotification(payload.data.title,
	{
		body: payload.data.body,
		icon: 'assets/img/app/icon-128x128.png',
	});

});
