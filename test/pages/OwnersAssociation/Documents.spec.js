import Documents     from '../../../src/pages/ServicesAssociation/Documents';
import { shallow }   from 'vue-test-utils';
import { stub }		 from 'sinon';
import flushPromises from 'flush-promises'

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
    },
    {
        "id": 5,
        "name": "Reglamentos",
        "slug": "reglamentos"
    },
    {
        "id": 6,
        "name": "Servicios",
        "slug": "servicios"
    },
    {
        "id": 8,
        "name": "Presupuestos",
        "slug": "presupuestos"
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

const $store =
{
	getters:
	{
		servicesAssociation: servicesAssociationData
	}
};

const documents =
[

	{
		"id": 198,
		"title": "Aviso de pago Octubre\/2018",
		"type": "Avisos de pago",
		"url": "https:\/\/s3-sa-east-1.amazonaws.com\/idata-online\/test\/208100250005000053_5240DACB1E38F0496F3F561AF6EC8617.pdf",
		"created_at": null,
		"created_by": "System",
		"modified_at": null,
		"modified_by": null
	},
	{
		"id": 774,
		"title": "Aviso de pago Noviembre\/2018",
		"type": "Avisos de pago",
		"url": "https:\/\/s3-sa-east-1.amazonaws.com\/idata-online\/ic\/208\/10025\/000054\/Resumen_208100250005000054_21550CBCAB3B1DCB450354E2DC8082CE.pdf",
		"created_at": null,
		"created_by": "System",
		"modified_at": null,
		"modified_by": null
	}
]

describe('pages/ServicesAssociation/Documents.vue', () =>
{

	it('Should display documents', async() =>
	{


		const getDocuments     = stub().resolves(documents);

		const wrapper = shallow(Documents,
		{
            computed:
            {
                no_documents: () => false,
            },
			mocks:
			{
				$store,
				getDocuments
			}
		});

		await flushPromises();

		expect(wrapper.text()).toContain(documents[0].title);


	});

    it('Should hide empty documents message', async() =>
    {


        const getDocuments = stub().resolves(documents);

        const wrapper = shallow(Documents,
        {
            computed:
            {
                no_documents: () => false,
            },
            mocks:
            {
                $store,
                getDocuments
            }
        });

        await flushPromises();

        expect(wrapper.find('#no-documents-message').exists()).toBe(false);


    });

    it('Should display message when no documents', async() =>
    {


        const getDocuments = stub().resolves({ data: [] });

        const wrapper = shallow(Documents,
        {
            computed:
            {
                no_documents: () => true,
            },
            mocks:
            {
                $store,
                getDocuments
            }
        });

        await flushPromises();

        expect(wrapper.find('#no-documents-message').exists()).toBe(true);

    });

});