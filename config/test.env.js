'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv,
{

	// Environment name

	NODE_ENV: 					'"test"',

	// Cognito configuration

	COGNITO_USER_POOL_ID: 		'"us-east-1_SaOH3LeWD"',
	COGNITO_CLIENT_ID: 			'"7budungia1jrhg032u1ccjchsa"',

	// Microservices URLs

	NOTIFICATION_SERVICE_URL: 	'"https://test-notifications.coope.siwca.com.ar/v1"',
	CORE_SERVICE_URL: 			'"https://test-api.coope.siwca.com.ar/v1"',
	PDF_SERVICE_URL: 			'"https://test-pdfmerge.siwca.com.ar"',

	// Administration chat refresh (unit: seconds)

	CHAT_TIME_REFRESH: 			10,

	// Background refresh (unit: seconds)

	BACKGROUND_ACTIONS_REFRESH: 	60

})
