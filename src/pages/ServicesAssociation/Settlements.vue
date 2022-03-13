<template>

	<div class="page-services-associations-settlements">

		<services-association-header
			:services_association="services_association"
		/>

		<dropdown-selector
			@selected="changePeriod"
			:options="services_association.periods"
			:default="period"
		/>

		<section class="settlement-details">
			<div class="container">


<section class="documents-index">
		
				<div class="card">
					<vue-element-loading :active="isLoadingSettlements" spinner="spinner" color="#CE4169" />
					
					
					
						<!--<div class="settlement-extra card-body text-center">
						<p class="card-text" v-if="period_info.closing_date_cta_cte">
						Total por {{ total_service_units }}
						<br>
						Emitida {{period_info.closing_date_cta_cte | moment('DD/MM/YY') }}
						</p>
					</div>
					
					<hr>-->
					
					<div class="data settlement-extra">
						<div class="settlement-due-date" v-if="period_info.due_date">
							<div class="value">{{period_info.due_date | moment('DD/MM/YY')}}</div>
							<div class="label">Vencimiento</div>
						</div>
						<div class="settlement-amount" >
							<div class="value">{{period_info.total_amount | currency}}</div>
							<div class="label">Suma total por {{ total_service_units }}</div>
						</div>
					</div>
					
					
				
					
				</div>
			
		</section>




				<div class="card border-none" style="border-left: 4px solid #4e4f77;">
					<vue-element-loading :active="isLoadingSettlements" spinner="spinner" color="#CE4169" />
					<div class="card-body">
						<h6 class="download-header">Descargá tus facturas</h6>
					</div>
					
					<ul v-if="period_info.service_units>1" class="functional-units list-group list-group-flush">
						<li v-for="settlement in settlements" class="list-group-item settlement-extra settlement-back">
							<div class="form-group form-check">
								<input v-if="period_info.service_units>1" type="checkbox" class="form-check-input" :disabled="!settlement.service_unit.payment_notice" v-model.number="settlements_selected[settlement.id]" :id="settlement.id">
								
								<label class="form-check-label" :for="settlement.id">
									{{settlement.service_unit.location}}<br>
									<span class="text-muted">{{settlement.amount | currency}}</span> 
								</label>
								<div class="settlement-payment-nopago" v-if="settlement.balance">IMPAGO</div><div class="settlement-payment-pago" v-else>PAGADO</div>
							</div>
							
							<a v-if="settlement.service_unit.payment_notice" href="javascript:;" @click="downloadFallback(settlement.service_unit.payment_notice)" class="btn btn-white value"><img
								src="@/assets/img/icons/doc_pdf-02.svg"
								class="icon"
								style="vertical-align: top;"
								alt=""/>Descargar</a>
								
						</li>
					</ul>
					
					<ul v-else="period_info.service_units=1" class="functional-units list-group list-group-flush settlement-extra">
					
						<li v-for="settlement in settlements " class="list-group-item-one">
							<div class="form-group form-check">
								<input v-if="period_info.service_units>1" type="checkbox" class="form-check-input" :disabled="!settlement.service_unit.payment_notice" v-model.number="settlements_selected[settlement.id]" :id="settlement.id">
								
								<label class="form-check-label" :for="settlement.id">
									{{settlement.service_unit.location}}<br>
									<span class="text-muted">{{settlement.amount | currency}}</span>
								</label>
								<div class="settlement-payment-nopago" v-if="settlement.balance">IMPAGO</div><div class="settlement-payment-pago" v-else>PAGADO</div>
							</div>
							
							<a v-if="settlement.service_unit.payment_notice" href="javascript:;" @click="downloadFallback(settlement.service_unit.payment_notice)" class="btn btn-white value"><img
								src="@/assets/img/icons/doc_pdf-02.svg"
								class="icon"
								style="vertical-align: top;"
								alt=""/>Descargar</a>
						</li>
					</ul>


					

					<div class="card-body generated_pdf settlement-extra" v-if="period_info.service_units>1">
						<button :disabled="disable_download_selected" id="generate-documents" type="button" class="btn btn-primary btn-rounded" @click="downloadSelected">{{doc_generator_text}}</button>
					</div>

				</div>
			</div>
		</section>




<!--<section >
			<div class="container">
				
		
				
				<div v-if="is_capacitor" style="text-align: center;">
       <form id="form_mp" method="post" class="form_mp" target="_blank" v-on:submit.prevent="reloadPage()"  ref="mp">

                                            </form>
</div>
<div style="text-align: center;" v-else>
      <form id="form_mp" method="post" name="form_mp"  target="_blank" v-on:submit.prevent="reloadPage()" ref="mp">

                                            </form>
</div>
				
				
			</div>
		</section>-->




		
<section class="documents-index">
			<div class="container">
				<div>
				
					<div>
					
						<vue-element-loading :active="isDownloadingPeriodDocuments" spinner="spinner" color="#CE4169" />
						
					
						
						
						<a class="document-item">
							<span class="document-icon-container docu-nocircled delete-img">
								<img src="@/assets/img/icons/documento-02.svg" class="document-icon" alt="" />
							</span>
							
							<div class="document-data">
								<div class="document-title" v-if="period_info.closing_date_cta_cte">
									<h5 class="document-title">Notificaciones de pagos realizadas</h5>
								</div>
								
								<div class="document-date">
									
												<router-link
					:to="{ name: 'listado-pagos', }"
					class="btn btn-white value"
				>
				Ver
	  </router-link>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>





		<section class="section-notify">
			<div class="container">
				<div class="banner">
		
					<!--<h6>Notificar pago</h6>-->
					<p>Informa un pago si pagaste con depósito o transferencia o pago online.</p>
					<router-link v-if="services_association.id" :to="{ name: 'notificar-pago', params: { services_association_id: services_association.id } }" class="btn btn-outline-light btn-rounded">Notificar pago</router-link>
				</div>
			</div>
		</section>
		<p-d-fview v-if="pdf" :url="pdf" :title="title" :localuri="localuri"></p-d-fview>

	</div>

</template>

<script>

import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
import DropdownSelector 	   from '@/components/DropdownSelector';
import PDFview from '@/components/PDFView';

import {Capacitor} from '@capacitor/core';
import {Directory, Filesystem} from "@capacitor/filesystem";
import axios from "axios";
import {Dialog} from "@capacitor/dialog";
import {InAppBrowser} from "@ionic-native/in-app-browser";




export default {
	components:
	{
		PDFview,
		ServicesAssociationHeader,
		DropdownSelector,
	},
	data: function()
	{
		return {
			settlements: [],
			isLoadingSettlements: true,
			doc_generator_text: 'Descargar seleccionadas',
			settlements_selected: {},
			period: '',
			tokenUser: '',
            emailUser:'',
            refreshToken:'',
			isDownloadingPeriodDocuments: false,
			period_documents: [],
			period_info: {},
			pdf: null,
			title: null,
			localuri: null,

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
			if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
				this.loading = true;
				this.pdf = null;
				console.log(JSON.stringify(url));
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
								await Dialog.alert({
									title: 'Información',
									message: 'Denegaste los permisos de almacenamiento y esta operación no puede ser realizada',
								});
							}
						});

					}).catch(error => console.log(error));

				});
			} else {
				window.open(url, '_blank');
				//window.location.href = documents[0].url;

			}


		},

		whereAreyou(){
                if (typeof cordova != "undefined") {
                    
                                  return true;
                                }  else {
                                     
                                       return false; 
                                    }
                },


				   reloadPage() {

                    if (this.pagado == 1) {

                        this.$swal({
                            type: 'info',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Entendido',
                            title: 'Período en cero',
                            text: 'Tu liquidación se encuentra pagada.'
                        }).then((result) => {
                                if (result.value) {

                                    //document.getElementById('form_mp').submit();
                                    //window.location.reload();

                                }
                            }
                        );


                    } else {
//si no esta pago
                        this.$swal({
                            type: 'info',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Entendido',
                            showCancelButton: true,
                            cancelButtonText: `Cerrar`,
                            title: 'Vas a ingresar en una plataforma de pagos externa',
                            text: 'Al finalizar la operación recibiras nuestra notificación, puede demorar.'
                        }).then(async (result) => {

                            // Request permission to use push notifications
                            // iOS will prompt user and return if they granted permission or not
                            // Android and web will just grant without prompting
                            if (result.value) {

                                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {

                                        document.getElementById("form_mp").addEventListener("submit", async function(e) {

                                            e.preventDefault(); // Prevents form from submitting

                                            console.log( this.getAttribute("action") );
                                            console.log( this.action );
                                            const browser = await InAppBrowser.create(this.action, '_blank', 'hidden=no,location=yes,clearsessioncache=yes,clearcache=yes,fullscreen=yes');
                                            browser.on('loadstart').subscribe((e) => {
                                                console.log(e.url);
                                                if (e.url.includes('cancel')) {
                                                    browser.close();
                                                }
                                                if (e.url.includes('success')) {
                                                    browser.close();
                                                }

                                            });

                                            // this.submit();  // Submit afterwards or use AJAX to construct your request

                                        });
                                        document.querySelector('.mercadopago-button').click();

                                        /*
                                        const url = document.getElementsByName('form_mp').action;
                                        console.log(url);

                                        console.log(success.data);
                                            console.log(JSON.stringify(success));
                                            const browser = InAppBrowser.create(url, '_blank', 'hidden=no,location=yes,clearsessioncache=yes,clearcache=yes');
                                            browser.on('loadstart').subscribe((e) => {
                                                console.log(e.url);
                                                if (e.url.includes('iprmardelplata')) {
                                                    browser.close();
                                                }
                                            });

                                        //
                                        */

                                        this.loading = false;
                                    } else {
                                        //console.log('entro aca');
                                        document.getElementById('form_mp').submit();
                                        window.location.reload();
                                    }

                                } else if(result.dismiss == 'cancel'){
            window.location.reload();
        }
                            
                            }
                        );


                    }


                },
		mergePeriodDocuments: async function()
		{
			try
			{

				this.isDownloadingPeriodDocuments = true;
				console.log(this.period_documents);
				const mergeResponse  = await this.mergeDocuments(this.period_documents);
				this.isDownloadingPeriodDocuments = false;

				if(!mergeResponse.url)
				{
					throw new Error('Empty url');
				}

				const device = Capacitor.getPlatform();
				console.log("Capacitor platform is: " + device);
				if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
					await this.downloadFallback(mergeResponse.url);
				}
				else
				{
					window.location.href    = mergeResponse.url;
				}

			}
			catch(err)
			{
				this.isDownloadingPeriodDocuments = false;
				this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'No se ha podido generar el archivo!'
});
			}

		},
		downloadSelected: async function()
		{

			const settlements_ids = Object.keys(this.settlements_selected);
			const selected        = settlements_ids.filter(i => this.settlements_selected[i]);
			const download_docs   = this.settlements
				.filter(s => selected.indexOf(s.id) != -1)
				.map(s => s.service_unit.payment_notice);

			this.doc_generator_text = 'Generando documento...';

			try
			{
				const mergeResult       = await this.mergeDocuments(download_docs);
				
				this.doc_generator_text = 'Descargar seleccionadas';

				if(!mergeResult.url)
				{
					throw new Error('Empty url');
				}

				const device = Capacitor.getPlatform();
				console.log("Capacitor platform is: " + device);
				if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
					await this.downloadFallback(mergeResult.url);
				}
				else
				{
					window.location.href    = mergeResult.url;
				}

			}
			catch(err)
			{
				this.doc_generator_text = 'Descargar seleccionadas';
								this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'No se ha podido generar el archivo!'
});
			}

		},
		changePeriod: async function(period)
		{

			this.isLoadingSettlements = true;

			try
			{
				// Set settlements
				this.settlements = await this.getSettlements(this.services_association.id, period.id);

				// Set period related info
				this.period_info 	  = await this.getSettlementsSummary(this.services_association.id, period.id);

				this.period           = this.services_association.periods.filter(p => p.id == this.period_info.period_id)[0];
				this.period_documents = this.period_info.period_documents.filter(d => d.type != 'Avisos de pago').map(d => d.url);

				this.isLoadingSettlements = false;


                                      	var datosUser = await this.retrieveUserShowData();
                        
										this.tokenUser = datosUser.idToken.jwtToken;
										this.emailUser = datosUser.idToken.payload.email;
										this.refreshToken = datosUser.refreshToken.token; 

			//aca va código de pago factura vencida

			}
			catch(err)
			{
				console.log(err);
			}

		}
	},
	watch:
	{
		services_association:
		{
			handler(services_association)
			{
				this.period = services_association.periods[services_association.periods.length-1];
				this.changePeriod(this.period);
			}
		}
	},
	created: function()
	{
		if(this.services_association.periods)
		{
			this.period = this.services_association.periods[this.services_association.periods.length-1];
			this.changePeriod(this.period);
		}
	},
	computed:
	{
		 async is_capacitor() {
			if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
				return true;
			}
			return false;
		},

		disable_download_selected()
		{
			const keys     = Object.keys(this.settlements_selected);
			const selected = keys.filter(i => this.settlements_selected[i]);
			return selected.length == 0;
		},
		total_service_units()
		{
			return parseInt(this.period_info.service_units) == 1 ?
				'1 servicio' :
				`${this.period_info.service_units} servicios`;
		},
		settlement_date()
		{

			if(!this.services_association.periods)
			{
				return null;
			}

			return this.services_association.periods.filter(period => period.id == this.period.id)[0].settlement_date;

		},
		services_association()
		{
			return this.$store.getters.servicesAssociation;
		}
	}
}
</script>
