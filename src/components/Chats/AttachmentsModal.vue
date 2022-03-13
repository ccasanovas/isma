<template>
	<div class="modal fade" id="attachmentsModal" tabindex="-1" role="dialog" aria-labelledby="attachmentsModal" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="attachmentsModalLabel">Adjuntos</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<p>Permite imágenes (jpg, png) y documentos (pdf) hasta 10MB</p>

<div class="input-group">

  <div class="custom-file">
    <input type="file" class="custom-file-input" id="fileUploader"
      aria-describedby="fileUploader"  ref="myFileInput" @change="onUploaderChange">
    <label class="custom-file-label" id="info" for="fileUploader">Selecciona el archivo</label>
  </div>
</div>

				</div>
				<div class="modal-footer">
				<vue-element-loading :active="uploading" spinner="spinner" color="#CE4169" />
					<button type="button" class="btn btn-primary" @click="readFile">
						<span v-if="uploading">Enviando</span>
						<span v-else>Enviar</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AttachmentsModal',
	props: ['uploading'],
	data: function()
	{
		return {
			fileToUpload: {},
		}
	},
	methods:
	{
		onUploaderChange(e)
		{
			this.fileToUpload = e.target.files[0];
			 if(['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].indexOf(this.fileToUpload.type) == -1) {
      					this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'Recuerda cargar el tipo de archivo permitido!'
});
document.getElementById('info').innerHTML = 'Selecciona el archivo';
this.fileToUpload = {};
        return;
    }else {
	var pdrs = this.fileToUpload.name;
    document.getElementById('info').innerHTML = pdrs;	
	}
		},
		readFile()
		{
			
			if(!this.fileToUpload)
			{
				return;
			}

			const reader = new FileReader();

			reader.onload = (async (f) =>
			{
				
				try
				{
					this.$emit('upload',
					{
						data:  f.target.result,
						mimeType: this.fileToUpload.type
					});
					
					this.fileToUpload = {};
					this.$refs.myFileInput.value = '';
					document.getElementById('info').innerHTML = 'Selecciona el archivo';
	
				}
				catch(err){	
				this.fileToUpload = {};
				this.$refs.myFileInput.value = '';
				}
			});
			
	 if(['image/jpeg', 'image/jpg', 'image/png','application/pdf'].indexOf(this.fileToUpload.type) == -1) {
      					this.$swal({
  type: 'error',
  title: 'Ocurrió un error',
  text: 'Recuerda cargar el tipo de archivo permitido!'
});
document.getElementById('info').innerHTML = 'Selecciona el archivo';
this.fileToUpload = {};
        return;
    }	else {
		reader.readAsArrayBuffer(this.fileToUpload);
	}
		}
	}

}
</script>