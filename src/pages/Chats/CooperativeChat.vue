<template>

	<div class="wrapper">


<header-back v-if="data.cooperative" :title="data.cooperative.firm_name+' - '+data.channel.name" url="/mensajes"  />
		<AttachmentsModal @upload="uploadFile" :uploading="isUploading" />

		<Messages :messages="data.messages" />

		<SendMessageForm @send="sendMessageToCooperative" @uploadPhoto="uploadPhoto" />

	</div>

</template>


<script>

	import HeaderBack       from '@/components/HeaderBack';
	import Messages         from '@/components/Chats/Messages';
	import SendMessageForm  from '@/components/Chats/SendMessageForm';
	import AttachmentsModal from '@/components/Chats/AttachmentsModal';

	export default {
		name: 'cooperative-chat',
		components:
		{
			HeaderBack,
			Messages,
			SendMessageForm,
			AttachmentsModal
		},
		data: function()
		{
			return {
				data: [],
				messagesInterval: {},
				input_message: '',
				isUploading: false,
				fileToUpload: {},
				upload:
				{
					attachments: [],
					images: []
				}
			}
		},

		methods:
		{

			sendMessageToCooperative: async function(message, imagesArray = [], attachmentsArray = [])
			{

				const messageObject     =
				{
					body: 		 message,
					attachments: attachmentsArray.map(a => a.id),
					images: 	 imagesArray.map(i => i.id)
				}

				try
				{

					const message = await this.sendMessage(messageObject, this.data.cooperative.id,this.data.channel.id);

					this.data.messages.push(
					{
						is_sent_by_cooperative: false,
						attachments: 			   attachmentsArray,
						created_at: 			   this.$moment(),
						images: 				   imagesArray,
						body: 					   message.body,
					});


				}
				catch(err) {
					console.log(err);
				}

			},
			async uploadPhoto(eventData) {
				const isImage = eventData.mimeType.indexOf('image') > -1;
				const imagesArray = [];
				const attachmentsArray = [];

				if (isImage) {
					const image = await this.uploadChatImage(eventData.data, eventData.mimeType);
					imagesArray.push(image);
				} else {
					const attachment = await this.uploadChatAttachment(eventData.data, eventData.mimeType);
					attachmentsArray.push(attachment);
				}
				if (isImage) {
					setTimeout(async () => {
						await this.sendMessageToCooperative('', imagesArray, attachmentsArray);
						// eslint-disable-next-line no-undef
						this.isUploading = false;
					}, 3000);
				} else {
					await this.sendMessageToCooperative('', imagesArray, attachmentsArray);
					// eslint-disable-next-line no-undef
					this.isUploading = false;
				}
			},

			loadMessages: async function()
			{

				try
				{
					this.data 		   = await this.getMessagesByCooperative(this.$route.params.cooperative_id,this.$route.params.channel_id);
					this.data.messages = this.data.messages.reverse();
				}
				catch(err) {}

			},
			uploadFile: async function(eventData)
			{

				this.isUploading = true;

				var imagesArray      = [];
				var attachmentsArray = [];

				const isImage = eventData.mimeType.indexOf('image') > -1;

				try
				{

					if(isImage)
					{
						const image = await this.uploadChatImage(eventData.data, eventData.mimeType);
						imagesArray.push(image);
					}
					else
					{
						const attachment = await this.uploadChatAttachment(eventData.data, eventData.mimeType);
						attachmentsArray.push(attachment);				
					}
					
				

					if(isImage)
					{
						setTimeout(async() =>
						{
							const message = await this.sendMessageToCooperative('', imagesArray, attachmentsArray);
							$('#attachmentsModal').modal('toggle');
							this.isUploading = false;
						}, 3000);
					}
					else
					{
						const message = await this.sendMessageToCooperative('', imagesArray, attachmentsArray);
						$('#attachmentsModal').modal('toggle');
						this.isUploading = false;
					}
					
				}
				catch(err)
				{
					console.log(err);
				}

			}
		},
		created: function()
		{

			this.loadMessages();

			this.messagesInterval = setInterval(() =>
			{
				this.loadMessages();
			},
				(process.env.CHAT_TIME_REFRESH * 5000)
			);

		},
		beforeDestroy: function()
		{
			clearInterval(this.messagesInterval);
		}
	}
</script>
