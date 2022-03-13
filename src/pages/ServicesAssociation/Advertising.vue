<template>

    <div class="page-account-view page-news-view">

       <header-back title=" VOLVER" :url="'/servicios/' + services_association.id + '/sugerencias'" />

        <section class="bar theme-blue">
            <div class="container" v-if="no_advertisings">
                <div class="bar-avatar">
                    <span><img class="img_min" src="@/assets/img/icons/md-globe.svg"></span>
                </div>
                <h3 class="bar-firm-name">
                    {{this.advertising.title}}
                </h3>
                <h5 class="bar-tagline">
                    {{this.advertising.category}}
                </h5>
                <br>
            </div>


            <div class="container" v-else>
                <div class="bar-avatar">
                    <span><img class="img_min" src="@/assets/img/icons/md-globe.svg"></span>
                </div>
                <h3 class="bar-firm-name">
                    Sugerencia
                </h3>
                <h5 class="bar-tagline">
                    Buscando sugerencia...
                </h5>
                <br>
            </div>
        </section>
        <div class="container bar-news">

            <vue-element-loading :active="isLoading" color="#CE4169" spinner="spinner"/>

            <div class="news-detail border-box" v-if="no_advertisings" style="text-align: center">
                <div class="row text-center news-image">
                    <div class="col-lg-12 col-md-6 col-xs-6">
                        <a :href="advertising.image.url" class="d-block mb-4 h-100" data-lightbox="roadtrip">
                            <img :src="advertising.image.thumbnail" alt="" class="img-fluid img-thumbnail" style="width: 45%">
                        </a>
                    </div>
                </div>

                <div class="card-body">


                    <h5 class="title">Descripción</h5>
                    <p class="text-table">{{advertising.description}}</p>
                    <div class="news-attachments-block" style="text-align:center;" v-if="this.youtube_url !== 'undefined' && this.advertising.youtube_url !== ''">
                        
                      
                       
                        
                        <iframe  v-if="advertising.youtube_url.indexOf('youtube.com') !== -1"
                                loading="lazy"
                                :src="`https://www.youtube.com/embed/${this.youtube_url}?rel=0`"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                                style="height: 100%;width: 100%;"
                        />

                        <a v-else :href="advertising.youtube_url" target="_blank">{{advertising.youtube_url}}</a>
                     


                        <div class="news-attachments">

<br>

<a v-if="is_capacitor" @click="downloadFallback(advertising.attachment.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt="" 
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> {{advertising.attachment.file_name}}
							</a>

							<a :href="advertising.attachment.url" v-else @click="downloadFallback(advertising.attachment.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> {{advertising.attachment.file_name}}
							</a>




                        </div>
                    </div>

                </div>
            </div>


            <div class="news-detail border-box" v-else>
                <div class="empty-state empty-state-documents" id="no-documents-message" v-if="imgNo">
                    <div class="wrapper">
                        <h4>¡La sugerencia fue eliminada!</h4>
                        <p>No puedes acceder a esta sugerencia porque ha sido eliminada por la institución.</p>
                        <img alt="" class="image-empty" src="@/assets/img/empty-states/mensaje-documento-eliminado.png">
                    </div>
                </div>
            </div>

            <p-d-fview v-if="pdf" :url="pdf" :title="title" :localuri="localuri"></p-d-fview>


        </div>
    </div>
</template>

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
                loadAdvertisingInfo: async function()
                {
                    try
                    {
                        const data = await this.getAdvertisingView(this.$route.params.services_association_id, this.$route.params.advertising_id);
                        this.advertising = data[0];
                       // console.log(data);
                        if (this.advertising.youtube_url !== 'undefined' && this.advertising.youtube_url !== '') {
                            
                           let cadena = this.advertising.youtube_url;
// esta es la palabra a buscar
let termino = "www.youtube.com/";
// para buscar la palabra hacemos
let posicion = cadena.indexOf(termino);

if (posicion !== -1) {
     const url = this.advertising.youtube_url;
                            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                            var match = url.match(regExp);
                            this.youtube_url = (match&&match[7].length==11)? match[7] : false;
                            }
else {
 this.youtube_url = this.advertising.youtube_url;
}
                        
                            
                           


                        }
                        this.isLoading = false;
                        this.advertisings = true;
                    }
                    catch(err)
                    {
                        this.imgNo = true;
                        this.isLoading = false;
                        //console.log(err);
                    }
                }
            },
        computed:
            {
                no_advertisings() {
                    return !this.isLoading && this.advertisings;
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
        created: function()
        {
            this.loadAdvertisingInfo();
        },
        watch:
            {

                services_association: async function(val)
                {
                    this.loadAdvertisingInfo();
                }

            },
        data: function()
        {
            return {
                advertising: {},
                advertisings: false,
                isLoading: true,
                imgNo: false,
                youtube_url: false,
                pdf: null,
				title: null,
				localuri: null
            }
        }

    }
</script>