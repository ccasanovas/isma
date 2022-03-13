<template>



		<header class="theader">
			<div class="container-fluid">

<section class="main home-new">
  
  
  <!-- <div class="action-first"></div> -->


  <div class="title text-center" v-if="isHeaderLoading" id="header-loading-message">
						Cargando...
					</div>


<div 
    class="siwca-header-coop" v-else>


  <span>
     <img
								src="services_association.cooperative.logo_url"
								:srcset="services_association.cooperative.logo_url"
								class="avatar_coope" />
								
</span> 

<div class="title">
<h1 class="services-associations-name">{{services_association.cooperative.firm_name | truncate(28)}}</h1>
<h3 class="services-associations-address"><span class="services-associations-address-street">{{services_association.cooperative.name | truncate(28)}}</span>
</h3>
</div> 


<div>
</div>


</div> 

<!-- <div class="action-second"></div> -->


<div class="home-new-service">

 <div style="margin-left: auto; padding: 0.5rem;width:220px;margin-top: 15px;">
<div style="float:left;margin: 12px;">

								<img :src="getAvatar(services_association.avatar)" style="width:36px;height:36px;"/>


</div>

<div style="float: right;">
<h4 style="margin-bottom: 3px;">{{services_association.name}}</h4>
<span class="services-associations-city">Teléfono: {{services_association.phone}}</span>
</div>

<div>
 <nav v-if="services_association.id" class="theader__nav sub-menu-new">
      <ul class="theader__navbar">
        <li class="theader__item">
            <transition name="slide-fade">
              <!-- Header Navigation Menu Icons -->
              <button class="theader--button" v-if="show" key="on" @click="show = false">
                <svg viewBox="0 0 24 24" class="theader--icon">
                  <title>Close</title>
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
              </button>
              <button class="theader--button" v-else key="off" @click="show = true">
                <svg viewBox="0 0 24 24" class="theader--icon">
                  <title>Menu</title>
                  <path fill="currentColor" d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
                </svg>
              </button>
            </transition>
          <!-- Dropdown Menu -->
          <transition name="dropdown">
            <div class="dropdown__menu" v-bind:class="{ active: show }" v-if="show">
              <ul class="dropdown__menu-nav">
	<li class="dropdown__menu-item">
					<router-link class="dropdown__menu-link" :to="{ name: 'inicio', params: { services_association_id: services_association.id } }">
					<div class="dropdown__menu-text">Inicio</div>
					</router-link>
				</li>

				<li class="dropdown__menu-item">
					<!-- Notificar pago es una sub-sección de facturas -->
					<router-link class="dropdown__menu-link" :to="{ name: 'facturas', params: { services_association_id: services_association.id } }" :class="{'active router-link-active': $route.name == 'notificar-pago'}">
						<div class="dropdown__menu-text">Mis Facturas</div>
					</router-link>
				</li>

				<li class="dropdown__menu-item">
					<router-link class="dropdown__menu-link" :to="{ name: 'noticias', params: { services_association_id: services_association.id } }">
					<div class="dropdown__menu-text">Noticias</div>
					</router-link>
				</li>


				<li class="dropdown__menu-item">
					<router-link class="dropdown__menu-link" :to="{ name: 'documentos', params: { services_association_id: services_association.id } }">
					<div class="dropdown__menu-text">Documentos</div>
					</router-link>
				</li>



<li class="dropdown__menu-item">
					<router-link class="dropdown__menu-link" :to="{ name: 'listado-amenities', params: { services_association_id: services_association.id } }">
					<div class="dropdown__menu-text">Amenities</div>
					</router-link>
				</li>


<li class="dropdown__menu-item">
					<router-link class="dropdown__menu-link" :to="{ name: 'listado-sugerencias', params: { services_association_id: services_association.id } }">
					<div class="dropdown__menu-text">Sugerencias</div>
					</router-link>
				</li>




<li class="dropdown__menu-item">
					<router-link class="dropdown__menu-link" :to="{ name: 'contacto', params:{ services_association_id: services_association.id } }">
						<div class="dropdown__menu-text">Contacto</div>
					</router-link>
						</li>
              </ul>
            </div>
          </transition>
        </li>
      </ul>
    </nav>
</div>


</div>
</div>
</section>

		
			</div>
		
			<services-association-nav />
		</header>
</template>

<script>

import ServicesAssociationNav from '@/components/ServicesAssociationNav';



export default {
		data: function()
		{
			return {
				isSending: false,
				show: false,
				avatar:'AGUA.svg'
			}
		},
	components:
	{
		ServicesAssociationNav
	},
	props: ['services_association'],
	computed:
	{
		isHeaderLoading()
		{
			return !this.services_association || !this.services_association.name;
		}
	},
	methods:
	{
		getAvatar (iconName) {
        const icons = require.context('../assets/img/avatars/', false, /\.svg$/)
        return iconName ? icons(`./${iconName}`) : ''
    },

		getAvatar12(avatar)
		{
			return require(`@/assets/img/avatars/${avatar}`);
		}
	}
}
</script>
