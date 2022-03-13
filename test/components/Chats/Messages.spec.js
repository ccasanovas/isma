import { shallow } from 'vue-test-utils'
import Messages 	   from '@/components/Chats/Messages';
import flushPromises   from 'flush-promises';

const messages =
[
    {
        "is_sent_by_cooperative": false,
        "body": "Test",
        "created_at": "2019-04-24T11:04:02-03:00",
        "read_at": null,
        "images": [],
        "attachments": []
    },
    {
        "is_sent_by_cooperative": false,
        "body": "Prueba",
        "created_at": "2019-04-24T11:03:36-03:00",
        "read_at": null,
        "images": [],
        "attachments": []
    }
];

describe('Components/Chats/Messages', () =>
{

	it('Should render test message', () =>
	{
		const wrapper = shallow(Messages);

		wrapper.setProps({ messages: messages });

		expect(wrapper.text()).toContain(messages[0].body);

	});

});