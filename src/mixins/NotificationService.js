import axios  from 'axios';
import store  from '@/store';
import auth   from '@/mixins/auth';

var $_NotificationService_http = {};

const updateUserToken = async function()
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{

			const token = await auth.methods.retrieveToken();

			$_NotificationService_http.defaults.headers.common['Authorization'] = token;

			resolve(true);

		}
		catch(err)
		{
			reject(err);
		}

	});

};

export default {

	created: function()
	{

		$_NotificationService_http = axios.create(
		{
			baseURL: process.env.NOTIFICATION_SERVICE_URL,
			headers:
			{
				'Accept':       'application/json',
				'Content-Type': 'application/json'
			}
		});

		$_NotificationService_http.interceptors.request.use(config =>
		{
			store.dispatch('setLoading');
			return config;
		});

		$_NotificationService_http.interceptors.response.use(response =>
		{
			store.dispatch('setNotLoading');
			return response;
		});

	},

	methods:
	{
		$_NotificationService_getResource(endpoint)
		{

			return new Promise(async function(resolve, reject)
			{

				if(!endpoint)
				{
					return reject("You must provide an endpoint to use this function");
				}

				try
				{
					await updateUserToken();

					const result = await $_NotificationService_http.get(endpoint);

					resolve(result.data);

				}

				catch(err)
				{
					reject(err);
				}

			});

		},
		getNotifications()
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_NotificationService_getResource('/notifications');
					resolve(result);
				}

				catch(err)
				{
					reject(err);
				}

			});

		},
		setNotificationsAsSeen(notifications)
		{
			return new Promise(async function(resolve, reject)
			{

				try
				{

					await updateUserToken();

					const result = await $_NotificationService_http.put('/notifications/mark_as_seen',
					{
						notification_ids: notifications
					});

					resolve(result.data);

				}

				catch(err)
				{
					reject(err);
				}

			});
		}

	}
}