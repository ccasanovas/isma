import NewsDetail     from '../../src/pages/ServicesAssociation/NewsDetail';
import { shallow }    from 'vue-test-utils'
import { stub }       from 'sinon';

const $moment = require('moment');

const news =
{
    "id": 12,
    "title": "Reparacion",
    "body": "\u003Cp\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id nibh ut ipsum egestas commodo id sit amet tortor. Vestibulum sit amet dolor et lacus placerat pretium sed vitae velit. Integer quis ultrices ex. Sed aliquet dui nec ligula pellentesque elementum. Aliquam finibus lectus vel nibh varius dictum. In massa mauris, accumsan a suscipit eget, vehicula eu est. Sed congue nisi vel urna ultricies accumsan. Cras eu leo fringilla, vestibulum eros tempus, vulputate est. Maecenas fermentum auctor quam vel facilisis. Nulla mattis bibendum dolor. Aenean sit amet aliquet nulla. Maecenas pulvinar mi nec dolor sollicitudin tincidunt. Nunc sit amet tellus non ligula volutpat venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\u003C\/p\u003E\u003Cp\u003EAliquam eget leo placerat massa facilisis ornare at sit amet magna. Quisque ex mi, lacinia quis tempor ut, cursus quis ante. Integer viverra lectus in enim egestas, a tristique sem sagittis. Integer facilisis arcu eget ipsum gravida congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pharetra enim mauris, et fringilla orci congue a. Aliquam id aliquet augue, vitae ultrices eros. Sed ante lectus, fringilla in mollis a, auctor vitae magna. Curabitur efficitur dui arcu, quis dapibus ligula pulvinar eu. Ut nec velit aliquam, vulputate mauris in, cursus ex. Cras scelerisque ornare efficitur. Maecenas eleifend porta dictum.\u003C\/p\u003E\u003Cp\u003EMorbi ornare tempus elementum. Mauris eget ornare ante. Nullam venenatis porttitor laoreet. Aenean in sem vitae felis feugiat fermentum in id dolor. Cras ac aliquet est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis sit amet leo ultricies, maximus justo eget, iaculis diam. Fusce bibendum vel dolor vehicula gravida. Quisque consequat, elit at blandit finibus, tortor lectus tempor urna, vel dignissim odio ante sed sem. Pellentesque luctus consequat convallis. Ut quis imperdiet diam. Sed a quam sit amet tellus suscipit ultricies nec eu erat. Mauris id posuere urna, sit amet finibus odio. Nunc egestas aliquet mi, sit amet feugiat elit dictum quis. Vivamus bibendum condimentum faucibus. Praesent consequat pellentesque eros vel euismod.\u003C\/p\u003E",
    "category": "Reparaciones",
    "images": [
        {
            "file_name": "nike-vapormax-2-flyknit-team-red-obsidian-black-release-date.jpg",
            "file_type": "image\/jpeg",
            "file_size": 56625,
            "file_width": 960,
            "file_height": 1080,
            "url": "https:\/\/s3.amazonaws.com\/test-bucket-lorenzo\/test\/NewsImages\/1536845937.4774\/nike-vapormax-2-flyknit-team-red-obsidian-black-release-date.jpg",
            "thumbnail_xs": "https:\/\/s3.amazonaws.com\/test-bucket-lorenzo\/test\/NewsImages\/1536845937.4774\/thumb\/xs\/nike-vapormax-2-flyknit-team-red-obsidian-black-release-date.jpg",
            "thumbnail_sm": "https:\/\/s3.amazonaws.com\/test-bucket-lorenzo\/test\/NewsImages\/1536845937.4774\/thumb\/sm\/nike-vapormax-2-flyknit-team-red-obsidian-black-release-date.jpg",
            "thumbnail_lg": "https:\/\/s3.amazonaws.com\/test-bucket-lorenzo\/test\/NewsImages\/1536845937.4774\/thumb\/lg\/nike-vapormax-2-flyknit-team-red-obsidian-black-release-date.jpg"
        }
    ],
    "attachments": [
        {
            "file_name": "empty.zip",
            "file_type": "application\/zip",
            "file_size": 166,
            "url": "https:\/\/s3.amazonaws.com\/test-bucket-lorenzo\/test\/NewsAttachments\/1536845575.6879\/empty.zip"
        }
    ],
    "created_at": "2018-09-12T17:59:32+00:00",
    "created_by": "Augusto Izus",
    "modified_at": "2018-09-13T13:39:06+00:00",
    "modified_by": "Augusto Izus"
};

const getNewsDetailStub = stub().resolves(news);

const $route =
{
	params:
	{
		id: "12"
	}
};



const services_association =
{"id":"20810025","name":"Marena I","avatar":"building.png","address":"Paseo 131 y Playa ","postal_code":"7165","city":"Villa Gesell","province":"Buenos Aires","phone":"","cuit":30715277383,"cooperative":{"id":"208","name":"Administracion Ungar","firm_name":"Administracion Ungar","cuit":27161693753,"address":"Alameda 204 22 Piso Local  Depto. 1","postal_code":7165,"city":"Villa Gesell","province":"Buenos Aires","office_hours":null,"phone_number":"Lunes a Viernes","website":null,"email":"(02255) 46-2112","rpa":null,"logo_url":"adm.ungar@gesell.com.ar                 ","biography":null},"periods":[{"id":"20810025000053","title":"Octubre/2018","settlement_date":"2018-11-01T03:00:00+00:00"},{"id":"20810025000054","title":"Noviembre/2018","settlement_date":"2018-12-01T03:00:00+00:00"}],"bank_accounts":[{"id":1,"bank_name":"Banco de la Nacion Argentina","account_type":"CA$","account_number":"12235546879","account_alias":"cbumarena","account_cbu":"3213213054984-3135"}],"document_types":[{"id":1,"name":"Avisos de pago","slug":"avisos-de-pago"},{"id":2,"name":"Liquidaciones de gastos","slug":"liquidaciones-de-gastos"}],"functional_units":[{"id":"208100250005","location":"1ºE","hide_payment_notices":false}],"user_is_owner":true}

const wrapper = shallow(NewsDetail,
{
	methods:
	{
		getNewsDetail: getNewsDetailStub
	},
    computed:
    {
        services_association: () => services_association,
    },
	mocks:
	{
		$route,
        $moment
	}
});

describe('ServicesAssociation/NewsDetail.vue', () =>
{
	it('Show display title', () =>
	{
		expect(wrapper.html()).toContain(news.title);
	});
	it('Show display body', () =>
	{
		expect(wrapper.html()).toContain(news.body);
	});
});