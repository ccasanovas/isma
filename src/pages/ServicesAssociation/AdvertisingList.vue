<template>

    <div class="amenities-page-wrapper">


        <services-association-header
                :services_association="services_association"
        />
        <div class="container">
            <p class="section-header">Sugerencias</p>
        </div>



        <div class="container">
            <p class="section-header"></p>
        </div>

        <div class="page-content container">
            <vue-element-loading :active="isLoading" background-color="rgba(255, 255, 255, .0)" spinner="spinner" color="#CE4169" />
            <br>

            <div class="empty-state empty-state-amenities" v-if="!isLoading && !advertisings.length">
                <div class="wrapper">
                    <h4>¡Aún no hay sugerencias!</h4>
                    <p>No se han encontrado sugerencias disponibles.</p>
                    <img src="@/assets/img/empty-states/no_sugerencia.png" class="image-empty" alt="">
                </div>
            </div>

            <dropdown-selector
                    @selected="loadAdvertisingsByCategory"
                    :options="categories"
                    :default="category"
            />

            <div class="center-three">
                <div class="amenity" v-for="advertising in selectedAdvertisings">


                    <div class="card">
                        <img class="card-img-top" :src="advertising.image.url.replace('thumb/xs/', '')">
                        <div class="card-body">

                            <div class="card-title">
                                <div class="amenity-title-wrapper">
                                   <h5 class="amenity-title">{{advertising.title }}</h5>
                                  <p class="amenity-subtitle">
                                        {{advertising.category}} &mdash;
                                        <span>
									</span>
                                    </p>
                                </div>
                            </div>
                            <p class="card-text" v-if="advertising.description != 'undefined'">{{ advertising.description | truncate(120) }}</p>



                            <div class="card-actions">
                                <router-link
                                        class="btn btn-rounded btn-default btn_amenity" style="visibility: hidden"
                                        :to="{ name: 'sugerencias', params: { services_association_id: service_association_id, advertising_id: advertising.id } }">
                                    Detalles
                                </router-link>
                                <router-link
                                        class="btn btn-rounded btn-outline-primary"
                                        :to="{ name: 'sugerencias', params: { services_association_id: service_association_id, advertising_id: advertising.id } }"
                                    >
                                    Ver detalles
                                </router-link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import HeaderBack from '@/components/HeaderBack';
    import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
    import DropdownSelector 	   from '@/components/DropdownSelector';

    export default {
        components:
            {
                HeaderBack,
                ServicesAssociationHeader,
                DropdownSelector
            },
        methods:
            {
                loadAdvertisingsByCategory: async function(category)
                {
                    if(!this.services_association.id)
                    {
                        return;
                    }

                    try
                    {
                        this.isLoading = true;
                        this.selectedAdvertisings =  this.advertisings.filter(function( obj ) {
                            return obj.category === category.name;
                        });
                        this.service_association_id = this.services_association.id;
                        this.isLoading = false;
                    }
                    catch(err)
                    {
                        this.isLoading = false;
                    }

                },

                removeDuplicates:     function(arr, key) {
                    return [...new Map(arr.map(item => [item[key], item])).values()]
                },
                loadAdvertisings: async function()
                {

                    if(!this.services_association.id)
                    {
                        return;
                    }

                    try
                    {
                        this.isLoading = true;
                        this.advertisings = await this.getAdvertisingViews(this.services_association.id);
                        this.service_association_id = this.services_association.id;
                        var object =[];
                        await this.advertisings.forEach(function(advertising) {
                            if (object.includes(advertising.category)) {
                            } else {
                                object.push({name: advertising.category});
                            }
                        });
                        //console.log(this.removeDuplicates(object, 'name'));
                        this.categories = this.removeDuplicates(object, 'name');
                        this.category = this.categories[0];
                        this.selectedAdvertisings = this.advertisings;
                       // console.log(this.category);
                        this.isLoading = false;
                    }
                    catch(err)
                    {
                        this.isLoading = false;
                    }
                },

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
            this.loadAdvertisings();
        },
        watch:
            {

                services_association: async function(val)
                {
                    this.category  = this.categories[0];
                    this.loadAdvertisings();
                },


            },
        data: function()
        {
            return {
                selectedAdvertisings: [],
                advertisings: [],
                isLoading: true,
                service_association_id: '',
                categories: [],
                category: '',
            }
        }

    }
</script>
