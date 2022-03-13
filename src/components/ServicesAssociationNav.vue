<template>
	<div class="services-associations-nav">
 <div class="vertical-menu">

			<ul class="nav-vertical" v-if="services_association.id">
				<li class="nav-item nav-item-services-associations-overview vertical-links">
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'inicio', params: { services_association_id: services_association.id } }"><span>Inicio</span></router-link>
				</li>
				<li class="nav-item nav-item-services-associations-settlements vertical-links">
					<!-- Notificar pago es una sub-sección de facturas -->
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'facturas', params: { services_association_id: services_association.id } }" :class="{'active router-link-active': $route.name == 'notificar-pago'}">
						<span>Mis Facturas</span>
					</router-link>
				</li>
				<li class="nav-item nav-item-services-associations-news vertical-links">
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'noticias', params: { services_association_id: services_association.id } }"><span>Noticias</span></router-link>
				</li>
				<li class="nav-item nav-item-services-associations-documents vertical-links">
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'documentos', params: { services_association_id: services_association.id } }"><span>Documentos</span></router-link>
				</li>

					<li class="nav-item nav-item-services-associations-documents d-none d-md-block vertical-links">
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'listado-amenities', params: { services_association_id: services_association.id } }">
						<span>Amenities</span>
					</router-link>
				</li>
				
				
					<li class="nav-item nav-item-services-associations-documents d-none d-md-block vertical-links">
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'listado-sugerencias', params: { services_association_id: services_association.id } }">
						<span>Sugerencias</span>
					</router-link>
				</li>



<li class="nav-item nav-item-services-associations-documents d-none d-md-block vertical-links">
					<router-link class="nav-link vertical-nav-link" :to="{ name: 'contacto', params:{ services_association_id: services_association.id } }">
						<span>Contacto</span>
					</router-link>
						</li>


			</ul>
</div> 

	</div>
</template>

<script>
	export default {
		computed: {
			services_association()
			{
				return this.$store.getters.servicesAssociation;
			}
		}
	}
</script>