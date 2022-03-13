<template>

	<div class="chat-messages chat-style">

		<div class="container" >

			<div v-for="(message, index) in messages"
			     class="message clearfix"
			     v-bind:class="{ 'message-in': message.is_sent_by_cooperative, 'message-out': !message.is_sent_by_cooperative }"
			     :id="'message-'+index">

				<div class="chat-timestamp text-muted" v-if="shouldDisplayDateSeparator(index)">
					<p class="text-center" style="margin-top:24px;color:#ffffff;">{{message.created_at | moment('ll')}}</p>
				</div>

				<div class="message-avatar"></div>

				<div class="message-content">

					<div class="message-text" v-html="parseMessageBody(message.body)"></div>

					<!-- images -->
					<div class="msg-images" v-if="message.images.length">
						<a v-for="image in message.images" :href="image.url" :data-lightbox="'message-'+index+'-images'" class="d-block mb-4 h-100">
							<img class="img-fluid img-thumbnail" :src="image.thumbnail_xs" alt="">
						</a>
					</div>

					<!-- attachments -->
					<div class="msg-attachments" v-if="message.attachments.length">
						<p v-for="attachment in message.attachments"><a target="_blank" :href="attachment.url">{{attachment.file_name}}</a></p>
					</div>

					<div class="message-metadata">
						<span class="message-date">
							{{message.created_at | moment('HH:mm')}}
						</span>
						<span v-if="message.read_at && !message.is_sent_by_cooperative">
							Visto ✓
						</span>
					</div>
				</div>
			</div>

		</div>

	</div>

</template>

<script>

export default {
	props: ['messages'],
	watch:
	{
		messages:
		{
			immediate: true,
			handler: function(messages_arr)
			{

				setTimeout(() =>
				{

					if(!this.messages)
					{
						return;
					}

					const lastMessage = 'message-' + (this.messages.length-1);
					const msgElement  = document.getElementById(lastMessage);

					if(msgElement)
					{
						msgElement.scrollIntoView();
					}

				}, 100);

			}
		}
	},
	methods:
	{
		parseMessageBody(message)
		{

			if(!message)
			{
				return;
			}

			const parsedMessage = message
				.replace('<', '')
				.replace('>', '');

			if(typeof emojione == 'undefined')
			{
				return parsedMessage;
			}

			return emojione.toImage(parsedMessage);

		},
		shouldDisplayDateSeparator(index)
		{

			if(!this.messages[index-1])
			{
				return true;
			}

			const previousMessageDate = new Date(this.messages[index-1].created_at);
			const currentMessageDate  = new Date(this.messages[index].created_at);

			return previousMessageDate.getDate() != currentMessageDate.getDate();

		}
	}
}
</script>