<template>

 
<div id="newSplash">

  <div class="wrapper_new">
   
   
 <div class="main_login">
 
<div class="login-form">
					
						<div class="head_reset" align="center">
							<img src="@/assets/img/logo.svg" alt="user-profile" class="img_login_ipr">
										
									</div>	
									
								<div id="step-1" v-if="!code_sent" @submit="sendVerificationCode">

					<form method="POST">
						<div class="alert alert-info new_border">
							<center class="reset_text">Te enviaremos un código para <br> poder reestablecer tu contraseña. <br><br><strong>No cierres esta ventana</strong>.<br></center>
						</div>

					
			<input v-autofocus id="email" required="required" v-model="credentials.email" class="form-control max-margin" type="email" placeholder="Ingresa tu correo electrónico">
		
		
			
						<input type="submit" value="ENVIAR CODIGO" class="btn btn-rounded btn_login-new btn-block change_password"/>
			</form>
					
				</div>
				
				
				<div id="step-2" v-if="code_sent" >

					<form method="POST" @submit="setNewPassword" action="">

						<div class="alert alert-info new_border">
							<center class="reset_text">Te hemos enviado un código para restablecer tu contraseña.<br><br>
							Tu nueva contraseña debe contener:<br>
							- Mínimo 8 caracteres<br>
							- Letras mayúsculas y minúsculas<br>
							- Al menos un número
							
							</center>
						</div>

						<input
							required="required"
							v-model="code"
							class="form-control"
							type="text"
							placeholder="Ingresa el código recibido"
						/>



			<div class="form-group cont_pass">
	<input 
	id="new_password" 
							v-validate="'required|min:8|verify_password'"
							v-model="credentials.new_password"
							name="new_password"
							ref="new_password"
							class="form-control pass-show"
							:type="passwordType"
							placeholder="Ingresa nueva contraseña"
	>
	<div class="btn_eye">
	<img  :src="[passwordIcon]" @click="hidePassword = !hidePassword" class="img_info"> 
	</div>
</div>

						<div class="alert alert-danger" v-if="errors.first('new_password')">
					<img src="@/assets/img/error.svg" alt="error" class="img_info"> {{ errors.first('new_password').replace('new_password', '') }}
				</div>



			<div class="form-group cont_pass">
	<input  
v-validate="'confirmed:new_password'"
							required="required"
							name="new_password_confirm"
							v-model="credentials.new_password_confirm"
							class="form-control max-margin pass-show"
							:type="passwordTypeConfirm"
							placeholder="Confirmar nueva contraseña"
	>
	<div class="btn_eye" style="margin-top: -60px;" >
	<img  :src="[passwordIconConfirm]" @click="hidePasswordConfirm = !hidePasswordConfirm" class="img_info"> 
	</div>
</div>



						
									<div class="alert alert-danger" v-if="errors.first('new_password_confirm')">
					<img src="@/assets/img/error.svg" alt="error" class="img_info"> {{ errors.first('new_password_confirm').replace('new_password_confirm', '') }}
				</div>
						
						<input type="submit" value="RESTRABLECER CONTRASEÑA" class="btn btn-rounded btn_login-new btn-block change_password"/>
						

					</form>
</div>

	<div class="copy-reset">
			<p>
			 <router-link to="/ingresar">
							 VOLVER
			</router-link>
			</p> 
		
			</div>
				
				
				
				

		  </div>
						  
</div>
		  

		</div>

		  </div>
  
</template>

<script>

export default {
	data: function()
	{
		return {
			code: null,
			code_sent: false,
			hidePassword: true,
			hidePasswordConfirm: true,
			credentials:
			{
				email: null,
				new_password: null,
				new_password_confirm: null
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
      }
    },
	methods:
	{
		returnSuccess(message)
		{
			this.$router.push(
			{
				name: 'ingresar',
				params:
				{
					success_message: message
				}
			});
		},

		returnError(message)
		{
			this.$router.push(
			{
				name: 'ingresar',
				params:
				{
					error_message: message
				}
			});
		},

		sendVerificationCode(e)
		{

			e.preventDefault();

			this.code_sent = true

			this.resetPassword(this.credentials.email)
			.then(r =>
			{
				this.code_sent = true;
			})
			.catch(err =>
			{
				this.returnError('Ocurrió un error, intenta nuevamente');
			});

		},

		setNewPassword(e)
		{

			e.preventDefault();
			
			if(this.credentials.new_password != this.credentials.new_password_confirm)
			{
				this.returnError('Las contraseñas deben coincidir');
				return;
			}
			

			if(this.credentials.new_password != this.credentials.new_password_confirm)
			{
				this.returnError('Las contraseñas deben coincidir');
				return;
			}
			
				if(this.credentials.new_password.length < 8)
			{
				this.returnError('Las contraseñas deben tener 8 caracteres como minimo');
				return;
			}
			
				if(this.credentials.new_password.length < 8)
			{
				this.returnError('Las contraseñas deben tener 8 caracteres como minimo');
				return;
			}

			this.confirmPassword(this.code, this.credentials.new_password_confirm)
			.then(
				success => this.returnSuccess('Tu clave se reestableció correctamente')
			)
			.catch(
				error   => this.returnError('Ocurrió un error, intenta nuevamente')
			);

		}

	}
}
</script>

<style lang="scss" scoped>
#newSplash {
 height: 100vh;
    width: 100vw;
    background-size: cover;
    background: #002639;
	background-size: 100% 100%;
}
</style>