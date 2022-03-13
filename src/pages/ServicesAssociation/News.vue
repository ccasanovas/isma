<template>

	<div class="news-page-wrapper">

		<services-association-header
			:services_association="services_association"/>

		<div class="news-wrapper">

			<vue-element-loading
				:active="isLoading"
				spinner="spinner"
				color="#CE4169" />

			<news :news="news" :loading="isLoading"/>

		</div>

		<div class="actions text-center" v-if="!isLoading && !stopLoading">
			<br>
			<button
				:disabled="stopLoading"
				@click="loadNews"
				class="btn btn-rounded btn-outline-primary">
				Más noticias
			</button>
		</div>

	</div>

</template>

<script>

import News 				   from '@/components/News';
import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';

export default {

	components:
	{
		News, ServicesAssociationHeader
	},
	data: function()
	{
		return {
			news: [],
			page: 0,
			stopLoading: false,
			isLoading: true
		}
	},
	methods:
	{
		loadNews()
		{

			this.page++;
			this.isLoading = true;

			this.getNews(this.services_association.id, this.page)
			.then(data =>
			{

				this.news = this.news.concat(data);

				if(this.page >= data.paging.pageCount)
				{
					this.stopLoading = true;
				}

				this.isLoading   = false;

			})
			.catch(err =>

			{
				/*
				*	Stop loading se pone en true debido a que en este punto,
				*	El API va a arrojar un 404
				*/

				this.stopLoading = true;
				this.isLoading   = false;

			});
		}
	},
	watch:
	{
		services_association(services_association)
		{
			this.loadNews();
		}
	},
	computed:
	{
		services_association()
		{
			return this.$store.getters.servicesAssociation;
		}
	}

}

</script>