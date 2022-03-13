<template>


	<div class="page-account-view">

		
		<header-back title=" VOLVER"  url="/ajustes" />

		
			<section class="bar theme-blue" >
			<div class="container">
				<div class="bar-avatar">
					<span><img src="@/assets/img/icons/mi_cuenta.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Mi perfil
				</h3>
				
			</div>
		</section>
		
		


		<div class="container bar-edit">

			<div class="card border-none mb-4 mt-4 card-type">
				<div class="card-body">

					<vue-element-loading :active="!user.email" spinner="spinner" color="#CE4169"/>

					<h5 class="title">Editar perfil</h5>

					<p class="text-table">
				Por favor, asegúrate de mantener tus datos de contacto al día para que las transmisiones sean efectivas.</p>

					<form method="POST" action="" @submit="updateMe">
						
							<input required="required" type="text" id="first_name" v-model="user.first_name" class="form-control"
							placeholder="Ingresa tu nombre">
						
						
							<input required="required" type="text" id="last_name" v-model="user.last_name" class="form-control"
							placeholder="Ingresa tu apellido">
					
					
							<input type="number" id="phone_number" v-model="user.phone" class="form-control" 
							placeholder="Ingresa tu teléfono">
					
						
							<input disabled="disabled" type="email" v-model="user.email" id="email" class="form-control max-50">
					
						<input type="submit" value="Guardar cambios" class="btn btn-primary btn-rounded btn-block min-bottom four_px btn-force"/>
						
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
		updateMe(e)
		{

			e.preventDefault();

			delete this.user.email;

			this.updateProfile(this.user)
			.then(response =>
			{

				this.$router.push(
				{
					name: 'ajustes',
					params:
					{
						success_message: 'Tu información se editó satisfactoriamente'
					}
				});

			})
			.catch(err =>
			{
				this.$router.push(
				{
					name: 'ajustes',
					params:
					{
						error_message: 'Ocurrió un error al editar tu información, intenta más tarde'
					}
				});
			});

		}
	},
	data: function()
	{
		return {
			user: {}
		}
	},
	created: async function()
	{
		this.user = await this.getProfile();
	}
}
</script>