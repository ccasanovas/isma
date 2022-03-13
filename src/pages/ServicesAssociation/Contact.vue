<template>

	<div class="page-cooperatives-view">

		<header-back title=" VOLVER"  url="/" />
		
	



	<section class="bar theme-blue" >
			<div class="container" v-if="services_association.cooperative">
		<div class="bar-avatar">
					<span>
					 <img
								src="services_association.cooperative.logo_url"
								:srcset="services_association.cooperative.logo_url"
								 />
					</span>
				</div>
				<h3 class="bar-firm-name">
					{{services_association.cooperative.firm_name}}
				</h3>
				<h5 class="bar-tagline">
										{{services_association.cooperative.name}}
				</h5>
<br>
			</div>
			
		</section>


		

		<div class="container cooperative-details">
			<div class="card shadow mb-4 mt-4">
				<div class="card-body" v-if="services_association.cooperative">
					
					<p class="card-text">{{services_association.cooperative.biography}}</p>
					<table class="table">
						<tr>
							<th><img src="@/assets/img/icons/md-pin.svg" class="icon icon-lg icon-md-pin" alt=""></th>
							<td class="text-table">
								{{services_association.cooperative.address}},
								{{services_association.cooperative.city}} ({{services_association.cooperative.postal_code}}),
								 {{services_association.cooperative.province}}, Argentina
							</td>
						</tr>
						<tr v-if="services_association.cooperative.phone_number">
							<th><img src="@/assets/img/icons/md-call.svg" class="icon icon-lg icon-md-call" alt=""></th>
							<td class="text-table">{{services_association.cooperative.phone_number}}</td>
						</tr>
						<tr v-if="services_association.cooperative.email">
							<th><img src="@/assets/img/icons/md-mail.svg" class="icon icon-lg icon-md-mail" alt=""></th>
							<td class="text-table">{{services_association.cooperative.email}}</td>
						</tr>
						<tr v-if="services_association.cooperative.office_hours">
							<th><img src="@/assets/img/icons/md-time.svg" class="icon icon-lg icon-md-time" alt=""></th>
							<td class="text-table">{{services_association.cooperative.office_hours}}</td>
						</tr>
						<tr v-if="services_association.cooperative.website">
							<th><img src="@/assets/img/icons/md-globe.svg" class="icon icon-lg icon-md-globe" alt=""></th>
							<td class="text-table"><a :href="services_association.cooperative.website" target="_blank">{{services_association.cooperative.website}}</a></td>
						</tr>
					</table>
					
					<!--<router-link v-if="services_association.cooperative" :to="'/mensajes/cooperativa/'+services_association.cooperative.id" 
					class="btn btn-contact btn-rounded btn-primary btn-block">
						Enviar mensaje
					</router-link>-->
						
			
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
	filters:
	{
		to_avatar(string)
		{
			return string.substr(0,1)
		}
	},
	computed:
	{
		services_association()
		{
			return this.$store.getters.servicesAssociation;
		}
	}
}
</script>