import ServicesAssociationHeader from '../../src/components/ServicesAssociationHeader';
import { shallow } 			   from 'vue-test-utils'
import { stub }    			   from 'sinon';

const services_association =
{"id":"20810025","name":"Marena I","avatar":"building.png","address":"Paseo 131 y Playa ","postal_code":"7165","city":"Villa Gesell","province":"Buenos Aires","phone":"","cuit":30715277383,"cooperative":{"id":"208","name":"Administracion Ungar","firm_name":"Administracion Ungar","cuit":27161693753,"address":"Alameda 204 22 Piso Local  Depto. 1","postal_code":7165,"city":"Villa Gesell","province":"Buenos Aires","office_hours":null,"phone_number":"Lunes a Viernes","website":null,"email":"(02255) 46-2112","rpa":null,"logo_url":"adm.ungar@gesell.com.ar                 ","biography":null},"periods":[{"id":"20810025000053","title":"Octubre/2018","settlement_date":"2018-11-01T03:00:00+00:00"},{"id":"20810025000054","title":"Noviembre/2018","settlement_date":"2018-12-01T03:00:00+00:00"}],"bank_accounts":[{"id":1,"bank_name":"Banco de la Nacion Argentina","account_type":"CA$","account_number":"12235546879","account_alias":"cbumarena","account_cbu":"3213213054984-3135"}],"document_types":[{"id":1,"name":"Avisos de pago","slug":"avisos-de-pago"},{"id":2,"name":"Liquidaciones de gastos","slug":"liquidaciones-de-gastos"}],"functional_units":[{"id":"208100250005","location":"1ºE","hide_payment_notices":false}],"user_is_owner":true}

describe('ServicesAssociationHeader.vue', () =>
{

	it('Should show loading message when no data', () =>
	{
		const wrapper = shallow(ServicesAssociationHeader);
		wrapper.vm.$nextTick(() =>
		{
			expect(wrapper.find('#header-loading-message').exists()).toBeTruthy();
		});
	});

	it('Should show services association info', () =>
	{
		const wrapper = shallow(ServicesAssociationHeader);
		wrapper.setProps({ services_association: services_association });
		expect(wrapper.text()).toContain(services_association.name);
	});

});