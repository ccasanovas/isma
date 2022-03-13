import DropdownSelector  from '../../src/components/DropdownSelector';
import { shallow } from 'vue-test-utils'
import flushPromises from 'flush-promises'

const availableOptions =
[
	{
		title: 'Option 1',
		id: 1
	},
	{
		title: 'Option 2',
		id: 2
	}
];

const defaultOption = availableOptions[0];

describe('DropdownSelector.vue', () =>
{

	it('Should display options', () =>
	{

		const wrapper = shallow(DropdownSelector,
		{
			propsData:
			{
				options: availableOptions,
				default: defaultOption
			}
		});

		expect(wrapper.text()).toContain(availableOptions[0].title);

	});

	it('Should emit event on click', async () =>
	{

		const wrapper = shallow(DropdownSelector,
		{
			propsData:
			{
				options: availableOptions,
				default: defaultOption
			}
		});

		wrapper.find('.available-option').trigger('click');

		expect(wrapper.emitted().selected[0]).toBeTruthy();

	});

});