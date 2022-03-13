<template>

	<div class="amenities-page-wrapper">


		<services-association-header
			:services_association="services_association"
		/>
		
		
		<div class="container">
			<p class="section-header"></p>
		</div>

		<div class="page-content container">
			<vue-element-loading :active="isLoading" background-color="rgba(255, 255, 255, .0)" spinner="spinner" color="#CE4169" />
			<br>
			
			<div class="empty-state empty-state-amenities" v-if="!isLoading && !amenities.length">
					<div class="wrapper">
					<h4>¡Aún no hay amenities!</h4>
						<p>No se han encontrado amenities disponibles.</p>
						<img src="@/assets/img/empty-states/no-hay-amenities.png" class="image-empty" alt="">
					</div>
				</div>
				

			<div class="center-three">
				<div class="amenity" v-for="amenity in amenities">
				
				
					<div class="card">
					  <img class="card-img-top" :src="amenity.image.thumbnail.replace('thumb/xs/', '')">
					  <div class="card-body">
					  
						<div class="card-title">
							<img :src="getTypeImage(amenity.type.name)" />
							<div class="amenity-title-wrapper">							
								<h5 class="amenity-title">{{amenity.title | truncate(15) }}</h5>
								<p class="amenity-subtitle">
									{{amenity.type.name}} &mdash; 
									<span>
										<span v-if="amenity.is_available">Habilitado</span>
										<span v-else>No habilitado</span>
									</span>
								</p>
							</div>
						</div>
						
					    <p class="card-text">{{ amenity.description | excerpt | truncate(120) }}</p>
						
						
						<div class="card-actions">
					    
						<router-link
					    	class="btn btn-rounded btn-default btn_amenity"
					    	:to="{ name: 'detalle-amenity', params: { amenity_id: amenity.id } }">
					    	Detalles
					    </router-link>
						<router-link
							class="btn btn-rounded btn-outline-primary"
							v-if="amenity.is_bookable && amenity.is_available"
							:to="{ name: 'reservar-amenity', params: { amenity_id: amenity.id } }">
							Reservar
						</router-link>
						
					  </div>
					  
					  </div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>


<script>

import HeaderBack from '@/components/HeaderBack';
import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
export default {
	components:
	{
		HeaderBack,
		ServicesAssociationHeader
	},
	methods:
	{
		getTypeImage(type)
		{
			switch(type)
			{
				case 'Quincho/parrilla':
					return require('@/assets/img/amenities/quincho-parrilla.svg');
			   case 'Salón de usos múltiples':
					return require('@/assets/img/amenities/salon-de-usos-multiples.svg');
				case 'Pileta de natación':
					return require('@/assets/img/amenities/pileta-de-natacion.svg');
				case 'Gimnasio':
					return require('@/assets/img/amenities/gimnasio.svg');
				case 'Spa/Sauna':
					return require('@/assets/img/amenities/spa-sauna.svg');
				case 'Playroom':
					return require('@/assets/img/amenities/playroom.svg');
				case 'Solarium':
					return require('@/assets/img/amenities/solarium.svg');
				case 'Laundry':
					return require('@/assets/img/amenities/laundry.svg');
				case 'Microcine':
					return require('@/assets/img/amenities/microcine.svg');
				case 'Minigolf':
					return require('@/assets/img/amenities/minigolf.svg');
			}
		},
		loadAmenities: async function()
		{

			if(!this.services_association.id)
			{
				return;
			}

			try
			{
				this.isLoading = true;
				this.amenities = await this.getAmenities(this.services_association.id);
				this.isLoading = false;
			}
			catch(err)
			{
				this.isLoading = false;
			}
		}
	},
	filters:
	{
		excerpt: function(text)
		{
			return text.substr(0, 250) + '...';
		}
	},
	computed:
	{
        services_association()
        {
            return this.$store.getters.servicesAssociation;
        }
	},
	created: function()
	{
		this.loadAmenities();
	},
	watch:
	{

		services_association: async function(val)
		{
			this.loadAmenities();
		}

	},
	data: function()
	{
		return {
			amenities: [],
			isLoading: true
		}
	}

}
</script>