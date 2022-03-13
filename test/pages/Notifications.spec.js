import Notifications from '../../src/pages/Notifications';
import { shallow }   from 'vue-test-utils';
import { stub }		 from 'sinon';

const notifications = [{"expire_at":1559240424,"created_at":"Fri Nov 30 2018 18:20:24 GMT+0000 (UTC)","user":"johndoe","id":"bf3db437-abc6-47d6-8855-bdb4c9835563","title":"Nueva noticia en Reparaciones: \"TestTestttt\" — EDIFICIO RAWSON 3955/71","body":"asDASDAS","seen":true},{"expire_at":1558640660,"created_at":"Fri Nov 23 2018 19:44:20 GMT+0000 (UTC)","user":"johndoe","id":"1cf3f067-ead0-4940-a860-173dd9244ed9","title":"New notification","body":"Test environment","seen":true}];


const $store =
{
	getters:
	{
		notifications: notifications
	}
};

describe('pages/Notifications.vue', () =>
{

	it('Should display notifications', () =>
	{

		const getNotificationsStub       = stub().resolves(notifications);
		const setNotificationsAsSeenStub = stub().resolves(true);

		const wrapper = shallow(Notifications,
		{
			mocks:
			{
				$store
			},
			methods:
			{
				getNotifications: getNotificationsStub,
				setNotificationsAsSeen: setNotificationsAsSeenStub
			}
		});

		wrapper.setData({ notifications: notifications });
		expect(wrapper.text()).toContain(notifications[1].title);

	});


});