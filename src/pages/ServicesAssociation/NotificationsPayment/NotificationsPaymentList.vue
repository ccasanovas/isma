<template>

	<div class="page-account-view page-notifications">

		<header-back title=" VOLVER" url="/" />

					<section class="bar theme-blue" >
			<div class="container">
				<div class="bar-avatar">
					<span><img src="@/assets/img/icono_pagos.jpeg" class="img_min"></span>
				</div>
				<h3 class="bar-firm-name">
					Notificaciones de Pago
				</h3>
				</br>
			</div>
		</section>
 


		<div class="notifications-index">
		
		<vue-element-loading :active="isLoading" spinner="spinner" color="#CE4169" />
		
			<div class="container bar-notifications">

				<div class="empty-state empty-state-notifications" v-if="!paymentNotifications.length" >
					<div class="wrapper">
						
						<h4>¡Aún no hay notificaciones de pago!</h4>
						<p>No hay notificaciones de pago en tu cuenta.</p>
						<img src="@/assets/img/empty-states/no_pagos.png" class="image-empty" alt="" >
					</div>
				</div>

				
					<div  
					v-for="notification in paymentNotifications"
					class="item-payment " v-if="paymentNotifications.length"
					>


  <div class="details">
  
 
  
    <div  class="notification-unread">
<router-link
					:to="{ name: 'detalle-pago', params: { id: notification.id } }"
					class="link_notifications"
				>
				<div>
				
				<div class="notifications-sub notification-payment">
				<div class="noti-date">Fecha:</div>
				<div class="noti-amount">Monto:</div>
				<div >Método:</div>
				</div>
				
				<div class="notifications-sub newTitle">
				<div class="noti-date">{{notification.payment_date | moment('l')}}</div>
				<div class="noti-amount">$ {{notification.total_amount}}</div>
				<div > {{notification.payment_method}}</div>
				</div>
				</div>
				
				<div class="notifications-sub">
				<div class="noti-state">Estado:  <label class="btn " :class="notification.status" style="cursor: pointer;"> {{notification.status}} </label></div>
				<div class="noti-space"></div>
				<div class="noti-detalle"><h1 class="subTitle" style="margin-top: 18px !important;">Detalles </h1>  </div>
			

			</div>
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
	methods:
	{
		loadAmenities: async function()
		{
			try
			{
				this.isLoading = true;
				this.paymentNotifications = await this.getPaymentNotifications();
				this.isLoading = false;
			}
			catch(err)
			{
				this.imgNo = true;
				this.isLoading = false;
			}
		},
		showPayment (id){
			this.$router.push({ name: 'detalle-pago', params: { id: id } });
		}
	},
	filters:
	{
		excerpt: function(text)
		{
			return text.substr(0, 250) + '...';
		}
	},
	computed:
	{
        services_association()
        {
            return this.$store.getters.servicesAssociation;
        }
	},
	created: function()
	{
		this.loadAmenities();
	},
	watch:
	{

		services_association: async function(val)
		{
			this.loadAmenities();
		}

	},
	data: function()
	{
		return {
			paymentNotifications: [],
			isLoading: true,
			imgNo: false
		}
	}

}
</script>