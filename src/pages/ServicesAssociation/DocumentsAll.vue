<template>

	<div class="page-services-associations-documents">

		<services-association-header
			:services_association="services_association"
		/>
	
	
		<div class="container">
			<p class="section-header">Notificación documentos</p>
		</div>

		
<br>
		<div class="documents-index">
			<div class="container">

				<vue-element-loading :active="isLoading" spinner="spinner" color="#CE4169" />

				<div class="empty-state empty-state-documents" v-if="no_documents" id="no-documents-message">
					<div class="wrapper">
					<h4>¡Aún no hay documentos!</h4>
						<p>En esta sección vas a encontrar documentos de interés.</p>
						<img src="@/assets/img/empty-states/no-hay-documentos.png" class="image-empty" alt="">
					</div>
				</div>
		
		<div class="document_card" v-else="!no_documents">
				<a v-for="doc in documents" :href="doc.url" @click="downloadFallback(doc.url)" target= '_blank' class="document-item">
				<span class="document-icon-container circled">
						<img src="@/assets/img/icons/document.svg" class="document-icon" alt="" />
					</span>
						
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
		</div>


	</div>

</template>

<script>
import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
import {Capacitor} from "@capacitor/core";
import { Browser } from '@capacitor/browser';

export default {
	components:
	{
		ServicesAssociationHeader
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
        }
	},
	data: function()
	{
		return {
			documents: null,
			types:     null,
			type:      null,
			isLoading: true
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

		getDocumentTypes()
		{


			if(!this.services_association.document_types)
			{
				return;
			}
			
			if (this.$route.params.category=='Liquidaciones') {
				console.log(this.$route.params.category);
				this.$router.push({
					name: 'facturas',
					params:
					{
						services_association_id: this.$route.params.services_association_id
					}
				});
			
			}
			
				return this.services_association.document_types.filter(
				t => t.name != 'Avisos de pago' && t.name != 'Boletin Mensual' && t.name==this.$route.params.category
			)

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
 
