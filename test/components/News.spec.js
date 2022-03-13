import News        from '../../src/components/News';
import { shallow } from 'vue-test-utils'
import { stub }    from 'sinon';


const news =
[
	{
		"id": 12,
		"title": "Reparacion",
		"excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nibh ut ipsum egestas commodo...",
		"category": "Reparaciones",
		"thumbnail": "https:\/\/s3.amazonaws.com\/test-bucket-lorenzo\/test\/NewsImages\/1536845937.4774\/thumb\/xs\/nike-vapormax-2-flyknit-team-red-obsidian-black-release-date.jpg",
		"images_count": 1,
		"attachments_count": 1,
		"created_at": "2018-09-12T17:59:32+00:00",
		"created_by": "Administración Izus",
		"modified_at": "2018-09-13T13:39:06+00:00",
		"modified_by": "Administración Izus"
	}
];

const servicesAssociationData =
{
    "id": "20810025",
    "name": "Marena I",
    "avatar": "building.png",
    "address": "Paseo 131 y Playa ",
    "postal_code": "7165",
    "city": "Villa Gesell",
    "province": "Buenos Aires",
    "phone": "",
    "cuit": 30715277383,
    "cooperative": {
        "id": "208",
        "name": "Administracion Ungar",
        "firm_name": "Administracion Ungar",
        "cuit": 27161693753,
        "address": "Alameda 204 22 Piso Local  Depto. 1",
        "postal_code": 7165,
        "city": "Villa Gesell",
        "province": "Buenos Aires",
        "office_hours": null,
        "phone_number": "Lunes a Viernes",
        "website": null,
        "email": "(02255) 46-2112",
        "rpa": null,
        "logo_url": "adm.ungar@gesell.com.ar                 ",
        "biography": null
    },
    "periods": [
        {
            "id": "20810025000053",
            "title": "Octubre\/2018",
            "settlement_date": "2018-11-01T03:00:00+00:00"
        },
        {
            "id": "20810025000054",
            "title": "Noviembre\/2018",
            "settlement_date": "2018-12-01T03:00:00+00:00"
        }
    ],
    "bank_accounts": [],
    "document_types": [
        {
            "id": 1,
            "name": "Avisos de pago",
            "slug": "avisos-de-pago"
        },
        {
            "id": 2,
            "name": "Liquidaciones de gastos",
            "slug": "liquidaciones-de-gastos"
        }
    ],
    "functional_units": [
        {
            "id": "208100250005",
            "location": "1\u00baE",
            "hide_payment_notices": false
        }
    ],
    "user_is_owner": true
}

const getNews = jest.fn(() =>
{
	return new Promise((resolve, reject) => resolve(news));
});


describe('News.vue', () =>
{
	it('Show display news correctly', () =>
	{

		const wrapper = shallow(News,
		{
			computed:
			{
				services_association: () => servicesAssociationData
			}
		});

		wrapper.setData(
		{
			news: news
		});

		expect(wrapper.find('.news-index').text()).toContain(news[0].excerpt);

	});
});