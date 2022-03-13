<template>

	<div class="page-account-view">

		
			<header-back title=" VOLVER" url="/ajustes" />

		
		<section class="bar theme-blue" >
			<div class="container">
				<div class="bar-avatar">
					<span><img src="@/assets/img/icons/mi_cuenta.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Editar contraseña
				</h3>
				
			</div>
		</section>
		
		
	

		<div class="container bar-edit">

			<div class="card border-none mb-4 mt-4 card-type">
				<div class="card-body">
					<h5 class="title">Editar contraseña</h5>

					<form method="POST" action="" @submit="changeUserPassword">


			<div class="form-group cont_pass_home">
	<input  
	v-model="password.old" 
							placeholder="Ingresa contraseña anterior"
							id="old_password" 
							required="required" 
							:type="passwordTypeOld"
							class="form-control"
	>
	<div class="btn_eye">
	<img  :src="[passwordIconOld]" @click="hidePasswordOld = !hidePasswordOld" class="img_info"> 
	</div>
</div>

						
						
						
						<div class="form-group cont_pass_home">
	<input  
	v-validate="'required|min:8|verify_password'"
								v-model="password.new"
								name="new_password"
								id="new_password"
								ref="new_password"
								required="required"
								:type="passwordType"
								class="form-control"
								placeholder="Ingresa nueva contraseña"
	>
	<div class="btn_eye">
	<img  :src="[passwordIcon]" @click="hidePassword = !hidePassword" class="img_info"> 
	</div>
</div>

			
	<div class="alert alert-danger" v-if="errors.first('new_password')">
					<img src="@/assets/img/error.svg" alt="error" class="img_info"> {{ errors.first('new_password').replace('new_password', '') }}
				</div>
					
					
											<div class="form-group cont_pass_home">
	<input  
v-model="password.confirm"
								v-validate="'confirmed:new_password'"
								id="new_password_confirm"
								name="new_password_confirm"
								required="required"
								:type="passwordTypeConfirm"
								placeholder="Confirmar nueva contraseña"
								class="form-control"
	>
	<div class="btn_eye">
	<img  :src="[passwordIconConfirm]" @click="hidePasswordConfirm = !hidePasswordConfirm" class="img_info"> 
	</div>
</div>

							<div class="alert alert-danger" v-if="errors.first('new_password_confirm')">
					<img src="@/assets/img/error.svg" alt="error" class="img_info"> {{ errors.first('new_password_confirm').replace('new_password_confirm', 'Confirmar contraseña nueva') }}
				</div>
							
				
						

						<input type="submit" value="Cambiar contraseña" class="btn btn-primary btn-rounded btn-block min-bottom four_px btn-force"/>

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

	data: function()
	{
		return {
			hidePassword: true,
			hidePasswordConfirm: true,
			hidePasswordOld: true,
			password:
			{
				old:     '',
				new:     '',
				confirm: ''
			}
		}
	},
	computed: {
      passwordType() {
        return this.hidePassword ? 'password' : 'text'
      },
      passwordIcon() {
        return this.hidePassword ? require('@/assets/img/ojo abierto.svg') : require('@/assets/img/ojo cerrado.svg')
      },
	   passwordTypeConfirm() {
        return this.hidePasswordConfirm ? 'password' : 'text'
      },
      passwordIconConfirm() {
        return this.hidePasswordConfirm ? require('@/assets/img/ojo abierto.svg') : require('@/assets/img/ojo cerrado.svg')
      },
	   passwordTypeOld() {
        return this.hidePasswordOld ? 'password' : 'text'
      },
      passwordIconOld() {
        return this.hidePasswordOld ? require('@/assets/img/ojo abierto.svg') : require('@/assets/img/ojo cerrado.svg')
      }
    },
	methods:
	{
		changeUserPassword(e)
		{
			e.preventDefault();

			if(this.errors.any())
			{
				return;
			}

			this.changePassword(this.password.old, this.password.new)
			.then(success =>
			{

				this.$router.push(
				{
					name: 'ajustes',
					params:
					{
						success_message: 'Tu contraseña se editó satisfactoriamente'
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
						error_message: err.code == 'NotAuthorizedException' ?
							'La contraseña actual es incorrecta' :
							'Ocurrió un error al cambiar tu clave, intenta más tarde'
					}
				});

			});

		}
	}

}
</script>
