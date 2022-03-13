import MainNav     from '../../src/components/MainNav';
import { shallow } from 'vue-test-utils'

const $store =
{
	getters:
	{
		notifications: [{"expire_at":1570907525,"created_at":1555096325,"user":"aranciaga@evilcorp.com.ar","id":"8eba580c-1182-4012-b233-fae37ad93547","title":"Nueva noticia en Novedades: \"prueba tst bra\" — Marena I","body":"vamos","seen":true},{"expire_at":1570907427,"created_at":1555096227,"user":"aranciaga@evilcorp.com.ar","id":"2b206eb9-97a2-4989-b533-c0ff25e06c75","title":"Nueva noticia en Reparaciones: \"con otra\" — Marena I","body":"ver ahora","seen":true},{"expire_at":1570907298,"created_at":1555096098,"user":"aranciaga@evilcorp.com.ar","id":"c7fed3dc-3705-409b-ac87-0ec90941fad0","title":"Nueva noticia en Reparaciones: \"con otra\" — Marena I","body":"ver ahora","seen":true},{"expire_at":1570907214,"created_at":1555096014,"user":"aranciaga@evilcorp.com.ar","id":"444e2166-28ec-4b86-8542-59b4e12023e8","title":"Nueva noticia en Novedades: \"prueba tst bra\" — Marena I","body":"vamos","seen":true},{"expire_at":1570906919,"created_at":1555095719,"user":"aranciaga@evilcorp.com.ar","id":"d8117c56-67ec-4c5e-b754-0024783bee1c","title":"Nueva noticia en Reparaciones: \"nueva reparacion\" — Marena I","body":"prueba brasil","seen":true},{"expire_at":1570906888,"created_at":1555095688,"user":"aranciaga@evilcorp.com.ar","id":"ac5601f2-c287-4b81-8a73-7d5e2a47bf12","title":"Nueva noticia en Reparaciones: \"Prueba noti\" — Marena I","body":"Para martin 222","seen":true},{"expire_at":1570906583,"created_at":1555095383,"user":"aranciaga@evilcorp.com.ar","id":"94583adf-4c12-4f05-aef1-caeada5ed571","title":"Nueva noticia en Reparaciones: \"Prueba noti\" — Marena I","body":"Para martin","seen":true},{"expire_at":1570906108,"created_at":1555094908,"user":"aranciaga@evilcorp.com.ar","id":"d3ff4cf2-8011-4706-9d30-707a27a16327","title":"Nueva noticia en Novedades: \"ecorp test\" — Bedama I","body":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut...","seen":true},{"expire_at":1570906078,"created_at":1555094878,"user":"aranciaga@evilcorp.com.ar","id":"7b44844e-84db-4a48-84dc-1ffb07812b2e","title":"Nueva noticia en Novedades: \"ecorp test\" — Bedama I","body":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut...","seen":true},{"expire_at":1570905991,"created_at":1555094791,"user":"aranciaga@evilcorp.com.ar","id":"bb3c2df1-93f0-4431-acef-6c3a739454f6","title":"Nueva noticia en Novedades: \"ecorp test\" — Bedama I","body":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut...","seen":true}],
		messages: 	   [{"cooperative":{"id":"208","name":"Administracion Ungar","firm_name":"Administracion Ungar","cuit":27161693753,"address":"Alameda 204 22 Piso Local  Depto. 1","postal_code":7165,"city":"Villa Gesell","province":"Buenos Aires","office_hours":"Lunes a Viernes","phone_number":"(02255) 46-2112","website":null,"email":"adm.ungar@gesell.com.ar                 ","rpa":"","logo_url":""},"last_message":{"is_sent_by_cooperative":false,"excerpt":"Hola","images_count":1,"attachments_count":null,"created_at":"2019-04-17T18:41:31+00:00","read_at":"2019-04-17T19:09:07+00:00"}},{"cooperative":{"id":"905","name":"Administración María Castellanos","firm_name":"Administración María Castellanos","cuit":27331812027,"address":"Av. Colon 1825 Piso Local  Depto. 9 ","postal_code":7600,"city":"Mar del Plata","province":"Buenos Aires","office_hours":"Lunes a Viernes","phone_number":"(0223) 491-3632","website":null,"email":"admicastellanos@hotmail.com","rpa":null,"logo_url":""},"last_message":{"is_sent_by_cooperative":true,"excerpt":"Hola","images_count":null,"attachments_count":null,"created_at":"2019-04-15T21:40:27+00:00","read_at":"2019-04-16T20:08:42+00:00"}}]
	}
};


describe('MainNav.vue', () =>
{
	it('Should hide right links for unauthorized users', () =>
	{
		const wrapper = shallow(MainNav,
		{
			computed:
			{
				new_notifications: () => false,
				has_multiples_services_associations: () => false
			}
		});
		expect(wrapper.text()).not.toContain('Mi cuenta');
	});

	it('Should show right links only for authorized users', () =>
	{
		const wrapper = shallow(MainNav,
		{
			computed:
			{
				new_notifications: () => false,
				has_multiples_services_associations: () => false
			},
			mocks:
			{
				$store
			},
			propsData:
			{
				display: true
			}
		});
		expect(wrapper.text()).toContain('Mi cuenta');
	});
});