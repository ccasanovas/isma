<template>
    <div>
        <services-association-header
                :services_association="services_association"
        />
        <div class="page-services-associations-overview ">

            <section class="last-settlement">

                <div class="container">


                    <div class="home_card">

                        <vue-element-loading :active="!period_title" color="#CE4169" spinner="spinner"/>

                        <div id="divPadre">

                            <div class="featured">

                                <p class="section-header">

                                </p>

                            </div>

                            <div id="divHijo">

                                <br><br>
                            </div>

                            <section class="settlement-overview">

                                <div class="data">


                                    <div class="settlement-due-date" v-if="period.due_date">

                                        <div class="content_titulo" v-if="period_title">
                                            <div>
                                                <h3>Período</h3>
                                                <h2>{{period_title }}</h2>
                                                <h5>Última liquidación <br>de su cuenta</h5>
                                            </div>

                                        </div>
                                        <div class="coop_home">
                                            <h3>Estado</h3>
                                            <h1 class="settlement-payment-nopago" v-if="period.balance">IMPAGO</h1>
                                            <h1 class="settlement-payment-pago" v-else>PAGADO</h1>


                                        </div>
                                    </div>


                                    <div class="settlement-amount">

                                        <div>
                                            <svg height="12.033mm" version="1.1" viewBox="0 0 44.06 12.033"
                                                 width="44.06mm" xmlns="http://www.w3.org/2000/svg">
                                                <g transform="translate(-80.024 -120.14)">
                                                    <rect fill="#fff" height="12.033" ry="6.0166" width="44.06"
                                                          x="80.024" y="120.14"/>
                                                    <text fill="#000000" font-family="sans-serif" font-size="2.9989px"
                                                          letter-spacing=".18743px" stroke-width=".18743"
                                                          style="line-height:1.25" word-spacing="0px"
                                                          x="91.380135" xml:space="preserve"
                                                          y="127.39091"><tspan font-family="Montserrat" font-weight="500" stroke-width=".18743" x="91.380135" y="127.39091">VENCIMIENTO</tspan></text>
                                                    <path d="m23.256 10.506c-0.68033 0-1.2012 0.52082-1.2012 1.2012v1.1191l1.6016 0.40039v1.4004c-0.28018 0.040063-0.56065 0.12009-0.80078 0.16016-0.040063-0.60023-0.5609-1.0801-1.2012-1.0801h-7.6016c-0.68032 0-1.2012 0.52086-1.2012 1.2012v5.2012c0 0.68032 0.52085 1.2012 1.2012 1.2012h2.5996l1.4004 1.8789 1.4004-1.8789h2.2012c0.68013 0 1.2012-0.52086 1.2012-1.2012v-4.4824c4.8817-1.3204 9.9235 1.6006 11.244 6.4824 1.3204 4.8819-1.6006 9.9235-6.4824 11.244-4.8818 1.3204-9.9235-1.6006-11.244-6.4824-0.40015-1.5205-0.4011-3.1211-0.041016-4.6816l-0.75976-0.19922c-1.4005 5.3619 1.8403 10.805 7.1621 12.205 5.322 1.4005 10.805-1.842 12.205-7.1641 1.0004-3.8014-0.3202-7.8024-3.3613-10.283l0.88086-0.88086 0.51953 0.52148 0.56055-0.56055-1.6016-1.6016-0.55859 0.56055 0.51953 0.51953-0.96094 0.96094c-1.2004-0.84034-2.5997-1.4005-4.0801-1.6406v-1.4004l1.5996-0.40039v-1.1191c0-0.68035-0.52104-1.2012-1.2012-1.2012h-4zm0 0.80078h4c0.24011 0 0.40039 0.16009 0.40039 0.40039v0.47852l-1.2402 0.32031h-2.3203l-1.2402-0.32031v-0.47852c0-0.24 0.16027-0.40039 0.40039-0.40039zm1.1992 2h1.6016v1.2402c-0.28018-0.040063-0.5208-0.039063-0.80078-0.039063-0.28018 0-0.5208-1e-3 -0.80078 0.039063v-1.2402zm-10.402 1.2012h7.6016c0.24011 0 0.40039 0.16013 0.40039 0.40039v5.2012c0 0.24-0.16027 0.40039-0.40039 0.40039h-2.6016l-1 1.3203-1-1.3203h-3c-0.24011 0-0.40039-0.16013-0.40039-0.40039v-5.2012c0-0.24 0.16027-0.40039 0.40039-0.40039zm0.79883 0.79883v2.8027h0.80078v-2.8027h-0.80078zm2.002 0.80078v0.80078h4v-0.80078h-4zm8.002 0v2.002h0.80078v-1.2012c1.2405 0.080126 2.4811 0.43983 3.5215 1.0801l-0.60156 0.60156 0.56055 0.55859 0.7207-0.7207c1.7606 1.3607 2.8808 3.4017 2.9609 5.6426h-1.2012v0.80078h1.1621c-0.079899 1.7207-0.76149 3.4011-1.9219 4.6816l-0.95898-0.96094-0.56055 0.56055 0.95898 0.96094c-1.2805 1.1604-2.9611 1.84-4.6816 1.9199v-1.1191h-0.79883v1.1992c-1.6406-0.080315-3.2019-0.6795-4.4824-1.7598l0.75977-0.76172-0.56055-0.55859-0.75976 0.75977c-1.2803-1.3206-2.0402-3.0421-2.1602-4.8828h1.5996v-0.79883h-2.3594v0.40039c0 4.6417 3.7606 8.4023 8.4023 8.4023 4.6417 0 8.4023-3.7606 8.4023-8.4023 0-2.8411-1.439-5.5233-3.8398-7.084l-0.041015-0.039062c-1.3605-0.80028-2.9209-1.2812-4.5215-1.2812h-0.40039zm-8.002 1.6016v0.79883h4v-0.79883h-4zm-2.002 1.1992v0.80078h0.80078v-0.80078h-0.80078zm10.045 5.082-3.2422 2.3203v2.2012h2.2402l1.8418-3.6816-0.83984-0.83984zm-0.20117 1.1211-1.2793 2.6016h-0.96094v-1.002l2.2402-1.5996z"
                                                          fill="#9f5243"
                                                          stroke-width=".050018" transform="matrix(.26458 0 0 .26458 80.024 120.14)"/>
                                                </g>
                                            </svg>
                                            <h2 style="margin-top: 10px;">{{ period.due_date | moment('DD/MM/YY')
                                                }}</h2>
                                        </div>
                                        <div>


 <div v-if="is_capacitor">
       <form id="form_mp" method="post" class="form_mp" target="_blank" v-on:submit.prevent="reloadPage()"  ref="mp">

                                            </form>
</div>
<div v-else>
      <form id="form_mp" method="post" name="form_mp"  target="_blank" v-on:submit.prevent="reloadPage()" ref="mp">

                                            </form>
</div>


                                       

                                            <router-link :to="{ name: 'notificar-pago', params: { services_association_id: services_association.id } }"
                                                         class="reporte_new"
                                                         v-if="services_association.id">
                                                Notificar pago
                                            </router-link>
                                            <router-link :to="{ name: 'facturas', params: { services_association_id: services_association.id } }"
                                                         class="reporte_new"
                                                         v-if="services_association.id">
                                                Detalle
                                            </router-link>


                                        </div>
                                    </div>
                                </div>


                                <div class="data_actions">
                                    <div class="secondary-actions" id="download">


                                        <vue-element-loading :active="isDownloadingDocuments" color="#CE4169"
                                                             spinner="spinner"/>

                                        <a @click="downloadPeriodDocuments('Boletin Mensual', $event);" class="btn btn-white value"
                                           href="javascript:;"
                                           id="settlement-expenses-btn">
                                            <img
                                                    alt=""
                                                    class="icon"
                                                    src="@/assets/img/icons/documento-02.svg"
                                                    style="vertical-align: top;"/> Boletín
                                        </a>

                                        <a @click="downloadPeriodDocuments('Avisos de pago', $event);" class="btn btn-white value"
                                           href="javascript:;"
                                           id="payment-notice-btn">
                                            <img
                                                    alt=""
                                                    class="icon"
                                                    src="@/assets/img/icons/documento-02.svg"
                                                    style="vertical-align: top;"/> Factura
                                        </a>

                                    </div>


                                    <div class="actions" v-if="services_association.id">

                                    </div>
                                </div>

                            </section>

                        </div>
                    </div>

                </div>

                <div class="ads_img"
                     style="background: #f4f4f4;position: absolute;width: 240px;display: ;height: 451px;z-index: 999;/*! right: ; *//*! float: right; */right: 12px;top: 1px;background: url() center center no repeat;border-radius: 6px;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
                    <img alt="ads" src="@/assets/img/ads/ads2.jpeg"
                         style="/*! background: red; *//*! position: relative; *//*! width: 200px; *//*! display: ; */">
                </div>

            </section>

            <div id="example" v-if="slides">
                <!-- <section class="news-see-more actions text-center">
                    <router-link :to="{ name: 'listado-publicidades', params: { services_association_id: services_association.id } }"
                                 v-if="slides">
                        Ver todas las publicidades
                    </router-link>
                </section>-->

                <carousel-3d :autoplay="true" :autoplay-timeout="5000" :count="slides.length" :display="3" :perspective="0"
                             :space="400" ref="mycarousel">

                    <slide :index="i" v-bind:key="slide.id" v-for="(slide, i) in slides">
                        <router-link :to="{ name: 'sugerencias', params: { services_association_id: services_association.id , advertising_id: slide.id } }">
                        <figure>
                            <img v-bind:src="slide.image.url"/>
                        </figure>
                        </router-link>

                    </slide>
                </carousel-3d>
            </div>


            <!--<news :news="news" />

            <section class="news-see-more actions text-center" v-if="news.length">
                <router-link :to="{ name: 'noticias', params: { services_association_id: services_association.id } }" class="btn btn-rounded btn-outline-primary">Más noticias</router-link>
            </section>-->
            <p-d-fview v-if="pdf" :url="pdf" :title="title" :localuri="localuri"></p-d-fview>

        </div>

    </div>

</template>
<script>

    import News from '@/components/News';
    import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
    import PDFview from '@/components/PDFView';

    import utils from '@/mixins/utils';
    import {Carousel3d, Slide} from 'vue-carousel-3d';
    import {Capacitor} from '@capacitor/core';
    import {Directory, Filesystem} from "@capacitor/filesystem";
    import axios from "axios";
    import {Dialog} from "@capacitor/dialog";
    import {InAppBrowser} from "@ionic-native/in-app-browser";
    export default {


        components:
            {
                News, ServicesAssociationHeader, Carousel3d, Slide, PDFview
            },
        mixins:
            [
                utils
            ],
        filters:
            {
                to_avatar(string) {
                    return string.substr(0, 1);
                }
            },
        methods:
            {

                getAds: async function () {
                    this.slides = await this.getAdvertisingHome(this.services_association.id);
                },

                goToSlide(index) {
                    this.$refs.mycarousel.goSlide(index)
                },

                async whereAreyou() {
                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                        return true;
                    } else {
                        return false;
                    }
                },
                async writeAndPreviewPdf(base64Data, fileName) {
                    await Filesystem.mkdir({ path: 'joinup', directory: Directory.External }).then(async (createdDirectory) => {
                        await Filesystem.writeFile({
                            path: `joinup/${fileName.replace(' ', '-')}`,
                            data: Buffer.from(base64Data).toString('base64'),
                            directory: Directory.External,
                        }).then(async (writedFile) => {
                            this.localuri = writedFile.uri;
                            console.log(`local uri  ${writedFile.uri}`);
                        });
                    }).catch(async (error) => {
                        await Filesystem.writeFile({
                            path: `joinup/${fileName.replace(' ', '-')}`,
                            data: Buffer.from(base64Data).toString('base64'),
                            directory: Directory.External,
                        }).then(async (writedFile) => {
                            this.localuri = writedFile.uri;
                            console.log(`local uri  ${writedFile.uri}`);
                        });
                    });
                },
                async hasFilePermisions() {
                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                        const permissionsSet = await Filesystem.checkPermissions().then(async (result) => {
                            const permissions = await result.publicStorage;
                            if ((`${result.publicStorage}` === 'prompt') || (`${result.publicStorage}` === 'denied') || (`${result.publicStorage}` === 'prompt-with-rationale')) {
                                const havePermissions = await Filesystem.requestPermissions().then(async (publicStorage) => {
                                    const permissionsRequested = await publicStorage.publicStorage;
                                    console.log('prompt || denied || prompt-with-rationale');
                                    if (`${permissionsRequested}` === 'granted') {
                                        return true;
                                    }
                                    return false;
                                });
                                return havePermissions;
                            }
                            return true;
                        });
                        return permissionsSet;
                    }
                },
                async downloadFallback(url) {
                    this.loading = true;
                    this.pdf = null;
                    console.log(JSON.stringify(url));
                    // eslint-disable-next-line no-shadow

                    await this.hasFilePermisions().then(result => {
                        delete axios.defaults.headers.common["Authorization"];
                        delete axios.defaults.headers.common["Content-Type"];
                        delete axios.defaults.headers.common["Accept"];


                        axios.get(url, {
                            responseType: "arraybuffer"
                        }).then(async (success) => {
                            this.hasFilePermisions().then(async (resultData) => {
                                if (resultData) {
                                    const arrayUrl = url.split('/');
                                    const fileName = arrayUrl[arrayUrl.length - 1];
                                    const pdfData = await success.data;
                                    await this.writeAndPreviewPdf(pdfData, fileName.replace(' ', '-'));
                                    this.pdf = url;
                                    this.title = fileName;
                                } else {
                                    await Dialog.alert({
                                        title: 'Información',
                                        message: 'Denegaste los permisos de almacenamiento y esta operación no puede ser realizada',
                                    });
                                }
                            });

                        }).catch(error  => console.log(error));

                    });
                },

                downloadPeriodDocuments: async function (type = 'Avisos de pago', event) {

                    const documents = this.period.period_documents
                        .filter(
                            d => d.type == type
                        );

                    if (!documents.length) {
                        return;
                    }

                    this.isDownloadingDocuments = true;

                    if (documents.length == 1) {

                        this.isDownloadingDocuments = false;
                        const device = Capacitor.getPlatform();
                        console.log("Capacitor platform is: " + device);
                            if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                                this.downloadFallback(documents[0].url);
                            } else {
                                window.open(documents[0].url, '_blank');
                                //window.location.href = documents[0].url;
                            }

                        return;

                    }

                    try {

                        const inputDocs = documents.map(d => d.url);
                       // console.log('por mergear');
                        const mergeResult = await this.mergeDocuments(inputDocs);
                        //console.log('mergeado');

                        this.isDownloadingDocuments = false;
                       // console.log(mergeResult.url);
                        //console.log('false downloading');

                        if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                            this.downloadFallback(mergeResult.url);
                            } else {
                                window.location.href = mergeResult.url;
                            }


                    } catch (err) {
                        this.isDownloadingDocuments = false;
                        console.log(err);
                    }

                },
                setSettlements: async function (period, owner) {
                    try {
                        // Set settlements
                        this.settlements = await this.getSettlements(owner, period);
                        let payment = false;
                        let amounts1 = {};
                        let services = '';
                        this.settlements.forEach(function (elemento, indice) {
                            //console.log("pos=", indice, "valor=", elemento.id);
                            amounts1[elemento.service_unit.id] = elemento.balance;
                            payment = payment || elemento.payments;
                            services = services + '|' + elemento.service_unit.id;
                        });
                        this.servicesTran = services;
                        this.amounts = Object.keys(amounts1)
                            .map(amount => {
                                return {
                                    service_unit_id: amount,
                                    amount: amounts1[amount]
                                }
                            });

                          var datosUser = await this.retrieveUserShowData();
                        
                        this.tokenUser = datosUser.idToken.jwtToken;
                        this.emailUser = datosUser.idToken.payload.email;
                        this.refreshToken = datosUser.refreshToken.token;  


                        /*	if(payment){
                                this.$swal({
                  type: 'warning',
                  title: 'Recuerda que tienes informado un pago de este período',
                  text: 'Espera la acreditación',
                  confirmButtonText: 'Entendido'
                });
                            }	*/

                    } catch (err) {
                        console.log(err);
                    }

                },

                reloadPage() {

                    if (this.pagado == 1) {

                        this.$swal({
                            type: 'info',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Entendido',
                            title: 'Período en cero',
                            text: 'Tu última liquidación se encuentra pagada.'
                        }).then((result) => {
                                if (result.value) {

                                    //document.getElementById('form_mp').submit();
                                    //window.location.reload();

                                }
                            }
                        );


                    } else {
//si no esta pago
                        this.$swal({
                            type: 'info',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Entendido',
                            showConfirmButton: false,
                            showCancelButton: true,
                            cancelButtonText: `Cerrar`,
                            title: 'Fecha de vencimiento de las Cuotas Día 15 de cada mes',
                            text: 'Los pagos pueden realizarse en caja con factura, depósito en efectivo o transferencia bancaria en Banco ICBC.'
                        }).then(async (result) => {

                            // Request permission to use push notifications
                            // iOS will prompt user and return if they granted permission or not
                            // Android and web will just grant without prompting
                            if (result.value) {

                                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {

                                        document.getElementById("form_mp").addEventListener("submit", async function(e) {

                                            e.preventDefault(); // Prevents form from submitting

                                           // console.log( this.getAttribute("action") );
                                           // console.log( this.action );
                                            const browser = await InAppBrowser.create(this.action, '_blank', 'hidden=no,location=yes,clearsessioncache=yes,clearcache=yes,fullscreen=yes');
                                            browser.on('loadstart').subscribe((e) => {
                                                console.log(e.url);
                                                if (e.url.includes('cancel')) {
                                                    browser.close();
                                                }
                                                if (e.url.includes('success')) {
                                                    browser.close();
                                                }

                                            });

                                            // this.submit();  // Submit afterwards or use AJAX to construct your request

                                        });
                                        document.querySelector('.mercadopago-button').click();

                                        /*
                                        const url = document.getElementsByName('form_mp').action;
                                        console.log(url);

                                        console.log(success.data);
                                            console.log(JSON.stringify(success));
                                            const browser = InAppBrowser.create(url, '_blank', 'hidden=no,location=yes,clearsessioncache=yes,clearcache=yes');
                                            browser.on('loadstart').subscribe((e) => {
                                                console.log(e.url);
                                                if (e.url.includes('iprmardelplata')) {
                                                    browser.close();
                                                }
                                            });

                                        //
                                        */

                                        this.loading = false;
                                    } else {
                                        //console.log('entro aca');
                                        document.getElementById('form_mp').submit();
                                        window.location.reload();
                                    }

                                } else if(result.dismiss == 'cancel'){
           // window.location.reload();
        }
                            }
                        );


                    }


                },
                getPeriodInfo: async function (period_id) {
                    this.getSettlementsSummary(this.services_association.id, period_id)
                        .then(data => {
                            this.period = data;
                            this.period_title = this.services_association.periods.filter(p => p.id == data.period_id)[0].title;

                            /*console.log('soy gettments');

                                        let amounts1 = {};
                                        let services = '';
                                        this.settlements.forEach(function(elemento, indice) {
                                            //console.log("pos=", indice, "valor=", elemento.id);
                                            amounts1[elemento.service_unit.id]=elemento.balance;
                                            services = services + '|' + elemento.service_unit.id;
                                        });
                                        this.servicesTran = services;
                                        this.amounts = Object.keys(amounts1)
                                        .map(amount =>
                                        {
                                            return  {
                                                service_unit_id: amount,
                                                amount: 		    amounts1[amount]
                                            }
                                        });

                            console.log(this.settlements);*/

                            if ($('#mp_button').length) {

                            } else {
                                //this.$refs.mp.innerHTML = '';
                                while (this.$refs.mp.firstChild) {
                                    this.$refs.mp.removeChild(this.$refs.mp.firstChild);
                                }

                                if (data.balance == 0) {
                                    this.pagado = 1;
                                    var frm = document.getElementById('form_mp');
                                    var x = document.createElement("BUTTON");
                                    x.setAttribute("type", "submit");
                                    x.setAttribute("class", "mercadopago-button");
                                    x.innerHTML = 'PAGAR $ 0.00';
                                    this.$refs.mp.appendChild(x);

                                } else {

                                    if (this.servicesTran == '' || this.period_title == '') {
                                        this.setSettlements(this.services_association.periods[this.services_association.periods.length - 1].id, this.services_association.id);
                                        this.getPeriodInfo(data.period_id);
                                    }

                                    this.pagado = 2;
                                    var frm = document.getElementById('form_mp');
                                    //frm.action = '/servicios/'+this.services_association.id+'/facturas/procesar-pago';


                                    var valor = data.balance;
                                    valor = valor.toFixed(2);
                                    var nu = valor.toString()
                                    var montoFormat = nu.replace(/[$.]/g, '');//obtengo monto directo
                                    var pay_name = "PAGAR $" + valor;


                                    let montoTransaccion = montoFormat;


                                    /* var ret_ip;
                                     $.ajaxSetup({async: false});
                                     $.get('https://jsonip.com/', function(r){
                                       ret_ip = r.ip; //obtengo la ip
                                     });

                                    let montoTransaccion = montoFormat;
                                    let callbackSuccessParam = 'https://gestion.iprmardelplata.edu.ar/success.html';
                                    let callbackCancelParam = ' https://gestion.iprmardelplata.edu.ar/cancel.html';
                                    let secretKey = 'INSTENSENANZAGRALINSTITUTOPERALTARAMOS_23524630-9447-4102-9bc8-603bcb6c0650'; //secretkey provista por PP
                                    let sucursalComercioParam = 'bf5751c7-c570-4cb8-b9f3-95a75d7bb6d2'; //identificador comercio por PP
                                    let sucursal = '';*/


                                    let monto = window.btoa(montoTransaccion);
                                    /*let secret = window.btoa(secretKey);
                                    let su = window.btoa(callbackSuccessParam);
                                    let ca = window.btoa(callbackCancelParam);
                                    let ip = window.btoa(ret_ip);
                                    let comer = window.btoa(sucursalComercioParam);*/

                                    var hoy = new Date();
                                    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
                                    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                                    var trans = fecha + hora + '_' + this.services_association.id + 'SERVICES' + this.servicesTran;

                                    let trava = window.btoa(trans);

                                    let new_title = 'Periodo ' + this.period_title;


                                    let ret_title = window.btoa(new_title);

                                    let paydate = new Date();
                                    paydate = paydate.toISOString();

                                    var token = this.tokenUser;
                                    var email = this.emailUser;
                                    var refrescar = this.refreshToken;

                                    let period_test = this.services_association.periods[this.services_association.periods.length - 1].id;

                                    var payment_data_me =
                                        {
                                            bank_account_id: this.services_association.bank_accounts[0].id,
                                            payment_method_id: 3,
                                            date: paydate,
                                            number: trans,
                                            period: period_test,
                                            commentary: 'PAGO ONLINE SIWCA - MACRO CLICK',
                                            amounts: this.amounts
                                        };

                                    let todo = {
                                        user: token,
                                        emailUser: email,
                                        refrescarUser : refrescar,
                                        pay: payment_data_me
                                    };

                                    let ret_para = window.btoa(JSON.stringify(todo));

                                     let web = this.services_association.cooperative.website;
                                    web = web.replace("//", "//gestion.");

                                    frm.action = web + '/setDataPlus.php?ret_para=' + ret_para + '&ret_mo=' + monto + '&ret_tran=' + trava + '&ret_t=' + ret_title;

                                    /*  var pagoPlus;
                                     $.ajaxSetup({async: false});
                                     $.get('https://gestion.iprmardelplata.edu.ar/getDataPlus.php', {
                                         ret_ip:ip,
                                         ret_mo:monto,
                                         ret_set:secret,
                                         ret_su:su,
                                         ret_ca:ca,
                                         ret_co:comer,
                                         ret_para:ret_para

                                         }, function(data){
                                       pagoPlus = jQuery.parseJSON(data); //datos
                                     });


                                    var a = document.createElement("INPUT");a.setAttribute("type", "hidden");a.setAttribute("name", "CallbackSuccess");a.setAttribute("value",pagoPlus.ret_su);
                                    this.$refs.mp.appendChild(a);
                                    var b = document.createElement("INPUT");b.setAttribute("type", "hidden");b.setAttribute("name", "CallbackCancel");b.setAttribute("value",pagoPlus.ret_ca);
                                    this.$refs.mp.appendChild(b);
                                    var c = document.createElement("INPUT");c.setAttribute("type", "hidden");c.setAttribute("name", "SucursalComercio");c.setAttribute("value",pagoPlus.ret_suc);
                                    this.$refs.mp.appendChild(c);
                                    var d = document.createElement("INPUT");d.setAttribute("type", "hidden");d.setAttribute("name", "Comercio");d.setAttribute("value", sucursalComercioParam); //SUCURSAL
                                    this.$refs.mp.appendChild(d);
                                    var f = document.createElement("INPUT");f.setAttribute("type", "hidden");f.setAttribute("name", "Monto");f.setAttribute("value",pagoPlus.ret_mo); //MONTO ENCRIPTADO?
                                    this.$refs.mp.appendChild(f);
                                    var g = document.createElement("INPUT");g.setAttribute("type", "hidden");g.setAttribute("name", "Producto[0]");g.setAttribute("value", 'Período: ' + this.period_title);
                                    this.$refs.mp.appendChild(g);
                                    var h = document.createElement("INPUT");h.setAttribute("type", "hidden");h.setAttribute("name", "Informacion");h.setAttribute("value",pagoPlus.ret_para);
                                    this.$refs.mp.appendChild(h);

                                    var e = document.createElement("INPUT");e.setAttribute("type", "hidden");e.setAttribute("name", "Hash");e.setAttribute("value", pagoPlus.ret_ha);
                                    this.$refs.mp.appendChild(e);

                                    var g1 = document.createElement("INPUT");g1.setAttribute("type", "hidden");g1.setAttribute("name", "TransaccionComercioId");g1.setAttribute("value", trans);
                                    this.$refs.mp.appendChild(g1);*/

                                    var x = document.createElement("BUTTON");
                                    x.setAttribute("type", "submit");
                                    x.setAttribute("class", "mercadopago-button");
                                    x.innerHTML = pay_name;
                                    this.$refs.mp.appendChild(x);

                                }


                                /*let foo = document.createElement('script');
                                foo.setAttribute("src","https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js");
                                foo.setAttribute("data-public-key", this.services_association.cooperative.public_key);

                                foo.setAttribute("data-button-label", pay_name);
                                foo.setAttribute("id", "mp_button");
                                foo.setAttribute("data-transaction-amount", valor);
                                foo.setAttribute("data-elements-color", "#4e4f77");
                                foo.setAttribute("data-summary-product-label", "Servicio/s");
                                foo.setAttribute("data-summary-product", valor);
                                this.$refs.mp.appendChild(foo);*/
                            }


                        });
                }
            },
        computed:
            {
                services_association() {
                    return this.$store.getters.servicesAssociation;
                },
                isAvailable() {
                    return this.period.period_id;
                },
                async is_capacitor() {
                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                        return true;
                    }
                    return false;
                },

            },
        watch:
            {
                services_association(new_data) {
                    //this.setSettlements(new_data.periods[new_data.periods.length-1].id,new_data.id);
                    this.setSettlements(new_data.periods[new_data.periods.length - 1].id, new_data.id);
                    //this.getSettlements(new_data.periods[new_data.periods.length-1].id,new_data.id).then(data => this.settlements = data);
                    this.getPeriodInfo(new_data.periods[new_data.periods.length - 1].id);
                    //this.getNews(new_data.id).then(data => this.news = data);
                    this.getAds();
                }
            },
        created: async function () {

            if (this.services_association.periods) {

                try {
                    //const news = await this.getNews(this.services_association.id);
                    //this.news  = news;
                    //const settme = await this.getSettlements(this.services_association.periods[this.services_association.periods.length-1].id,this.services_association.id);
                    //this.settlements = settme;


                } catch (err) {
                    console.log(err);
                }
                this.setSettlements(this.services_association.periods[this.services_association.periods.length - 1].id, this.services_association.id);
                this.getPeriodInfo(this.services_association.periods[this.services_association.periods.length - 1].id);
                this.getAds();
                //this.setSettlements();

            }
        },
        data() {
            return {
                period: {},
                servicesTran: '',
                pagado: '',
                tokenUser: '',
                emailUser:'',
                refreshToken:'',
                settlements: [],
                isDownloadingDocuments: false,
                slides: [],
                period_title: '',
                rute: '',
                news: [],
                amounts: {},
                pdf: null,
                title: null,
                localuri: null,
            }
        },
        updated: function () {
            this.$refs.mycarousel.goSlide(this.$refs.mycarousel.currentIndex)
        }
    }
</script>
