<template>

    <div class="page-account-view page-services-associations-payment-notification">

        <services-association-header
                :services_association="services_association"/>

        <section class="bar ">
            <div class="container">

            </div>
        </section>


        <form @submit="generatedPaymentNotification" method="POST">

            <div class="container bar-payment">

                <div class="card border-none shadow mb-4 mt-4" v-if="!isEnabled">

                    <div class="notification-edit">

                        <h5 class="title">Pago a cuenta</h5>

                        <p class="text-table max-50">
                            Pago a cuenta mediante pago online.
                        </p>

                        <div class="alert-notifications">
                            <img alt="error" class="img_info" src="@/assets/img/error.svg"> Esta función se encuentra
                            deshabilitada por la institución
                        </div>

                    </div>

                </div>

                <div class="card border-none shadow mb-4 mt-4" v-if="isEnabled">
                    <div class="card-body">

                        <h5 class="title">Pago a cuenta</h5>
                        <p class="sub_title payment-space-p"> Aquí podrás generar un botón de pago para realizar un pago
                            a cuenta.<br>
                            <br>
                            Ingresa el monto que quieras abonar para continuar y oprime Generar.
                        </p>


                        <div class="alert alert-success" v-if="form.success"><img alt="exito"
                                                                                  class="img_info" src="@/assets/img/exito.svg"> El pago
                            a cuenta se genero correctamente
                        </div>
                        <div class="alert alert-danger" v-if="form.error && !form.success"><img
                                alt="error" class="img_info" src="@/assets/img/error.svg"> {{form.error}}
                        </div>


                        <table class="table table-payment-notification" style="background:#eef0f2;">
                            <tr>
                                <th class="functional-unit row-table-payment">Alumnos</th>
                                <th class="amount row-table-payment" style="text-align: right;padding-right: 2rem; ">
                                    Monto
                                </th>


                            <tr v-for="fu in services_association.service_units">

                                <td class="row-payment"><br> {{fu.location}}</td>
                                <td class="row-payment" style="float:right;">
                                    <label class="field a-field a-field_a1">
                                        <money @input="handleAmount"

                                               class="field__input a-field__input"
                                               style="margin-bottom: 0px;"
                                               v-bind="money"
                                               v-model="input.amounts[fu.id]"
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="total" scope="col">Total</td>
                                <td class="total_amount" scope="col" style="text-align: right;">{{ total_amount |
                                    currency}}
                                </td>
                            </tr>
                        </table>


                        <div>

                        </div>


                        <br>
                        <div class="actions_payments">
                            <button class="btn btn-primary btn-rounded" type="submit">Generar</button>

                        </div>

                    </div>
                </div>
            </div>

        </form>

        <div class="container" style="text-align: center;">
            <vue-element-loading :active="isLoadingSettlements" color="#CE4169" spinner="spinner"/>

           <div v-if="is_capacitor">
       <form id="form_mp" method="post" name="form_mp" target="_blank"   v-on:submit.prevent="reloadPage()" ref="mp">

                                            </form>
</div>
<div v-else>
      <form id="form_mp" method="post" name="form_mp"  target="_blank" v-on:submit.prevent="reloadPage()" ref="mp">

                                            </form>
</div>
        </div>


    </div>


</template>

<script>

    import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
    import {Money} from 'v-money';
    import Datepicker from 'vuejs-datepicker';
    import {es} from 'vuejs-datepicker/dist/locale';
    import {Capacitor} from "@capacitor/core";
    import {InAppBrowser} from "@ionic-native/in-app-browser";

    export default {
        components:
            {
                ServicesAssociationHeader,
                Money,
                Datepicker
            },
        data: function () {

            return {
                fileToUpload: {},
                settlements: [],
                period: '',
                typeFile: '',
                tokenUser: '',
                isLoadingSettlements: false,
                es: es,
                servicesTran: '',
                uploadShowFile: false,
                uploadShowNumber: false,
                owner: '',
                total_amount: 0,
                total_amountShow: 0,
                hideDate: false,
                typeInput: true,
                state: {},
                money: {
                    decimal: ',',
                    thousands: '.',
                    precision: 2,
                    masked: false
                },
                filters:
                    {
                        max_date: '',
                        min_date: '',
                        curr_date: ''
                    },
                input:
                    {
                        payment_date: '',
                        payment_method: '',
                        payment_number: '',
                        payment_commentary: '',
                        bank_account: '',
                        amounts: {},
                        amountsShow: {}
                    },
                form:
                    {
                        success: null,
                        error: null
                    },
                payment_methods: [],
                bank_accounts: []
            }
        },
        created: function () {

            this.filters.min_date = this.$moment().subtract(90, "days").format('Y-MM-DD');
            this.filters.max_date = this.$moment().format('Y-MM-DD');
            //this.input.payment_date = this.$moment().format('Y-MM-DD');
            this.state = {
                disabledDates: {
                    to: new Date(this.$moment().subtract(90, "days").format('Y-MM-DD')), // Disable all dates up to specific date
                    from: new Date(this.$moment().add(1, "days").format('Y-MM-DD'))
                }
            }

            if (!this.services_association.bank_accounts || this.services_association.bank_accounts.length == 0) {
                return;
            }

            this.getPaymentMethods().then(methods => {
                this.payment_methods = methods;
            });

            if (this.services_association.bank_accounts) {
                this.input.bank_account = this.services_association.bank_accounts[0].id;
                this.input.payment_method = 1;
            }

            if (this.services_association.periods) {
                this.period = this.services_association.periods[this.services_association.periods.length - 1].id;
                this.owner = this.services_association.id;
                this.setSettlements(this.period, this.owner);
            }

        },
        watch:
            {
                services_association(services_association) {
                    if (services_association.bank_accounts.length == 0) {
                        this.input.bank_account = null;
                        this.input.payment_method = null;
                        return;
                    }
                    this.input.bank_account = this.services_association.bank_accounts[0].id;
                    this.input.payment_method = 1;
                    if (this.services_association.periods) {
                        this.period = this.services_association.periods[this.services_association.periods.length - 1].id;
                        this.owner = this.services_association.id;
                        this.setSettlements(this.period, this.owner);
                    }
                }
            },
        computed:
            {
                async is_capacitor() {
                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                        return true;
                    }
                    return false;
                },

                isEnabled() {
                    return this.$store.getters.servicesAssociation.bank_accounts && this.$store.getters.servicesAssociation.bank_accounts.length > 0;
                },
                services_association() {
                    return this.$store.getters.servicesAssociation;
                },
                dateType() {
                    return this.hideDate ? 'date' : 'text'
                },
                dateIcon() {
                    return this.hideDate ? require('@/assets/img/calendario.png') : require('@/assets/img/calendario.png')
                },
                dateClassIcon() {
                    return this.hideDate ? 'show-date-two' : 'show-date-one'
                },
                dateClassDate() {
                    return this.hideDate ? 'show-date-align-one' : 'show-date-align-two'
                }
            },

        methods:
            {
                changeInput() {
                    this.typeInput = false;
                    this.hideDate = true;
                },
                customFormatter(date) {
                    return this.$moment(date).format('Y-MM-DD');
                },

                showSettlements() {
                    // Set settlements by date
                    let total = 0;
                    let fu_ids = Object.keys(this.input.amounts);
                    for (let i = 0; i < fu_ids.length; i++) {

                        if (this.$moment.utc(this.input.payment_date).format('Y-MM-DD') <= this.$moment.utc(this.settlements[i].first_due_date).format('Y-MM-DD')) {

                            if (parseFloat(this.settlements[i].balance) > 0) {
                                total += this.settlements[i].amount_on_first_due_date;
                                this.input.amounts[fu_ids[i]] = this.settlements[i].amount_on_first_due_date;
                            } else {
                                total += this.settlements[i].balance;
                                this.input.amounts[fu_ids[i]] = this.settlements[i].balance;
                            }

                        } else {
                            //total+=this.settlements[i].amount;
                            //this.input.amounts[fu_ids[i]]=this.settlements[i].amount;
                            total += this.settlements[i].balance;
                            this.input.amounts[fu_ids[i]] = this.settlements[i].balance;
                        }

                    }
                    this.total_amount = total;
                },
                whereAreyou(){
                if (typeof cordova != "undefined") {
                                  return true;
                                }  else {
                                       return false; 
                                    }
                },
                reloadPage() {
                    this.$swal({
                        type: 'info',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: 'Entendido',
                        title: 'Vas a ingresar en una plataforma de pagos externa',
                        text: 'Cuando finalizes la operación recibiras nuestra notificación.'
                    }).then((result) => {
                            if (result.value) {
                                if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {

                                    document.getElementById("form_mp").addEventListener("submit", async function(e) {

                                        e.preventDefault(); // Prevents form from submitting

                                        console.log( this.getAttribute("action") );
                                        console.log( this.action );
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


                            }
                        }
                    );

                },
                setSettlements: async function (period, owner) {
                    try {
                        // Set settlements
                        this.isLoadingSettlements = true;
                        this.settlements = await this.getSettlements(owner, period);
                        let total = 0;
                        let fu_ids = Object.keys(this.input.amounts);
                        let payment = false;
                        let services = '';
                        for (let i = 0; i < fu_ids.length; i++) {
                            //total+=this.settlements[i].amount;
                            //this.input.amounts[fu_ids[i]]=this.settlements[i].amount;
                            total += this.settlements[i].balance;
                            this.input.amounts[fu_ids[i]] = this.settlements[i].balance;
                            //this.input.amounts[fu_ids[i]]=0;
                            services = services + '|' + fu_ids[i];
                            payment = payment || this.settlements[i].payments;
                        }
                        //this.total_amount = 0;
                        this.servicesTran = services;
                        this.total_amount = total;
                        this.isLoadingSettlements = false;
                        this.tokenUser = await this.retrieveToken();
                        /*if(payment){
                            this.$swal({
              type: 'warning',
              title: 'Tienes informado un pago de este período',
              text: '¿Aún así quieres continuar?',
              confirmButtonText: 'Entendido'
            });

                        }	*/
                    } catch (err) {
                        console.log(err);
                    }

                },
                handleAmount(e) {

                    let total = 0;
                    let fu_ids = Object.keys(this.input.amounts);
                    for (let i = 0; i < fu_ids.length; i++) {

                        if (parseFloat(this.input.amounts[fu_ids[i]]) > 0) {
                            const n = parseFloat(this.input.amounts[fu_ids[i]]);
                            total += n;
                        } else {
                            this.input.amounts[fu_ids[i]] = 0;
                        }

                    }
                    this.total_amount = total;
                },
                generatedPaymentNotification(e) {

                    this.isLoadingSettlements = true;


                    e.preventDefault();

                    if (this.total_amount == 0) {
                        this.$swal({
                            type: 'error',
                            title: 'Ocurrió un error',
                            text: 'Debes ingresar el pago de al menos un alumno!'
                        });
                        return;
                    }


                    let amounts = Object.keys(this.input.amounts)

                        .map(amount => {
                            return {
                                service_unit_id: amount,
                                amount: this.input.amounts[amount]
                            }
                        });

                    if (amounts.length == 0) {
                        this.form.error = 'Debes ingresar el pago de al menos un alumno';
                        return;
                    }

                    this.$swal({
                        type: 'success',
                        title: 'Botón Generado',
                        text: 'Haga click en Pagar para continuar!'
                    });


                    while (this.$refs.mp.firstChild) {
                        this.$refs.mp.removeChild(this.$refs.mp.firstChild);
                    }

                    var frm = document.getElementById('form_mp');
                    //frm.action = '/servicios/'+this.services_association.id+'/facturas/procesar-pago';
                    frm.action = 'https://botonpp.asjservicios.com.ar';

                    var valor = this.total_amount;
                    valor = valor.toFixed(2);
                    var nu = valor.toString()
                    var montoFormat = nu.replace(/[$.]/g, '');//obtengo monto directo
                    var pay_name = "PAGAR $" + valor;

                   /* var ret_ip;
                    $.ajaxSetup({async: false});
                    $.get('https://jsonip.com/', function (r) {
                        ret_ip = r.ip; //obtengo la ip
                    });*/

                    let montoTransaccion = montoFormat;
                    /*let callbackSuccessParam = 'https://gestion.iprmardelplata.edu.ar/success.html';
                    let callbackCancelParam = ' https://gestion.iprmardelplata.edu.ar/cancel.html';
                    let secretKey = 'INSTENSENANZAGRALINSTITUTOPERALTARAMOS_23524630-9447-4102-9bc8-603bcb6c0650'; //secretkey provista por PP
                    let sucursalComercioParam = 'bf5751c7-c570-4cb8-b9f3-95a75d7bb6d2'; //identificador comercio por PP
                    let sucursal = '';*/

                    let monto = window.btoa(montoTransaccion);
                   /* let secret = window.btoa(secretKey);
                    let su = window.btoa(callbackSuccessParam);
                    let ca = window.btoa(callbackCancelParam);
                    let ip = window.btoa(ret_ip);
                    let comer = window.btoa(sucursalComercioParam);*/

                    var hoy = new Date();
                    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
                    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                    var trans = fecha + hora + '_' + this.services_association.id + 'SERVICES' + this.servicesTran;

                    let trava = window.btoa(trans);

                    let new_title = 'PAGO_A_CUENTA';
	

	let ret_title = window.btoa(new_title);

                    let paydate = new Date();
                    paydate = paydate.toISOString();

                    var token = this.tokenUser;

                    let period_test = 'PA';

                    var payment_data_me =
                        {
                            bank_account_id: this.services_association.bank_accounts[0].id,
                            payment_method_id: 3,
                            date: paydate,
                            number: trans,
                            period: period_test,
                            commentary: 'PAGO A CUENTA SIWCA - MACRO CLICK',
                            amounts: amounts
                        };

                    let todo = {
                        user: token,
                        pay: payment_data_me
                    };

                   // console.log(todo);

                    let ret_para = window.btoa(JSON.stringify(todo));

                    frm.action = 'https://gestion.iprmardelplata.edu.ar/setDataPlus.php?ret_para='+ret_para+'&ret_mo='+monto+'&ret_tran='+trava+'&ret_t='+ret_title; 

                  /*  var pagoPlus;
                    $.ajaxSetup({async: false});
                    $.get('https://gestion.iprmardelplata.edu.ar/getDataPlus.php', {
                        ret_ip: ip,
                        ret_mo: monto,
                        ret_set: secret,
                        ret_su: su,
                        ret_ca: ca,
                        ret_co: comer,
                        ret_para: ret_para

                    }, function (data) {
                        pagoPlus = jQuery.parseJSON(data); //datos
                    });


                    var a = document.createElement("INPUT");
                    a.setAttribute("type", "hidden");
                    a.setAttribute("name", "CallbackSuccess");
                    a.setAttribute("value", pagoPlus.ret_su);
                    this.$refs.mp.appendChild(a);
                    var b = document.createElement("INPUT");
                    b.setAttribute("type", "hidden");
                    b.setAttribute("name", "CallbackCancel");
                    b.setAttribute("value", pagoPlus.ret_ca);
                    this.$refs.mp.appendChild(b);
                    var c = document.createElement("INPUT");
                    c.setAttribute("type", "hidden");
                    c.setAttribute("name", "SucursalComercio");
                    c.setAttribute("value", pagoPlus.ret_suc);
                    this.$refs.mp.appendChild(c);
                    var d = document.createElement("INPUT");
                    d.setAttribute("type", "hidden");
                    d.setAttribute("name", "Comercio");
                    d.setAttribute("value", sucursalComercioParam); //SUCURSAL
                    this.$refs.mp.appendChild(d);
                    var f = document.createElement("INPUT");
                    f.setAttribute("type", "hidden");
                    f.setAttribute("name", "Monto");
                    f.setAttribute("value", pagoPlus.ret_mo); //MONTO ENCRIPTADO?
                    this.$refs.mp.appendChild(f);
                    var g = document.createElement("INPUT");
                    g.setAttribute("type", "hidden");
                    g.setAttribute("name", "Producto[0]");
                    g.setAttribute("value", 'PAGO A CUENTA');
                    this.$refs.mp.appendChild(g);
                    var h = document.createElement("INPUT");
                    h.setAttribute("type", "hidden");
                    h.setAttribute("name", "Informacion");
                    h.setAttribute("value", pagoPlus.ret_para);
                    this.$refs.mp.appendChild(h);

                    var e = document.createElement("INPUT");
                    e.setAttribute("type", "hidden");
                    e.setAttribute("name", "Hash");
                    e.setAttribute("value", pagoPlus.ret_ha);
                    this.$refs.mp.appendChild(e);

                    var g1 = document.createElement("INPUT");
                    g1.setAttribute("type", "hidden");
                    g1.setAttribute("name", "TransaccionComercioId");
                    g1.setAttribute("value", trans);
                    this.$refs.mp.appendChild(g1);*/

                    var x = document.createElement("BUTTON");
                    x.setAttribute("type", "submit");
                    x.setAttribute("class", "mercadopago-button");
                    x.innerHTML = pay_name;
                    this.$refs.mp.appendChild(x);

                    this.isLoadingSettlements = false;


                }
            }
    }


</script> 
