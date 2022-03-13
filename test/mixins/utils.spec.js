import utils 	   from '../../src/mixins/utils';
import moment 	   from 'moment';
import { shallow } from 'vue-test-utils';
import { stub }	   from 'sinon';

const $moment = require('moment');

const wrapper = shallow(utils,
{
	mocks:
	{
		$moment
	}
});

describe('mixins/utils.js', () =>
{

	describe('getSeasonByDate', () =>
	{

		it('Jan 29 must return summer', () =>
		{
			const date   = moment('20190129');
			const season = wrapper.vm.getSeasonByDate(date);
			expect(season).toBe('summer');
		});

		it('Dec 21 must return summer', () =>
		{
			const date   = moment('20181221');
			const season = wrapper.vm.getSeasonByDate(date);
			expect(season).toBe('summer');
		});

		it('May 20 must return fall', () =>
		{
			const date   = moment('20190420');
			const season = wrapper.vm.getSeasonByDate(date);
			expect(season).toBe('fall');
		});

		it('August 10 must return winter', () =>
		{
			const date   = moment('20190810');
			const season = wrapper.vm.getSeasonByDate(date);
			expect(season).toBe('winter');
		});

		it('August 20 must return winter', () =>
		{
			const date   = moment('20190820');
			const season = wrapper.vm.getSeasonByDate(date);
			expect(season).toBe('winter');
		});

		it('Sep 29 must return spring', () =>
		{
			const date   = moment('20190929');
			const season = wrapper.vm.getSeasonByDate(date);
			expect(season).toBe('spring');
		});

	});

});