<template>

	<section class="news">

		<div class="container">
			<p class="section-header">Noticias</p>
		</div>

		<div class="news-index">
			<div class="container">

			<br>
			
				<!-- si se deseas poner un div de carga: -->
				<!-- <div v-if="loading">Cargando...</div> -->

				<div class="empty-state empty-state-news" v-if="!loading && news && news.length==0">
					<div class="wrapper">
					<h4>¡Aún no hay noticias!</h4>
						<p>Tu institución todavía no publicó ninguna noticia.</p>
						<img src="@/assets/img/empty-states/no-hay-noticias.png" class="image-empty" alt="">
					</div>
				</div>

				<router-link
					v-for="n in news"
					:key="n.id"
					:to="{ name: 'detalle-noticia', params: { id: n.id, services_association_id: services_association.id } }"
					class="news-item news-item-with-image "
				>
					<div class="news-main">
						<div class="text-center news-image" v-if="n.thumbnail">
							<img class="news-image-new rounded" :src="n.thumbnail" alt="">
						</div>
						<div class="news-data">
							
							<h3 class="news-title">{{n.category}} - {{n.title | truncate(40)}}</h3>
							<div class="news-body body_news">{{n.excerpt}}</div>
						</div>
					</div>
					<p class="news-meta">
						<span class="news-cooperative-name">Publicado el </span>
						<span class="news-date">{{ n.created_at | moment('ll') }}</span>
					</p>
				</router-link>
			</div>
		
		</div>

	</section>

</template>

<script>

export default {
	name: 'news',
	props: ['news', 'loading'],
	computed:
	{
		services_association()
		{
			return this.$store.getters.servicesAssociation;
		}
	}
}

</script>