<template>

	<!-- no estan los estilos de la clase -->
	<div class="page-account-view book-amenity-page-wrapper">

		<header-back title=" VOLVER" :url="'/servicios/' + services_association.id + '/amenities/' + $route.params.amenity_id" />

		<section class="bar theme-blue" v-if="amenity.title">
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
		
		
		<br>

		<div class="container bar-details">


			<div class="card border-box" v-if="amenity.title">

			<img class="card-img-top amanity_img" :src="amenity.image.url">
			
			  <div class="card-body">

			  	
			  
				<h5 class="title">Solicitud de reserva</h5>


				<vue-element-loading
					:active="isLoading"
					spinner="spinner"
					color="#CE4169" />

				<div class="alert alert-success" v-if="form.response.success">
					La solicitud de reserva se envió correctamente.
				</div>

				<div class="alert alert-danger" v-if="form.response.error">
					Ocurrió un error al enviar la solicitud de reserva, intente nuevamente.
				</div>

				<div class="alert alert-danger" v-if="!isLoading && !amenity.is_available">
					Este amenity no esta disponible
				</div>

				<div class="alert alert-danger" v-if="!isLoading && !amenity.is_bookable">
					Este amenity no es reservable
				</div>

				<form method="POST" action="" @submit="sendBookRequest" v-if="amenity.is_bookable && amenity.is_available">

					<div class="booking-datetime" v-if="amenity.booking_type == 'datetime_range'">
						
							<input
								required="required"
								id="request_start"
								type="datetime-local"
								:min="form.min_date"
								:max="form.max_date"
								class="form-control"
								v-model="form.bookrequest_start" />
					

						<div class="form-group">
							<label for="request_end">Fecha fin de reserva:</label>
							<input
								required="required"
								id="request_end"
								type="datetime-local"
								class="form-control"
								:min="form.bookrequest_start"
								v-model="form.bookrequest_end" />
						</div>
					</div>

					<div class="booking-date" v-if="amenity.booking_type == 'date'">
						<div class="form-group">
							<label for="request_start">Fecha de reserva:</label>
							<input
								required="required"
								class="form-control"
								id="request_start"
								type="date"
								:min="form.min_date.split('T')[0]"
								:max="form.max_date.split('T')[0]"
								v-model="form.bookrequest_start" />
						</div>
					</div>

					<div class="form-group">
						<label for="notes">Notas:</label>
						<textarea required="required" id="notes" class="form-control" v-model="form.notes" />
						<small id="notesHelp" class="form-text text-muted">
							Use las notas para dejar aclaraciones respecto a de su reserva, como el horario, servicios adicionales, etc.
						</small>
					</div>

					<div class="form-check max-50">
						<input class="form-check-input" required="required" v-model="form.tos" type="checkbox" value="" id="requestCheck">
						<label class="form-check-label text-muted" for="requestCheck">
							He leído y estoy de acuerdo con los términos de uso.
						</label>
					</div>
					
		
					<input type="submit" class="btn btn-rounded btn-primary min-bottom" value="Reservar" />

				</form>
			  </div>

			</div>


		</div>



	</div>

</template>


<script>

import HeaderBack from '@/components/HeaderBack';

export default {
	components:
	{
		HeaderBack
	},
	methods:
	{
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
				console.log('hola 1');
				console.log(err);
			}
		},
		bookAmenityWithDateTimeRange: async function()
		{

			const book_data =
			{
				book_start: this.form.bookrequest_start,
				book_end: 	this.form.bookrequest_end,
				tos: 		this.form.tos,
				book_notes: this.form.notes
			};

			try
			{
				const bookRequest 		   = await this.bookAmenity(this.$route.params.amenity_id, book_data);
				this.form.response.success = true;
			}
			catch(err)
			{
				this.form.response.error = true;
			}

		},
		bookAmenityWithDate: async function()
		{

			const book_data =
			{
				book_start: this.form.bookrequest_start,
				tos: 		this.form.tos,
				book_notes: this.form.notes
			};

			try
			{
				const bookRequest 		   = await this.bookAmenity(this.$route.params.amenity_id, book_data);
				this.form.response.success = true;
			}
			catch(err)
			{
				this.form.response.error = true;
			}

		},
		sendBookRequest(e)
		{

			e.preventDefault();

			switch(this.amenity.booking_type)
			{
				case 'date':
					this.bookAmenityWithDate();
					return;
				case 'datetime_range':
					this.bookAmenityWithDateTimeRange();
					return;
			}

		}
	},
	computed:
	{
        services_association()
        {
            return this.$store.getters.servicesAssociation;
        },
		 services_association()
        {
            return this.$store.getters.servicesAssociation;
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
	created: async function()
	{
		try
		{
			this.amenity   = await this.getAmenity(this.$route.params.amenity_id);
			this.isLoading = false;
		}
		catch(err)
		{
			this.isLoading = false;
		}
	},
	data: function()
	{
		return {
			amenity: {},
			isLoading: true,
			form:
			{
				response:
				{
					success: false,
					error:   false
				},
				bookrequest_start: '',
				bookrequest_end:   '',
				notes: 		       '',
				tos: 		  	   false,
				min_date:     	   this.$moment().format('YYYY-MM-DDT00:00'),
				max_date:     	   this.$moment().add(365, 'days').format('YYYY-MM-DDT00:00:00'),
				current_date: 	   this.$moment().format('YYYY-MM-DDT00:00:00')
			}
		}
	}
}
</script>