<template>

	<div class="page-account-view page-notifications">

		<header-back title=" VOLVER" url="/" />

					<section class="bar theme-blue" >
			<div class="container">
				<div class="bar-avatar">
					<span><img src="@/assets/img/icono_notificacion_de_noticia-01.svg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Notificaciones
				</h3>
				</br>
			</div>
		</section>
 
 
		<button style="font-size: 0.6rem !important;"
			type="button"
			@click="setAsSeen"
			v-if="notifications.length && !allSeen"
			class="btn btn-primary btn-rounded btn-mark-as-read">
			MARCAR LEIDAS
		</button>

		

		<div class="notifications-index">
			<div class="container bar-notifications">

				<div class="empty-state empty-state-notifications" v-if="!notifications.length">
					<div class="wrapper">
						
						<h4>¡Aún no hay notificaciones!</h4>
						<p>No hay novedades en tu cuenta y tus servicios.</p>
						<img src="@/assets/img/empty-states/no-hay-notificaciones.png" class="image-empty" alt="">
					</div>
				</div>

				
					<div  
					v-for="notification in notifications"
					class="item "
					>

	
	
	

  
  
  
  <div class="details">
  
 
  
    <div  v-bind:class="{'notification-unread' : notification.seen }">
	
	
	 <!-- <div class="date_shadow">
			{{notification.created_at | moment('ll')}} <br>
			</div>	-->
			
			
			<router-link
					 v-if="notification.document_type==1"
					:key="notification.news"
					v-on:click.native="setAsSeenNotification(notification.id)"
					:to="{ name: 'detalle-noticia', params: { id: notification.news, services_association_id: notification.services_association } }"
					class="link_notifications"
				>
  	  <h1 class="newTitle">{{notification.title}}</h1>
	   <div class="notification-date" v-if="notification.created_at">
			{{notification.created_at  | moment('ll')}}
	 </div>
       <h1 class="subTitle">{{notification.body}} </h1>
	  <p>{{notification.cooperative}} - {{notification.service}}</p>
	  </router-link>
	  
	  						<router-link
					  v-else-if="notification.document_type==2"
					:key="notification.news"
							v-on:click.native="setAsSeenNotification(notification.id)"
					:to="{ name: 'detalle-documento', params: { id: notification.news, services_association_id: notification.services_association } }"
					class="link_notifications"	
				>
	  	  <h1 class="newTitle">{{notification.title}}</h1>
	   <div class="notification-date" v-if="notification.created_at">
			{{notification.created_at | moment('ll')}}
	 </div>
       <h1 class="subTitle">{{notification.body}} </h1>
	  <p>{{notification.cooperative}} - {{notification.service}}</p>
	  
	  </router-link>
	  
	  <router-link
					  v-else-if="notification.document_type==3"
					:key="notification.news"
							v-on:click.native="setAsSeenNotification(notification.id)"
					:to="{ name: 'detalle-pago', params: { id: notification.news, services_association_id: notification.services_association } }"
					class="link_notifications"	
				>
	  	  <h1 class="newTitle">{{notification.title}}</h1>
	   <div class="notification-date" v-if="notification.created_at">
			{{notification.created_at | moment('ll')}}
	 </div>
       <h1 class="subTitle">{{notification.body}} </h1>
	  <p>{{notification.cooperative}} - {{notification.service}}</p>
	  
	  </router-link>
	  
	  
	  
	  
	  
	  
	  
    </div>
	 
  </div>
  
 
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
			allSeen:true,
			isLoading: false
		}
	},
	computed:
	{
		notifications()
		{
			return this.$store.getters.notifications;
		}
	},
	watch:
	{
		notifications(value)
		{
			this.allSeen = this.notifications.filter(n => !n.seen).length == 0;
		}
	},
	methods:
	{
		setAsSeen()
		{

			const notifications = this.notifications.map(n => n.id);

			this.setNotificationsAsSeen(notifications)
			.then(s =>
			{
				this.$store.dispatch('fetchNotifications');
				this.allSeen = true;
			})
			.catch(console.log);

		} ,
	
	setAsSeenNotification(noti)
	
	{
	this.setNotificationsAsSeen([ noti ])
			.then(s =>
			{
				this.$store.dispatch('fetchNotifications');
				this.allSeen = true;
			})
			.catch(console.log);

		}
	},
	created: function()
	{
		this.allSeen = this.notifications.filter(n => !n.seen).length == 0;
	}
}
</script>