<template>

	<div class="page-account-view page-news-view">

		<header-back title=" VOLVER" :url="'/servicios/'+services_association.id+'/documentos'" />

		<section class="bar theme-blue" >
			<div class="container" v-if="no_news">
		<div class="bar-avatar">
					<span><img src="@/assets/img/icono_descarga-01.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					{{services_association.name}}
				</h3>
				<h5 class="bar-tagline">
										{{news.type}}
				</h5>
<br>
			</div>
			
			
			<div class="container" v-else>
		<div class="bar-avatar">
					<span><img src="@/assets/img/icono_descarga-01.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Documento
				</h3>
				<h5 class="bar-tagline">
									No encontrado
				</h5>
<br>
			</div>
		</section>


<div class="container bar-news">

<vue-element-loading :active="isLoading" spinner="spinner" color="#CE4169" />

		<div class="news-detail border-box" v-if="no_news">
		
				<div class="news-attachments-block">
					Descarga el documento que publico tu cooperativa.</strong>
<br><br>
					<div class="news-attachments" >
						<a :href="news.url"  @click="downloadFallback(news.url)" target="_blank" class="btn btn-white">
							<img
								src="@/assets/img/icons/documento-02.svg"
								class="icon"
								style="vertical-align: top;"
								alt=""/> 	{{news.title}}
						</a>
					</div>
				</div>
				
				
			</div>
			
			
			
			<div  class="news-detail border-box" v-else>
				<div class="empty-state empty-state-documents"  id="no-documents-message" v-if="imgNo">
					<div class="wrapper" >
					<h4>¡El documento fue eliminado!</h4>
						<p>No puedes acceder a este documento porque ha sido eliminado por la cooperativa.</p>
						<img src="@/assets/img/empty-states/mensaje-documento-eliminado.png" class="image-empty" alt="">
					</div>
				</div>
		</div>
			
			
			

		</div>

	</div>

</template>

<style lang="scss">
	@import '/static/lightbox/css/lightbox.css';
</style>

<script>

import HeaderBack from '@/components/HeaderBack';
import {Capacitor} from "@capacitor/core";
import { Browser } from '@capacitor/browser';

export default {
	components:
	{
		HeaderBack
	},
		created: function()
	{
		this.loadNewsInfo();
	},
	computed:
	{
		no_news()
		{
			return !this.isLoading && this.news_type;
		},
		
		services_association()
		{
			return this.$store.getters.servicesAssociation;
		}
	},
	methods:
	{
		downloadFallback(url)
		{

			const device = Capacitor.getPlatform();
			console.log("Capacitor platform is: " + device);
			if (device == ("ios" || "android")) {
				const openDocumentsSite = async () => {
					await Browser.open({ url: url });
				};
				return openDocumentsSite;
			}
		},
		loadNewsInfo: async function()
		{
			try
			{
				this.news = await this.getDocumentDetail(this.$route.params.id);
				this.news_type = true;
				this.isLoading = false;
			}
			catch(err)
			{
				this.imgNo = true;
				this.isLoading = false;
				this.news_type = false;
				//console.log(err);
			}
		}
	},
	data: function()
	{
		return { 
		news: {},
		news_type: true,
		isLoading: true,
		imgNo: false
		}
	}

}

</script> 
