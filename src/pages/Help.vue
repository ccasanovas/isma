<template>

 
<div id="newSplash">

  <div class="wrapper_new">
   
   
 <div class="main_login">
 
<div class="login-form" style="margin: 5% auto 4%;">

						<vue-element-loading :active="isSending" spinner="spinner" color="#CE4169" />
						<div class="head_reset" align="center">
										<img src="@/assets/img/logo.svg" alt="user-profile" class="img_login_ipr">
									</div>	
									<h3>Ingresa tus datos y nos comunicaremos contigo para facilitarte el acceso.</h3>
			

					<form method="POST" @submit="$send">

	<input required="required" type="text" id="first_name" v-model="user.first_name" class="form-control"
							placeholder="Ingresa tu nombre">
						
						
							<input  type="text" id="last_name" v-model="user.last_name" class="form-control"
							placeholder="Ingresa tu apellido">
					
					
							<input type="number" id="phone_number" v-model="user.phone" class="form-control" 
							placeholder="Ingresa tu teléfono">
							
								<input type="email" required="required" id="email" v-model="user.email" class="form-control" 
							placeholder="Ingresa tu email">
							
							
					 <label class="field" style="color: #272529;" >
   <textarea rows="6" cols="50" placeholder="Para que podamos ayudarte, te solicitamos el código de Familia o Alumno que figura en tu cuota y el motivo por el que no puedes ingresar." required="required" maxlength="250" class="form-control max-margin" 
   id="commentary" name="comment" form="usrform" style="text-align: left;">
</textarea>
 </label>

					<input type="submit" value="ENVIAR" class="btn btn-rounded btn-primary btn-block"/>
					</form>
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
			user: {},
			isSending: false
		}
	},
	methods:
		{
$send: async function(e)
		{
			e.preventDefault();
			this.isSending = true;
			const messageValue = $("#commentary").val();

	if(!messageValue)
			{
		this.isSending = false;
this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'Recuerda agregar tu Motivo!'
});
        return;
			}			
			
			if(!this.user.email)
			{
				this.isSending = false;
this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'Recuerda agregar tu Email!'
});
        return;
			}

			if(!this.user.first_name)
			{
					this.isSending = false;
this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'Recuerda agregar tu Nombre!'
});
        return;
			}			

			const messageObject     =
				{
						'nombre': this.user.first_name,
						'apellido': this.user.last_name,
						'telefono': this.user.phone,
						'email': this.user.email,
						'motivo' : messageValue
				}
			const message = await this.sendRequestApiPower(messageObject);
			this.isSending = false;
this.$swal({
  type: 'success',
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText:'Aceptar',
  title: 'Información enviada',
  text: 'Nos comunicaremos contigo en breve!'
}).then((result) => {
if (result) {
this.$router.push(
				{
					name: 'ingresar',
					params:
					{
						success_message: 'Nos comunicaremos en breve!'
					}
				});	
	
}
}
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
