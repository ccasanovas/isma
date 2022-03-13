<template>
	<div class="wrapper page-messages-list">
		<header-back title=" VOLVER" url="/" />

	
		
		
	
	<div class="empty-state empty-state-documents" v-if="channels && channels.length==0" id="no-documents-message">
					<div class="wrapper">
					<h4><br><br>¡Aún no hay canales!</h4>
						<p>Todavía no hay canales de mensajes habilitados</p>
						<img src="@/assets/img/empty-states/no_mensajes.png" class="image-empty" alt="">
					</div>
				</div>
		
<div v-else="channels.length > 0">

	<div class="container">
			<h4 class="section-header" >Elegí el canal</h4>
			<div class="separator_services" ></div>
		</div>


		<div class="container">
			


<section class="wwww" v-if="channels.length > 0">
                <div class="container">
                  <div class="row mt-5">
                    <div class="col">
                      <div class="card-container" id="demo">

<div v-for="channel in channels" class="cardww" tabindex="0">


<router-link
						:to="'/mensajes/cooperativa/'+channel.cooperative.id+'/canal/'+channel.id"
						v-bind:key="channel.id"
						class="card-selected"
						>

                        <div  >
						
						<p style="text-align: center;">
 <img
								src="channel.cooperative.logo_url"
								:srcset="channel.cooperative.logo_url"
								class="" /> <br>

						{{channel.cooperative.name | truncate(40)}}<br>
						{{channel.cooperative.firm_name | truncate(40)}} <br>

						</p>
					<h2>{{channel.name | truncate(18)}}</h2>
						<p style="text-align: center;" >
						
							<br><br>
									<!-- En caso de que existan mensajes con la administración -->
						<div class="messages-cards" v-if="channel.last_message" :class="{ 'font-weight-bold': (!channel.last_message.read_at && channel.last_message.is_sent_by_cooperative) }">
							{{formatMessage(channel.last_message) | truncate(20)}}
							{{channel.last_message.created_at | moment('HH:mm')}}
						</div>
						
							<div class="messages-cards" v-if="!channel.last_message">
							Aún sin Mensajes
						</div>
						
						</p>
						</div>

							</router-link>

</div>


 </div>
                    </div>
                  </div>
                </div>
              </section>





		

			</div>
			</div>
		</div>

	</div>
	
	
	</div>
	
	
	
</template>




<script>

	import HeaderBack   from '@/components/HeaderBack';
	import utils from '@/mixins/utils';

	export default {
		name: 'messages-list',
		mixins:
		[
			utils
		],
		data: function()
		{
			return {
				pageIsFullyLoaded: false,
				channels: []
			}
		},
		created: function()
		{
			// Refresh messages
			//this.channels = this.getChannels();
			this.$store.dispatch('fetchMessages');
			this.getMessagesByChannels();
			
		},
		filters:
		{
			to_avatar(string)
			{
				return string.substr(0,1);
			}
		},
		components:
		{
			HeaderBack
		},
		computed:
		{
			messages()
			{
				return this.$store.getters.messages;
			}
		},
		methods:
		{
			getMessagesByChannels: async function () {
 
			this.getChannels().then(channels =>
			{
				this.channels = channels;
					for(let i=0; i < this.channels.length; i++)
			{

				
				//TENGO LOS CANALES AHORA BUSCO SI TENGO MENSAJES
				//console.log(this.messages);
	if ( (this.messages !== null || this.messages !== undefined || this.messages !== '') && (this.messages && this.messages.length) ){
					for(let a=0; a < this.messages.length; a++)
			{
				
				if (this.channels[i].id===this.messages[a].channel.id) {
					this.channels[i].last_message = this.messages[a].last_message;
				}

				
			}

	}
			
			}
				
			})
			.catch(err =>
			{
				this.channels = null;
			});


			if ( (this.channels === null || this.channels === undefined || this.channels === '') ){
 
} else {
			
			for(let i=0; i < this.channels.length; i++)
			{

				
				//TENGO LOS CANALES AHORA BUSCO SI TENGO MENSAJES
				//console.log(this.messages);
	if ( (this.messages !== null || this.messages !== undefined || this.messages !== '') && (this.messages && this.messages.length) ){
					for(let a=0; a < this.messages.length; a++)
			{
				
				if (this.channels[i].id===this.messages[a].channel.id) {
					this.channels[i].last_message = this.messages[a].last_message;
				}

				
			}

	}
			
			}
			
}

			
			},
			formatMessage(message)
			{
				var messageToReturn = message;

				if(message.excerpt)
				{
					const messageParsed = message.excerpt.replace('<', '')
					.replace('>', '');
					
					if(!message.is_sent_by_cooperative)
					{
						return 'Tú: ' + emojione.toImage(messageParsed);
					}
					messageToReturn = emojione.toImage(messageParsed);
				}

				if(message.images_count)
				{
					messageToReturn = 'Imagen';
				}

				if(message.attachments_count)
				{
					messageToReturn = 'Adjunto';
				}

				return !message.is_sent_by_cooperative ? 'Tú:' + messageToReturn : messageToReturn ;

			}
		}
	}
</script>