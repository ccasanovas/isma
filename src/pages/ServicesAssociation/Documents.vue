<template>

	<div class="page-services-associations-documents">

		<services-association-header
			:services_association="services_association"
		/>
		
		<div class="container">
			<p class="section-header">Documentos</p>
		</div>

	

		<dropdown-selector
			@selected="changeType"
			:options="types"
			:default="type"
		/>

		<div class="documents-index">
			<div class="container">

				<vue-element-loading :active="isLoading" spinner="spinner" color="#CE4169" />

				<div class="empty-state empty-state-documents" v-if="no_documents" id="no-documents-message">
					<div class="wrapper">
					<h4>¡Aún no hay documentos!</h4>
						<p>En esta sección vas a encontrar reglamentación vigente, documentos para trámites y de interés.</p>
						<img src="@/assets/img/empty-states/no-hay-documentos.png" class="image-empty" alt="" >
					</div>
				</div>


				<div class="document_card" v-else-if="!no_documents && is_capacitor">

					<a v-for="doc in documents" :key="doc.id" @click="downloadFallback(doc.url)"
					   class="document-item">
						<span class="document-icon-container circled"><img src="@/assets/img/icons/document.svg" class="document-icon" alt="" /></span>

						<div class="document-data">

							<div class="document-title">
								<div class="document-date" v-if="doc.modified_at || doc.created_at">
									{{ (doc.modified_at ? doc.modified_at : doc.created_at) | moment('ll') }}
								</div>
								<h5 class="document-title">{{doc.title}}</h5>
								<h4 class="document-category">{{doc.type}}</h4>
							</div>

						</div>
					</a>

				</div>
				<div class="document_card" v-else-if="!no_documents && !is_capacitor">

					<a v-for="doc in documents" :key="doc.id" :href="doc.url" target= '_blank'
					   class="document-item">
						<span class="document-icon-container circled"><img src="@/assets/img/icons/document.svg" class="document-icon" alt="" /></span>

						<div class="document-data">

							<div class="document-title">
								<div class="document-date" v-if="doc.modified_at || doc.created_at">
									{{ (doc.modified_at ? doc.modified_at : doc.created_at) | moment('ll') }}
								</div>
								<h5 class="document-title">{{doc.title}}</h5>
								<h4 class="document-category">{{doc.type}}</h4>
							</div>

						</div>
					</a>

				</div>
			</div>
			<p-d-fview v-if="pdf" :url="pdf" :title="title" :localuri="localuri"></p-d-fview>

		</div>


	</div>

</template>

<script>

import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
import DropdownSelector 	   from '@/components/DropdownSelector';
import {Capacitor} from "@capacitor/core";
import {Filesystem, Directory} from "@capacitor/filesystem";
import {Dialog} from "@capacitor/dialog";
import axios from 'axios';
import { Browser } from '@capacitor/browser';
import PDFview from '@/components/PDFView';

export default {
	components:
	{
		PDFview,
		ServicesAssociationHeader,
		DropdownSelector
	},
	computed:
	{
		no_documents()
		{
			return !this.isLoading && (!this.types || !this.documents || this.documents.length == 0);
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
		},

	},
	data: function()
	{
		return {
			documents: null,
			types:     null,
			type:      null,
			isLoading: true,
			pdf: null,
			title: null,
			localuri: null,
		}
	},
	created: function()
	{
		if(this.services_association.document_types)
		{
			this.types = this.getDocumentTypes();
			this.type  = this.types[0]
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

				}).catch(error  => console.log(error));
			});
		},

		getDocumentTypes()
		{

			if(!this.services_association.document_types)
			{
				return;
			}
			return this.services_association.document_types.filter(
				t => t.name != 'Avisos de pago' && t.name != 'Boletin Mensual'
			).sort((a, b) => (a.name > b.name) ? 1 : -1)

		},

		changeType(type)
		{

			this.isLoading = true;

			if(!type)
			{
				this.isLoading = false;
				return;
			}

			this.getDocuments(this.services_association.id, type.slug)
			.then(documents =>
			{
				this.documents = documents;
				this.type 	   = type;
				this.isLoading = false;
			})
			.catch(err =>
			{
				this.isLoading = false;
			});
		}

	},
	watch:
	{
		services_association()
		{
			if(this.services_association.document_types && !this.type)
			{
				this.types = this.getDocumentTypes();
				this.type  = this.types[0]
			}
		},
		type:
		{
			handler(type)
			{
				this.changeType(this.type);
			}
		}
	}
}
</script>
