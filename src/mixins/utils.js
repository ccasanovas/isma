import axios  from 'axios';

export default {
    name: 'utils',
    components:
	{
		axios
	},
    methods:
    {
        getSeasonByDate(date)
        {
            // date arg must be moment date
            const current_year = date.year();
            const spring_date  = this.$moment(`${current_year}0921`);
            const summer_date  = this.$moment(`${current_year}1221`);
            const fall_date    = this.$moment(`${current_year}0321`);
            const winter_date  = this.$moment(`${current_year}0621`);

            if(date >= summer_date && date < fall_date)
            {
                return 'summer';
            }

            if(date >= fall_date && date < winter_date)
            {
                return 'fall';
            }

            if(date >= winter_date && date < spring_date)
            {
                return 'winter';
            }

            if(date >= spring_date && date < summer_date)
            {
                return 'spring';
            }

            return 'summer';
        },
        setPayMercadoPago(payment_data, access)
		{
            return new Promise(async function(resolve, reject)
            {

                if(!access)
                {
                    return reject("You must provide an access to use this function");
                }

                try
                {

	                const result = await axios(
	                {
	                	method: 'POST',
					    data: payment_data, 
	                	url: 'https://api.mercadopago.com/v1/payments?access_token=' + access
	                });
	                resolve(result.data);
                }

                catch(err)
                {
					console.log(err);
                	reject(err);
                }

            });
		}
    }
}
