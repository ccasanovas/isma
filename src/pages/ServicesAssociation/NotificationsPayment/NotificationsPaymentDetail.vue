<template>

	<div class="page-account-view page-news-view">

		<header-back title=" VOLVER" :url="'/pagos'" />
		
		
		<section class="bar theme-blue" >
			<div class="container" v-if="no_news">
		<div class="bar-avatar">
					<span><img src="@/assets/img/notificacion_de_pago_details.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					{{news.services_association}}
				</h3>
				<h5 class="bar-tagline">
							
								{{news.payment_method}} - {{news.status}}
								
				</h5>
			</div>
			
					<div class="container" v-else>
		<div class="bar-avatar">
					<span><img src="@/assets/img/notificacion_de_pago_details.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Notificación de Pago
				</h3>
				<h5 class="bar-tagline">
									Encontrada
				</h5>
<br>
			</div>
		</section>
			
			
			
		</section>
		

	<div class="container bar-edit">

<vue-element-loading :active="isLoading" spinner="spinner" color="#CE4169" />


				<div class="card border-none shadow mb-4 mt-4" v-if="no_news">

					<div class="notification-edit">

						

						<div class="form-group">

							<div class="form-check mb-2" >
							
								<label class="form-check-label">
									<strong class="text-cbu">
										{{bank.bank_name}}, {{bank.account_number}}
									</strong>
									<br>
									<span class="text-muted">
										CBU: {{bank.account_cbu}}<br>
										Alias: {{bank.account_alias}}
									</span>
								</label>

							</div>

						</div>
						
						<div class="form-group">
							<div class="form-check mb-2" >
							Fecha: {{news.payment_date | moment('l')}}
							
							</div>
</div>

							<div class="form-group">

							<div class="form-check mb-2" >
							
								<label class="form-check-label">
									<strong class="text-cbu">
										Detalle del pago:
									</strong>
								</label>

							</div>

						</div>

						<hr>

								<table class="table table-payment-notification" style="text-align: center;">
    <tr>
 		<th>Unidad de servicio</th>
		<th>Monto</th>
    </tr>
				<tr v-for="fu in news.amounts">
									<td>
									 <label>{{fu.service_unit}} </label></td>
									<td><label>{{fu.amount}}</label>
									</td>
								</tr>
								
								<tr>
								
									<td>Total</td>
									<td>{{ news.total_amount | currency}}</td>
								</tr>							
	</table>
				
					<div class="form-group" v-if="news.payment_number">

							<div class="form-check mb-2" >
							
								<label class="form-check-label">
									<strong class="text-cbu">
										Número de comprobante: {{news.payment_number}}
									</strong>
								</label>

							</div>

						</div>
						
					<div class="form-group" v-if="news.payment_commentary">

							<div class="form-check mb-2" >
							
								<label class="form-check-label">
									<strong class="text-cbu">
										Comentario: {{news.payment_commentary}}
									</strong>
								</label>

							</div>

						</div>
			<hr>

	      	


				<div class="news-attachments-block" v-if="news.url">
					<strong>Comprobante de Pago</strong>	<br><br>


				<div class="row text-center news-image" v-if="isPDF">
				
			
					<div class="col-lg-3 col-md-4 col-xs-6">
						<a :href="news.url" data-lightbox="roadtrip" class="d-block mb-4 h-100">
							<img class="img-fluid img-thumbnail" :src="news.url" alt="">
						</a>
					</div>
				</div>




					<div class="news-attachments" v-else>


			
						

<a v-if="is_capacitor" @click="downloadFallback(news.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> Descargar
							</a>

							<a :href="news.url" v-else @click="downloadFallback(news.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> Descargar
							</a>





					</div>
				</div>
				
				
						<div class="form-group" v-if="news.payment_description">

							<div class="form-check mb-2" >
							
								<label class="form-check-label">
									<strong class="text-cbu">
										Motivo: {{news.payment_description}}
									</strong>
								</label>

							</div>

						</div>


			</div>

		</div>






	<div  class="news-detail border-box" v-else>
				<div class="empty-state empty-state-documents"  id="no-documents-message" v-if="imgNo">
					<div class="wrapper" >
					<h4>¡Pago realizado!</h4>
						<p>Otro usuario ha realizado un pago. Comunícate con tu institución.</p>
						<img src="@/assets/img/empty-states/mensaje-pago_realizado.png" class="image-empty" alt="">
					</div>
				</div>
		</div>




<p-d-fview v-if="pdf" :url="pdf" :title="title" :localuri="localuri"></p-d-fview>


				</div>


	</div>

</template>

<style lang="scss">
	@import '/static/lightbox/css/lightbox.css';
</style>

<script>

import HeaderBack from '@/components/HeaderBack';
import {Capacitor} from "@capacitor/core";
 import {Browser} from '@capacitor/browser';
	import {Directory, Filesystem} from "@capacitor/filesystem";
	import axios from "axios";
	import {Dialog} from "@capacitor/dialog";
	import PDFview from '@/components/PDFView';

export default {
	components:
	{
		HeaderBack, PDFview
	},
	created: async function()
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
		},
		is_capacitor() {
					if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
						return true;
					}
					return false;
				}
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
				loadNewsInfo: async function()
		{
			try
			{
				this.news = await this.getNotificationsPaymentsDetail(this.$route.params.id);
				this.bank = this.news.bank_account;

				if (this.news.url) {
					if ( this.news.url.includes('.pdf') ||  this.news.url.includes('.PDF')) {
this.isPDF = false;
					} else {
						this.isPDF = true;
					}

				} 
				
				this.news_type = true;
				this.isLoading = false;

			}
			catch(err)
			{
				this.imgNo = true;
				this.isLoading = false;
				this.news_type = false;
				this.isPDF = true;
				
			}
		}
	},
	data: function()
	{
		return { news: {},
					bank:null	,
					news_type: true,
					isLoading: true,
					imgNo: false,
					isPDF: true,
					pdf: null,
				title: null,
				localuri: null
					}
	}

}

</script>


