<template>
	<div class="modal fade" id="sendRequestModal" tabindex="-1" role="dialog" aria-labelledby="sendRequestModal" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header sendRequestHeader">
					<img src="@/assets/img/pajaro.png"  alt="">
					<h5 class="modal-title sendRequestTitle" id="attachmentsModalLabel" v-if="isSending">Tu sugerencia ha sido enviada</h5>
					<h5 class="modal-title sendRequestTitle" id="attachmentsModalLabel" v-else>Envianos las sugerencias que te resulten importantes para mejorar el servicio</h5>
				</div>
				
				<div class="modal-body">

<div style="display: grid;">	

 <div v-if="isSending" style="text-align:center;">
  <br><br>
 <h1 class="modal-title" id="attachmentsModalLabel" v-if="isSending">GRACIAS</h1>
 <br><br>
<h5 class="modal-title sendRequestTitle" id="attachmentsModalLabel" v-if="isSending">En breve nos comunicaremos contigo</h5>
 </div>
				
 <label class="field" style="color: #272529;" v-else>
   <textarea rows="4" cols="50" placeholder="Escribe tu Sugerencia" maxlength="250" class="field__input sendRequestText a-field__input" id="commentary" name="comment" form="usrform" style="text-align: left;">
</textarea>
 </label>
 
</div>
				</div>
				<div class="modal-footer">
				<vue-element-loading :active="isSending" spinner="spinner" color="#CE4169" />
					<button type="button" class="btn btn-primary" @click="send">
						<span v-if="isSending">Enviando</span>
						<span v-else>Enviar</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SendRequestModal',
	data: function()
	{
		return {
			fileToUpload: {},
			isSending: false
		}
	},
	methods:
	{
send: async function()
		{
			const messageValue = $("#commentary").val();
			if(!messageValue)
			{
this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'Recuerda agregar tu sugerencia!'
});
        return;
			}
			this.isSending = true;
			const messageObject     =
				{
					data: 		 messageValue
				}
			const message = await this.sendRequestSuite(messageObject);
			$("#sendRequestModal").modal('hide');
			this.isSending = false;
			$("#commentary").val='';
		}
	}

}
</script> 
