import ChangePassword from '../../../src/pages/Account/ChangePassword';

import {
	shallow ,
	mount,
	createLocalVue
}
from 'vue-test-utils'

import { stub }           from 'sinon';
import VeeValidate        from 'vee-validate';
import validationMessages from 'vee-validate/dist/locale/es';

const localVue = createLocalVue();

localVue.use(VeeValidate,
{
	locale: 'es',
	dictionary:
	{
		es: validationMessages
	}
});

describe('Account/ChangePassword.spec.vue', () =>
{
	it('Show validate confirm password', async () =>
	{
		const wrapper     = mount(ChangePassword,
		{
			localVue
		});

		wrapper.setData(
		{
			password:
			{
				old: 	 'SomeRandomPassword',
				new: 	 'MyNewPassword',
				confirm: 'MyNewPXXX'
			}
		});

		await wrapper.vm.$validator.validateAll();

		expect(wrapper.find('#confirm-password-error').exists()).toBe(true);
	});
});