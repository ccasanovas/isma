<template>

<div class="page-account-view amenity-page-wrapper">

		
		<header-back title=" VOLVER" :url="'/servicios/' + services_association.id + '/amenities'" />

					<section class="bar theme-blue"  v-if="amenity.title">
			<div class="container">
				<div class="bar-img">
					<img :src="getTypeImage(amenity.type.name)" />
				</div>
				<h3 class="bar-firm-name">
					{{amenity.title}}
				</h3>
				<h5 class="bar-tagline">
				{{amenity.type.name}} &mdash; 
								<span>
									<span v-if="amenity.is_available">Habilitado</span>
									<span v-else>No habilitado</span>
								</span>
				</h5>
				
			</div>
		</section>

		
		<div class="container amenity bar-details">

<br>
		
			<div class="card border-box" v-if="amenity.title">

				<img class="card-img-top amanity_img" :src="amenity.image.url">

				<div class="card-body">


					<h5 class="title">Descripción</h5>
					<p class="text-table">{{amenity.description}}</p>
					
					<h5 class="title">Términos de uso</h5>
					<p class="text-table">{{amenity.terms_of_use}}
					<br>
						
					
						<a v-if="is_capacitor" @click="downloadFallback(amenity.attachment.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> {{amenity.attachment.file_name}}
							</a>

							<a :href="amenity.attachment.url" v-else @click="downloadFallback(amenity.attachment.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> {{amenity.attachment.file_name}}
							</a>




					</p>

					<h5 class="title">Horarios</h5>
					<p class="text-table max-12">{{amenity.hours}}</p>
					
					<router-link
						class="card-link btn btn-rounded btn-primary"
						v-if="amenity.is_bookable"
						:to="{ name: 'reservar-amenity', params: { amenity_id: amenity.id } }">
						Solicitar reserva
					</router-link>

			  </div>

			</div>


<p-d-fview v-if="pdf" :url="pdf" :title="title" :localuri="localuri"></p-d-fview>


		</div>

	</div>

</template>


<script>

import HeaderBack from '@/components/HeaderBack';
import {Capacitor} from "@capacitor/core";
import { Browser } from '@capacitor/browser';
import {Directory, Filesystem} from "@capacitor/filesystem";
import axios from "axios";
import {Dialog} from "@capacitor/dialog";
import PDFview from '@/components/PDFView';

export default {
	components:
	{
		     HeaderBack, PDFview
	},
	methods:
	{
		 async writeAndPreviewPdf(base64Data, fileName) {
					await Filesystem.mkdir({ path: 'joinup', directory: Directory.External }).then(async (createdDirectory) => {
						await Filesystem.writeFile({
							path: `joinup/${fileName.replace(' ', '-')}`,
							data: Buffer.from(base64Data).toString('base64'),
							directory: Directory.External,
						}).then(async (writedFile) => {
							this.localuri = writedFile.uri;
							console.log(`local uri  ${writedFile.uri}`);
						});
					}).catch(async (error) => {
						await Filesystem.writeFile({
							path: `joinup/${fileName.replace(' ', '-')}`,
							data: Buffer.from(base64Data).toString('base64'),
							directory: Directory.External,
						}).then(async (writedFile) => {
							this.localuri = writedFile.uri;
							console.log(`local uri  ${writedFile.uri}`);
						});
					});
				},
				async hasFilePermisions() {
					if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
						const permissionsSet = await Filesystem.checkPermissions().then(async (result) => {
							const permissions = await result.publicStorage;
							if ((`${result.publicStorage}` === 'prompt') || (`${result.publicStorage}` === 'denied') || (`${result.publicStorage}` === 'prompt-with-rationale')) {
								const havePermissions = await Filesystem.requestPermissions().then(async (publicStorage) => {
									const permissionsRequested = await publicStorage.publicStorage;
									console.log('prompt || denied || prompt-with-rationale');
									if (`${permissionsRequested}` === 'granted') {
										return true;
									}
									return false;
								});
								return havePermissions;
							}
							return true;
						});
						return permissionsSet;
					}
				},

        async downloadFallback(url) {
					this.loading = true;
					this.pdf = null;
					//console.log(JSON.stringify(url));
					// eslint-disable-next-line no-shadow
					await this.hasFilePermisions().then(result => {
						delete axios.defaults.headers.common["Authorization"];
						delete axios.defaults.headers.common["Content-Type"];
						delete axios.defaults.headers.common["Accept"];
						axios.get(url, {
							responseType: "arraybuffer"
						}).then(async (success) => {
							this.hasFilePermisions().then(async (resultData) => {
								if (resultData) {
									const arrayUrl = url.split('/');
									const fileName = arrayUrl[arrayUrl.length - 1];
									const pdfData = await success.data;
									await this.writeAndPreviewPdf(pdfData, fileName.replace(' ', '-'));
									this.pdf = url;
									this.title = fileName;
								} else {
										const device = Capacitor.getPlatform();
									console.log("Capacitor platform is: " + device);
									if (device == ("ios" || "android")) {
									await Dialog.alert({
										title: 'Información',
										message: 'Denegaste los permisos de almacenamiento y esta operación no puede ser realizada',
									});
								}
								}
							});
						}).catch(error  => console.log(error));
					});
				},
		getTypeImage(type)
		{
			switch(type)
			{
				case 'Quincho/parrilla':
					return require('@/assets/img/amenities/quincho-parrilla_details.svg');
			   case 'Salón de usos múltiples':
					return require('@/assets/img/amenities/salon-de-usos-multiples_details.svg');
				case 'Pileta de natación':
					return require('@/assets/img/amenities/pileta-de-natacion_details.svg');
				case 'Gimnasio':
					return require('@/assets/img/amenities/gimnasio_details.svg');
				case 'Spa/Sauna':
					return require('@/assets/img/amenities/spa-sauna_details.svg');
				case 'Playroom':
					return require('@/assets/img/amenities/playroom_details.svg');
				case 'Solarium':
					return require('@/assets/img/amenities/solarium_details.svg');
				case 'Laundry':
					return require('@/assets/img/amenities/laundry_details.svg');
				case 'Microcine':
					return require('@/assets/img/amenities/microcine_details.svg');
				case 'Minigolf':
					return require('@/assets/img/amenities/minigolf_details.svg');
			}
		},
		loadAmenityInfo: async function()
		{
			try
			{
				this.amenity = await this.getAmenity(this.$route.params.amenity_id);
			}
			catch(err)
			{
				console.log(err);
			}
		}
	},
	computed:
	{
        services_association()
        {
            return this.$store.getters.servicesAssociation;
        },
		is_capacitor() {
                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                        return true;
                    }
                    return false;
                }
	},
	created: function()
	{
		this.loadAmenityInfo();
	},
	watch:
	{

		services_association: async function(val)
		{
			this.loadAmenityInfo();
		}

	},
	data: function()
	{
		return {
			amenity: [],
			 pdf: null,
				title: null,
				localuri: null
		}
	}

}
</script>
