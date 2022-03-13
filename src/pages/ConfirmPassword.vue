<template>

 
<div id="newSplash">

  <div class="wrapper_new">
   
   
 <div class="main_login">
 
<div class="login-form">
					
						<div class="head_reset" align="center">
							<img src="@/assets/img/logo.svg" alt="user-profile" class="img_login_ipr">
									</div>	
									<h1>Cambiar Contraseña</h1>
			

					<form method="POST" @submit="$_ConfirmPasswordPage_changeTemporaryPassword">

						<div class="alert alert-info">
							<center class="reset_text">La institución te proporcionó una clave temporal. Por seguridad te pedimos que la cambies.<br><br>
							Tu nueva contraseña debe contener:<br>
							- ocho o más caracteres<br>
							- letras mayúsculas y minúsculas<br>
							- al menos un número
							
							</center>
						</div>
						
						
						<input disabled="disabled" type="email" v-model="user" id="email" class="form-control">
						
						<div>
						<img :src="[passwordIcon]" class="img_info show-pass" @click="hidePassword = !hidePassword">
						<input id="new_password" 
							v-validate="'required|min:8|verify_password'"
							v-model="password.new"
							name="new_password"
							ref="new_password"
							class="form-control"
							:type="passwordType"
							placeholder="Ingresa tu nueva contraseña"
						/>
						</div>
						
						
						<div class="alert alert-danger" v-if="errors.first('new_password')">
					<img src="@/assets/img/error.svg" alt="error" class="img_info"> {{ errors.first('new_password').replace('new_password', '') }}
				</div>

<div>
<img :src="[passwordIconConfirm]" class="img_info show-pass" @click="hidePasswordConfirm = !hidePasswordConfirm">
						<input id="confirmation"
							v-validate="'confirmed:new_password'"
							required="required"
							name="new_password_confirm"
							v-model="password.confirmation"
							class="form-control"
								:type="passwordTypeConfirm"
							placeholder="Confirma tu nueva contraseña"
						/>
						</div>
						
									<div class="alert alert-danger" v-if="errors.first('new_password_confirm')">
					<img src="@/assets/img/error.svg" alt="error" class="img_info"> {{ errors.first('new_password_confirm').replace('new_password_confirm', '') }}
				</div>	
				
				<div class="alert alert-danger" v-if="error">
					{{error}}
				</div>
				
						<input type="submit" value="CAMBIAR CONTRASEÑA" class="btn btn-rounded btn_login-new btn-block"/>
					</form>

		  </div>
						  
</div>
		  

		</div>

		  </div>
  
</template>

<script>

export default {
	props: ['referrer'],
	data: function()
	{
		return {
			user: this.$route.params.username,
			newUser:{},
			hidePassword: true,
			hidePasswordConfirm: true,
			password:
			{
				new: 		  '',
				confirmation: ''
			},
			error: null
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
      }
    },
	methods:
	{
		$_ConfirmPasswordPage_changeTemporaryPassword(e)
		{
			e.preventDefault();

			if(this.password.new != this.password.confirmation)
			{
				this.error = 'Las contraseñas ingresadas deben coincidir entre si';
				return;
			}

			this.changeTemporaryPassword(this.password.new)
			.then(success =>
			{
				console.log(success)
				window.location.replace('/empezar');
			})
			.catch(console.log)
		}
	}
}
</script>
<style lang="scss" scoped>
#newSplash {
  height: 100vh;
  width: 100vw;
  background-size:cover;
  background: #002639;
  background-size: 100% 100%;
}
</style> 