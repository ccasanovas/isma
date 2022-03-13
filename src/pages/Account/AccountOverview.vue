<template>




	<div class="page-account-view">

		<header-back title=" VOLVER" url="/" />

		
					<section class="bar theme-blue" >
			<div class="container">
				<div class="bar-avatar">
					<span><img src="@/assets/img/icons/ajustes.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Ajustes
				</h3>
				
			</div>
		</section>
		
		
		<div class="container bar-details">

			<div class="card border-none mb-4 mt-4 card-type">

				<vue-element-loading :active="!user.email" spinner="spinner" color="#CE4169" />

				<div class="card-body">

					<!-- messages -->
					<div v-if="$route.params.success_message" class="alert alert-success">{{$route.params.success_message}}</div>
					<div v-if="$route.params.error_message" class="alert alert-danger">{{$route.params.error_message}}</div>

					<h5 class="title">Información personal</h5>
					<p class="sub_title">Mantén tus datos actualizados.</p>

					<table class="table text-table-details">
						<tr>
							<td>Nombre</td>
							<td>{{user.first_name}}</td>
						</tr>
						<tr>
							<td>Apellido</td>
							<td>{{user.last_name}}</td>
						</tr>
						<tr>
							<td>Teléfono</td>
							<td>{{user.phone}}</td>
						</tr>
					</table>
					<div class="max-45"></div>
					<router-link to="/ajustes/editar-perfil" class="btn btn-primary btn-rounded">Editar perfil</router-link>
				</div>
			</div>

			<div class="card border-none mb-4 card-type" >
				<div class="card-body" style="border-left: 4px solid #4e4f77;">
					<h5 class="title">Seguridad y privacidad</h5>
					<p class="sub_title">Cambia tu contraseña.</p>
					<div class="max-50"></div>
					<router-link to="/ajustes/cambiar-clave" class="btn btn-outline-primary btn-rounded">Cambiar contraseña</router-link>
				</div>
			</div>

			<div class="card border-none mb-4 card-type">
				<div class="card-body">
					<h5 class="title">Cerrar sesión</h5>
					<p class="sub_title">Haz clic en salir para cerrar la sesión.</p>
					<div class="max-50"></div>
					<button @click="doLogout" class="btn btn-outline-primary btn-rounded">Salir</button>
				</div>
			</div>

		</div>
	</div>

</template>

<script>

	import HeaderBack from '@/components/HeaderBack';

	export default
	{
		components: 
		{
			HeaderBack
		},
		methods:
		{
			doLogout()
			{

				this.unSubscribePush(this.delete_token);
				this.signOut();

				this.$router.push(
				{
					name: 'ingresar',
					params:
					{
						success_message: 'La sesión se cerro satisfactoriamente'
					}
				});

				location.reload();

			}
		},
		data: function()
		{
			return {
				user: {},
				delete_token:{},
			}
		},
		created: async function()
		{
			this.user = await this.getProfile();
			
			if(process.env.NODE_ENV != 'mobile')
			{

				this.$fbmessaging.requestPermission()
				.then(() =>
				{
					return this.$fbmessaging.getToken();
				})
				.then(token =>
				{
					console.log(token);
					this.delete_token =token;
				})
				.catch(function(err){});

			}	
			
		}

	}
</script>