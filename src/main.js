// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import moment 		from 'moment';

import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import JsonWebToken from 'jsonwebtoken';

import 'bootstrap/dist/js/bootstrap.bundle';
import 'moment/locale/es';

import lightbox from 'lightbox2';

lightbox.option({
	'resizeDuration': 200,
	'wrapAround':     true
});



import VueCurrencyFilter from 'vue-currency-filter'
import VueElementLoading from 'vue-element-loading'

import VeeValidate 		 from 'vee-validate';
import validationMessages from 'vee-validate/dist/locale/es';

import Vue    		from 'vue';
import store  		from '@/store';
import App    		from './App';
import router 		from './router';
// Services

import CoreService 		   from '@/mixins/CoreService';
import PDFService 		   from '@/mixins/PDFService';
import NotificationService from '@/mixins/NotificationService';
import auth 			   from '@/mixins/auth';

//autofocus
import autofocus from 'vue-autofocus-directive';

import VueCryptojs from 'vue-cryptojs';


Vue.use(VueCryptojs);


/*
if(process.env.NODE_ENV != 'mobile')
{

if (firebase.messaging.isSupported()) {

	firebase.initializeApp(
	{
		messagingSenderId: "576374877660"
	});

	Vue.prototype.$fbmessaging = firebase.messaging();

}

} else {


	var config = {
		apiKey: "AIzaSyB2OtpOY894PyKcaKQwqvZsX_Fpgpxqyu4",
		authDomain: "https://siwca-7bf54.firebaseio.com",
		databaseURL: "https://siwca-7bf54.firebaseio.com",
		projectId: "siwca-7bf54",
		storageBucket: "siwca-7bf54.appspot.com",
		messagingSenderId: "576374877660"
	  }; // 4. Get Firebase Configuration
	  firebase.initializeApp(config);

	  if (firebase.messaging.isSupported()) {

	  const messaging = firebase.messaging();

	  messaging.usePublicVapidKey("BP1QhQ_8ZbiLsK5c_NNPhd_xDNpAuNYozcw2T8Jw8qwFUFN6SDQCw3jSzOL-w87BUvmp_k7OmroqIFSaq2X2Md8"); // 1. Generate a new key pair

	  Vue.prototype.$fbmessaging = firebase.messaging();
	  // Request Permission of Notifications
	  messaging.requestPermission().then(() => {
		console.log('Notification permission granted.');

		// Get Token
		messaging.getToken().then((token) => {
		  console.log(token);
		});
	  }).catch((err) => {
		console.log('Unable to get permission to notify.', err);
	  });
	// Wait for the deviceready event to start the render
	/*document.addEventListener("deviceready", () => {
		// eslint-disable-next-line
		console.log("Ready, Render the App");
		// get FCM token

	});

	// Wait for the deviceready event to start the render
	document.addEventListener("deviceready", () => {
		// eslint-disable-next-line
		console.log("Ready, Render the App");

	});
	// If we are not in Cordova, manually trigger the deviceready event
	const isCordovaApp = (typeof window.cordova !== "undefined");
	if (!isCordovaApp){
		document.dispatchEvent(new CustomEvent("deviceready", {

		}

		));
	}*/
	  /*}

	   */


//}
Vue.config.productionTip = false

Vue.use(VeeValidate,
{
	locale: 'es',
	dictionary:
	{
		es: validationMessages
	}
});

VeeValidate.Validator.extend('verify_password', {
    getMessage: field => `La contraseña no cumple las condiciones.`,
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(value);
    }
});

Vue.directive('autofocus', autofocus);

Vue.use(require('vue-moment'), { moment });
Vue.use(VueSweetalert2);
Vue.use(JsonWebToken);
Vue.component('VueElementLoading', VueElementLoading)

Vue.use(VueCurrencyFilter,
{
  symbol : '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
})


import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);

// Global mixins / services

Vue.mixin(auth);
Vue.mixin(CoreService);
Vue.mixin(PDFService);
Vue.mixin(NotificationService);


Vue.filter('moment', function (value, format) {
	if (value === null || value === undefined || format === undefined) {
	  return ''
	}
	if (format === 'from') {
	  return moment(value).fromNow();
	}
	if(typeof(value)==='number'){
		return moment.unix(value).format(format)
	} else {
		return moment(value).format(format)
	}

  })


Vue.filter('truncate', function (value, limit) {
  if (value.length > limit) {
      value = value.substring(0, (limit - 3)) + '...';
  }

  return value
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
