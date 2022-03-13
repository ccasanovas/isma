<template>

    <div class="page-account-view page-news-view">

        <header-back :url="'/servicios/'+services_association.id+'/noticias'" title=" VOLVER"/>

        <section class="bar theme-blue">
            <div class="container" v-if="no_news">
                <div class="bar-avatar">
                    <span><img class="img_min" src="@/assets/img/icono_news.jpeg"></span>
                </div>
                <h3 class="bar-firm-name">
                    {{news.title}}
                </h3>
                <h5 class="bar-tagline">
                    {{news.category}}
                </h5>
                <br>
            </div>


            <div class="container" v-else>
                <div class="bar-avatar">
                    <span><img class="img_min" src="@/assets/img/icono_news.jpeg"></span>
                </div>
                <h3 class="bar-firm-name">
                    Noticia
                </h3>
                <h5 class="bar-tagline">
                    No encontrada
                </h5>
                <br>
            </div>
        </section>


			<div class="container bar-news">

				<vue-element-loading :active="isLoading" color="#CE4169" spinner="spinner"/>

				<div class="news-detail border-box" v-if="no_news">
					<p class="news-body" v-html="news.body"/>
					<div class="row text-center news-image">
						<div class="col-lg-3 col-md-4 col-xs-6" v-for="image in news.images">
							<a :href="image.url" class="d-block mb-4 h-100" data-lightbox="roadtrip">
								<img :src="image.thumbnail_xs" alt="" class="img-fluid img-thumbnail">
							</a>
						</div>
					</div>
					<div class="news-attachments-block" v-if="news.attachments && news.attachments.length">
						<strong>Adjuntos</strong>

						<div class="news-attachments" v-for="attachment in news.attachments">
							<a v-if="is_capacitor" @click="downloadFallback(attachment.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> {{attachment.file_name}}
							</a>

							<a :href="attachment.url" v-else @click="downloadFallback(attachment.url)" class="btn btn-white"
							   target="_blank">
								<img
										alt=""
										class="icon"
										src="@/assets/img/icons/documento-02.svg"
										style="vertical-align: top;"/> {{attachment.file_name}}
							</a>
						</div>
					</div>
				</div>


				<div class="news-detail border-box" v-else>
					<div class="empty-state empty-state-documents" id="no-documents-message" v-if="imgNo">
						<div class="wrapper">
							<h4>¡La noticia fue eliminada!</h4>
							<p>No puedes acceder a esta noticia porque ha sido eliminada por la institución.</p>
							<img alt="" class="image-empty" src="@/assets/img/empty-states/mensaje-documento-eliminado.png">
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
        created: function () {
            this.loadNewsInfo();
        },
        computed:
            {
                no_news() {
                    return !this.isLoading && this.news_type;
                },

                services_association() {
                    return this.$store.getters.servicesAssociation;
                },
				is_capacitor() {
					if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
						return true;
					}
					return false;
				},

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
                loadNewsInfo: async function () {
                    try {
                        this.news = await this.getNewsDetail(this.$route.params.id);
                        this.news_type = true;
                        this.isLoading = false;

                    } catch (err) {
                        this.imgNo = true;
                        this.isLoading = false;
                        this.news_type = false;
                        //console.log(err);
                    }
                }
            },
        data: function () {
            return {
                news: {},
                news_type: true,
                isLoading: true,
                imgNo: false,
				pdf: null,
				title: null,
				localuri: null,

			}
        }

    }

</script>


