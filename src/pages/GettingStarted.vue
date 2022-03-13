<template>


<div class="page-account-view">

			<section class="bar theme-blue" >
			<div class="container">
				<div class="bar-avatar">
				
					<span><img src="@/assets/img/icons/ajustes.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					¡Bienvenido/a!
				</h3>
				
			</div>
		</section>


	<div class="container bar-details">
		<br>
		<div class="card mb-4 card_margin card-type">
			<div class="card-body">
				<div>
				<h2 class="title">¡Solo un paso más!</h2>
				<p class="sub_title">Gracias por ser parte de la comunidad siwca.<br>
				Por favor completa tus datos personales debajo.</p>
						</div>		
<div id="divHijo">
			<img
				src="@/assets/img/Bienvenidos.jpeg"
			class="image_welcome"
			/>
			</div>			
										
									
								
			</div>
		</div>

		<div class="card mb-4 card_margin card-type">
			<div class="card-body">
					<vue-element-loading :active="!user.email" spinner="spinner" color="#CE4169"/>

					<h5 class="title_sub">Completa tus datos</h5>

					<form method="POST" action="" @submit="updateMe">
						
							<input required="required" type="text" id="first_name" v-model="user.first_name" class="form-control form_color"
							placeholder="Ingresa tu nombre">
						
						
							<input required="required" type="text" id="last_name" v-model="user.last_name" class="form-control form_color"
							placeholder="Ingresa tu apellido">
					
					
							<input type="number" id="phone_number" v-model="user.phone" class="form-control form_color" 
							placeholder="Ingresa tu teléfono">
					

						<div class="actions_welcome">
						
						<input type="submit" value="Guardar" class="btn btn-rounded btn-primary sw"/>
					
						</div>
			
						
						
						
					</form>
			</div>

		</div>
	</div>
	</div>
</template>


<script>
export default {
name: 'getting-started' ,

	methods:
	{
		updateMe(e)
		{

			e.preventDefault();

			this.getWelcome();
			delete this.user.email;

			this.updateProfile(this.user)
			.then(response =>
			{
				
						//window.open("https://siwca.com.ar/welcome/cooperativas/index.html", "_self"); 

				this.$router.push(
				{
					name: 'servicios',
					params:
					{
						success_message: 'Tu perfil se editó satisfactoriamente'
					}
				});

			})
			.catch(err =>
			{
				this.$router.push(
				{
					name: 'empezar',
					params:
					{
						error_message: 'Ocurrió un error al editar tu perfil, intenta más tarde'
					}
				});
			});

		}
	},
	data: function()
	{
		return {
			user: {},
			newUser: {}
		}
	},
	created: async function()
	{
		this.user = await this.getProfile();
		this.newUser = this.getProfile();
		delete this.newUser.email;
		this.newUser.first_name = "aún no completaste tu nombre"
		this.newUser.last_name = "aún no completaste tu apellido";
		this.newUser.phone = "123456";
		this.updateProfile(this.newUser)
	}
}
</script>
