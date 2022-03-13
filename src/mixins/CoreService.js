import axios  from 'axios';
import store  from '@/store';
import auth   from '@/mixins/auth';

var $_CoreService_http = {};

const updateUserToken = async function()
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{

			const token = await auth.methods.retrieveToken();

			$_CoreService_http.defaults.headers.common['Authorization'] = token;

			resolve(token);

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

        $_CoreService_http = axios.create(
        {
            baseURL: process.env.CORE_SERVICE_URL,
            headers:
            {
                'Accept':       'application/json',
                'Content-Type': 'application/json'
            }
        });

        $_CoreService_http.interceptors.request.use(config =>
        {
        	store.dispatch('setLoading');
        	return config;
        });

        $_CoreService_http.interceptors.response.use(response =>
        {
        	store.dispatch('setNotLoading');
        	return response;
        });
	},
	
	methods:
	{
		$_CoreService_getResource(endpoint, paging = false)
		{
			/*
			*	Paging true: Devuelve un objeto con el paginador y data
			*	Ejemplo: { paging: {...}, data: { ... }  }
			*
			*	Paging false: Devuelve directamente el objeto data
			*	Ejemplo: { (data) }
			*/
            return new Promise(async function(resolve, reject)
            {

                if(!endpoint)
                {
                    return reject("You must provide an endpoint to use this function");
                }

                try
                {

	                await updateUserToken();

	                const result = await $_CoreService_http.get(endpoint);

	                let resultData = result.data.data;

	                resultData['paging'] = result.data.paging;

	                resolve(resultData);

                }
                catch(err)
                {
                	reject(err);
                }

            });

		},
		$_CoreService_getResourceOne(endpoint, paging = false)
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
	                const result = await $_CoreService_http.get(endpoint);
	                resolve(result);

                }
                catch(err)
                {
                	reject(err);
                }

            });

		},
		$_CoreService_postResource(endpoint, data, opts = null)
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

	                const result = await $_CoreService_http.post(endpoint, data);

	                resolve(result.data);

                }

                catch(err)
                {
                	reject(err);
                }

            });
		},
		$_CoreService_postBinary(endpoint ,data_binary, contentType = 'image/jpeg')
		{
            return new Promise(async function(resolve, reject)
            {

                if(!endpoint)
                {
                    return reject("You must provide an endpoint to use this function");
                }

                try
                {

	                const token = await updateUserToken();

	                const result = await axios(
	                {
	                	method: 'POST',
	                	headers:
	                	{
							'Authorization': token,
	                		'Content-Type': 'application/json',
							'type-file': contentType
	                			},
					    data: data_binary, 
	                	url: process.env.API_SERVICE_URL + endpoint
	                });
	                resolve(result.data);
                }

                catch(err)
                {
					console.log(err);
                	reject(err);
                }

            });
		},
		$_CoreService_postBinaryPayment(endpoint ,data_binary, contentType = 'image/jpeg',id)
		{
            return new Promise(async function(resolve, reject)
            {

                if(!endpoint)
                {
                    return reject("You must provide an endpoint to use this function");
                }

                try
                {

	                const token = await updateUserToken();

	                const result = await axios(
	                {
	                	method: 'POST',
	                	headers:
	                	{
							'Authorization': token,
	                		'Content-Type': 'application/json',
							'type-file': contentType,
							'notification': id
	                			},
					    data: data_binary, 
	                	url: process.env.API_SERVICE_URL + endpoint
	                });
	                resolve(result.data);
                }

                catch(err)
                {
					console.log(err);
                	reject(err);
                }

            });
		},
		$_CoreService_patchResource(endpoint, data)
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

	                const result = await $_CoreService_http.patch(endpoint, data);

	                resolve(result.data);

                }

                catch(err)
                {
                	reject(err);
                }

            });
		},
		$_CoreService_postSenRequestApiPower(endpoint, data)
			{
            return new Promise(async function(resolve, reject)
            {

                if(!endpoint)
                {
                    return reject("You must provide an endpoint to use this function");
                }

                try
                {

					const jwt = require('jsonwebtoken');
					
					
					const token = (jwt.sign({
	iat: Math.floor(Date.now() / 1000) ,				
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: data
}, 'idata_power_11!34_///1920+w_aws'));

	               const result = await axios(
	                {
	                	method: 'POST',
	                	headers:
	                	{
							'Authorization': token
	                			},

	                	url: process.env.API_SERVICE_NO_USER_URL + endpoint
	                });
	                resolve(result);
                }

                catch(err)
                {
					console.log(err);
                	reject(err);
                }

            });
		},
		getPushTokens() {
			return new Promise(async (resolve, reject) => {

				try {
					const result = await this.$_CoreService_getResource('/me/push_tokens');
					const tokens = result.map(o => o.fcm_token);
					resolve(tokens);
				} catch (err) {
					reject(err);
				}

			});
		},
		subscribePush(token) {
			return new Promise(async (resolve, reject) => {

				try {

					const result = await this.$_CoreService_postResource(`/me/push_tokens`,
						{
							fcm_token: token
						});

					resolve(result);

				} catch (err) {
					reject(err);
				}

			});
		},
		unSubscribePush(token) {
			return new Promise(async (resolve, reject) => {

				try {

					const result = await this.$_CoreService_postResource(`/me/erase_push_tokens`,
						{
							fcm_token: token
						});

					resolve(result);

				} catch (err) {
					reject(err);
				}

			});
		},
		getDocuments(oa_id, type = 'all', page = 1)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${oa_id}/document_types/${type}/documents?page=${page}`,
						true
					);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getNewsDetail(id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/news/${id}`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		getDocumentDetail(id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/documents/${id}`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		getAdvertisingViewsByCategory(services_associations, category)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${services_associations}/advertisings/category/${category}`,
						false
					);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},

		getAdvertisingViews(services_associations)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${services_associations}/advertisings`,
						false
					);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		getAdvertisingView(services_associations ,id = null)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${services_associations}/advertising/${id}`,
						false
					);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		getAdvertising(oa_id, type = 'all', page = 1)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${oa_id}/advertising_categories/${type}/advertising?page=${page}`,
						true
					);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getAdvertisingHome(oa_id, page=1, limit=12)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${oa_id}/advertising?page=${page}&limit=${limit}`,
						true
					);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getAdvertisingDetail(id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/advertising/${id}`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
			getNotificationsPaymentsDetail(id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/payment_notifications/${id}`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		getNews(services_association_id, page=1, limit=12)
		{

			return new Promise(async (resolve, reject) =>
			{

				if(!services_association_id)
				{
					return reject(true);
				}

				try
				{
					const result = await this.$_CoreService_getResource
					(
						`/services_associations/${services_association_id}/news?sort=created_at&direction=desc&page=${page}&limit=${limit}`
					)
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		updateProfile(data)
		{

			return new Promise(async (resolve, reject) =>
			{
				try
				{
					const result = await this.$_CoreService_patchResource('/me', data);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}
			});

		},
		getProfile()
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource('/me');
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
		getWelcome()
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResourceOne('/me/welcome');
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});

		},
			sendRequestSuite(data)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postResource('/me/sendRequest', data);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
				sendRequestApiPower(data)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postSenRequestApiPower('/sendRequest', data);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getServicesAssociations()
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					resolve(await this.$_CoreService_getResource(`/me/services_associations/`));
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getServicesAssociation(services_association_id = "")
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/services_associations/${services_association_id}`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getSettlements(oa_id, period_id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/me/services_associations/${oa_id}/periods/${period_id}/settlements`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getSettlementsSummary(oa_id, period_id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/me/services_associations/${oa_id}/periods/${period_id}/settlements/summary`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getServiceUnits(services_association_id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/me/services_associations/${services_association_id}/service_units`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getPaymentMethods()
		{

			return new Promise(async (resolve, reject) =>
			{
				try
				{
					const result = await this.$_CoreService_getResource(`/payment_methods`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}
			});
		},
		notifyPayment(payment)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postResource('/payment_notifications', payment);
					resolve(result.data.id);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getBankAccounts(services_association_id)
		{

			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/payment_methods`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		sendMessage(message, cooperative_id ,channel_id)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postResource(`/cooperatives/${cooperative_id}/channels/${channel_id}/messages`, message);
					resolve(result.data);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getMessages()
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/messages?sort=created_at`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
			getChannels()
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/channels`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getMessagesByCooperative(cooperative_id,channel_id)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/cooperatives/${cooperative_id}/channels/${channel_id}/messages?sort=created_at&direction=desc`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		uploadChatImage(binary_content, mimetype)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postBinary('/messages/upload_image',binary_content, mimetype);
					resolve(result.data);
				}
				catch(err)
				{
					reject(err);	
				}

			});
		},
		uploadChatAttachment(binary_content, mimetype)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postBinary('/messages/upload_attachment',  binary_content, mimetype);
					resolve(result.data);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		uploadPaymentNotifications(binary_content, mimetype,id)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postBinaryPayment('/notificationPayment',binary_content, mimetype,id);
					resolve(result.data.url);
				}
				catch(err)
				{
					reject(err);	
				}

			});
		},
		getAmenities(services_association_id)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/services_associations/${services_association_id}/amenities`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
			getPaymentNotifications()
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/payment_notifications?sort=created_at&direction=desc&page=1&limit=12`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		getAmenity(amenity_id)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_getResource(`/amenities/${amenity_id}`);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		},
		bookAmenity(amenity_id, data)
		{
			return new Promise(async (resolve, reject) =>
			{

				try
				{
					const result = await this.$_CoreService_postResource(`/amenities/${amenity_id}/book_request`, data);
					resolve(result);
				}
				catch(err)
				{
					reject(err);
				}

			});
		}
	}
}
