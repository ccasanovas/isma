import SiteFooter  from '../../src/components/SiteFooter';
import { shallow } from 'vue-test-utils'

describe('SiteFooter.vue', () =>
{

	it('Should display copyright string', () =>
	{
		const copyright = 'testing-copyright';
		const wrapper   = shallow(SiteFooter, { propsData: { copyright: copyright } });
		expect(wrapper.text()).toContain(copyright);
	});

});