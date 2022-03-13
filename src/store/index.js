import Vue         		   from 'vue'
import Vuex        		   from 'vuex'
import CoreService 		   from '@/mixins/CoreService';
import NotificationService from '@/mixins/NotificationService';
import auth        		   from '@/mixins/auth';

Vue.use(Vuex)

const store = new Vuex.Store(
{
	state:
	{
		services_association:  			{},
		services_associations: 			[],
		notifications: 		 			[],
		messages: 			 			[],
		user: 				 			{},
		loading: 			 			true,
		hasMultiplesServicesAssociations: false,
		new_user: 			 			 'n',
	},
	getters:
	{
		servicesAssociations: 			state => state.services_associations,
		servicesAssociation:  			state => state.services_association,
		notifications: 					state => state.notifications,
		loading: 						state => state.loading,
		hasMultiplesServicesAssociations: state => state.hasMultiplesServicesAssociations,
		isUserNew: 						state => state.new_user,
		user: 							state => state.user,
		messages: 						state => state.messages
	},
	mutations:
	{
		servicesAssociation(state, data)
		{
			state.services_association = data;
		},
		notifications(state, data)
		{
			state.notifications = data;
		},
		servicesAssociations(state, data)
		{
			state.services_associations = data;
		},
		loading(state, data)
		{
			state.loading = data;
		},
		hasMultiplesServicesAssociations(state, data)
		{
			state.hasMultiplesServicesAssociations = data;
		},
		user(state, data)
		{
			state.user = data;
		},
		newUser(state, data)
		{
			state.new_user = data;
		},
		messages(state, data)
		{
			state.messages = data;
		}
	},
	actions:
	{
		runFirstLoad(context)
		{

			return new Promise(async(resolve, reject) =>
			{

				context.dispatch('fetchNotifications');
				context.dispatch('handlePushNotifications');
				context.dispatch('setUser');

				try
				{

					await context.dispatch('setServicesAssociations');
					await context.dispatch('evaluateServicesAssociations');

					context.dispatch('fetchMessages');

					// Fetch messages every minute

					setInterval(function()
					{
						context.dispatch('fetchMessages');
						context.dispatch('fetchNotifications');
					}
					.bind(this), (process.env.BACKGROUND_ACTIONS_REFRESH * 1000));

					resolve(true);

				}
				catch(err)
				{
					reject(err);
				}

			});


		},
		subscribeWebPushNotifications: async function(context, token)
		{
			try
			{
				const tokens = await CoreService.methods.getPushTokens();
				if(tokens.indexOf(token) == -1)
				{
					CoreService.methods.subscribePush(token);
				}
			}
			catch(err)
			{
				console.log("Push notifications error: ", err);
			}
		},
		handlePushNotifications: async function (context) {
			try {
				const tokens = await CoreService.methods.getPushTokens();

				// If we're using cordova

				if (typeof cordova != 'undefined') {
					/*
					const fcm = new FCM();


					// external required step
					// register for push
					PushNotifications.register()
						.then(() => {
							//
							// Subscribe to a specific topic
							// you can use `FCMPlugin` or just `fcm`
							this.fcm
								.subscribeTo({ topic: "test" })
								.then(r => alert(`subscribed to topic`))
								.catch(err => console.log(err));
						})
						.catch(err => alert(JSON.stringify(err)));


					//
					// Get FCM token instead the APN one returned by Capacitor
					this.fcm
						.getToken()
						.then(r => alert(`Token ${r.token}`))
						.catch(err => console.log(err));

					// Request permission to use push notifications
					// iOS will prompt user and return if they granted permission or not
					// Android will just grant without prompting
					/*
                    Plugins.requestPermission().then(result => {
                        alert("result " + JSON.stringify(result));
                    });

                     */
					// Add registration error if there are.
					/*
					const fcmToken = this.fcm.getToken();


					CoreService.methods.subscribePush(fcmToken);
					*
					 */

					// Update subscription

				}

			} catch (err) {
				console.log("Push notifications error: ", err);
			}
		},
		setUserAsNew(context)
		{
			context.commit('newUser', 'y');
		},
		setUserAsNotNew(context)
		{
			context.commit('newUser', 'n');
		},
		setLoading(context)
		{
			context.commit('loading', 'y');
		},
		setNotLoading(context)
		{
			context.commit('loading', 'n')
		},
		fetchNotifications(context)
		{
			NotificationService.methods
			.getNotifications()
			.then(
				data => context.commit('notifications', data)
			)
			.catch(
				err => {}
			);
		},
		fetchMessages: async function(context)
		{

			try
			{
				const messagesList    = await CoreService.methods.getMessages();
				const messages        = [];

				let cooperatives = this.getters.servicesAssociations.map(o => o.cooperative);

				// Delete duplicates

				const unique    = new Set(cooperatives.map(e => JSON.stringify(e)));
				cooperatives = Array.from(unique).map(e => JSON.parse(e));

				for(let i=0; i < cooperatives.length; i++)
				{

					/*
					*	Recorremos las cooperativaes y nos fijamos en el arreglo messagesList
					*	si existe la administración actual, en caso de que si, devolvemos ese objeto
					*	En caso de que no, el objeto de administración solo.
					*   Posteriormente evaluamos 'last_message', si existe, mostramos el mensaje.
					* 	De lo contrario, mostramos el div para iniciar la conversación
					*/

					const messagesByAdministration = messagesList.filter(m => m.cooperative.id == cooperatives[i].id);

					if(messagesByAdministration.length > 0)
					{
						//COMO PUEDE TENER MÁS DE UN CANAL
						for(let s=0; s < messagesByAdministration.length; s++){
							messages.push(messagesByAdministration[s]);
							}
						continue;

					}

					messages.push(
					{
						cooperative: cooperatives[i]
					});
				}

				context.commit('messages', messages);
			}
			catch(err)
			{
				console.log(err);
			}
		},
		setUser(context)
		{

			auth.methods.getUser().then(data =>
			{

				context.commit('user',
				{
					username: data.idToken.payload["cognito:username"],
					email:    data.idToken.payload.email,
					token:    data.idToken.jwtToken,
					refreshToken : data.refreshToken.token
				});

			})
			.catch(
				err => {}
			);

		},
		evaluateServicesAssociations: (context) =>
		{

			return new Promise(function(resolve,reject)
			{

				try
				{
					context.commit('hasMultiplesServicesAssociations', context.getters.servicesAssociations.length > 1);
					resolve(true);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		setServicesAssociations:  (context) =>
		{

			return new Promise(async(resolve, reject) =>
			{

				try
				{

					const servicesAssociations = await CoreService.methods.getServicesAssociations();

					context.commit('servicesAssociations', servicesAssociations);

					if(servicesAssociations.length == 0)
					{
						context.dispatch('setUserAsNew');
					}

					resolve(true);

				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		setServicesAssociation(context, id)
		{

			CoreService.methods.getServicesAssociation(id)
			.then(data =>
			{
				context.commit('servicesAssociation', data);
			})
			.catch(
				err => {}
			);
		}
	}
})

export default store;
