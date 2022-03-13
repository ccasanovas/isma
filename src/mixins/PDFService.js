import axios  from 'axios';
import store  from '@/store';
import auth   from '@/mixins/auth';

var $_PDFService_http = {};

const updateUserToken = async function()
{
	return new Promise(async (resolve, reject) =>
	{
		try
		{

			const token = await auth.methods.retrieveToken();

			$_PDFService_http.defaults.headers.common['Authorization'] = token;

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

		$_PDFService_http = axios.create(
			{
				baseURL: process.env.PDF_SERVICE_URL,
				headers:
					{
						'Accept':       'application/json',
						'Content-Type': 'application/json',
					}
			});

	},

	methods:
		{
			async mergeDocuments(pdfs)
			{
				return new Promise(async function(resolve, reject)
				{
					try
					{
						await updateUserToken();
						const result = await $_PDFService_http.post('/generate',
							{
								pdfs: pdfs
							});
						resolve(result.data.data);
					}
					catch(err)
					{
						reject(err);
					}
				});
			}
		}
}
