<template>

    <div class="page-account-view page-services-associations-payment-notification">

        <services-association-header
                :services_association="services_association"/>

        <section class="bar ">
            <div class="container">

            </div>
        </section>


        <form @submit="sendPaymentNotification" method="POST">

            <div class="container bar-payment">

                <div class="card border-none shadow mb-4 mt-4" v-if="!isEnabled">

                    <div class="notification-edit">

                        <h5 class="title">Notificar pago</h5>

                        <p class="text-table max-50">
                            Notifica tus pagos por depósito, transferencia o online.
                        </p>

                        <div class="alert-notifications">
                            <img alt="error" class="img_info" src="@/assets/img/error.svg"> Esta función se encuentra
                            deshabilitada por la institución
                        </div>

                    </div>

                </div>

                <div class="card border-none shadow mb-4 mt-4" v-if="isEnabled">
                    <div class="card-body">
                        <h5 class="title">Notificar Pago</h5>
                        <p class="sub_title payment-space-p"> Aquí podrás visualizar el monto del período a abonar y
                            comunicar si lo has realizado por depósito o o pago online.<br><br>
                            <strong>RECUERDA ADJUNTAR TU COMPROBANTE </strong></p>


                        <div class="alert alert-success" v-if="form.success"><img alt="exito"
                                                                                  class="img_info" src="@/assets/img/exito.svg"> La
                            notificación de pago se envio correctamente
                        </div>
                        <div class="alert alert-danger" v-if="form.error && !form.success"><img
                                alt="error" class="img_info" src="@/assets/img/error.svg"> {{form.error}}
                        </div>


                        <div class="form-group center">

                            <div class="form-check mb-2" v-for="bank_account in services_association.bank_accounts">

                                <input
                                        :id="'bank-account-'+bank_account.id"
                                        :value="bank_account.id"
                                        checked
                                        class="form-check-input"
                                        type="radio"
                                        v-model="input.bank_account">

                                <label :for="'bank-account-'+bank_account.id" class="form-check-label">
                                    <strong class="text-cbu">
                                        {{bank_account.bank_name}}
                                    </strong>
                                    <br>
                                    <span class="text-muted">
										N°: {{bank_account.account_number}}<br>
										CBU: {{bank_account.account_cbu}}<br>
										Alias: {{bank_account.account_alias}}
									</span>
                                </label>

                            </div>

                        </div>


                        <div class="form-group">
                            <div style="text-align: center;">
                                <table class="table table-payment-notification">
                                    <tr>
                                        <th>
                                            <input
                                                    checked
                                                    class="form-check-input"
                                                    id="1"
                                                    type="radio"
                                                    v-model="input.payment_method"
                                                    value="1"> Depósito
                                        </th>
                                        <th>
                                            <input
                                                    class="form-check-input"
                                                    id="2"
                                                    type="radio"
                                                    v-model="input.payment_method"
                                                    value="2"
                                            > Transferencia
                                        </th>
                                        <th>
                                            <input
                                                    class="form-check-input"
                                                    id="3"
                                                    type="radio"
                                                    v-model="input.payment_method"
                                                    value="3"
                                            > Online
                                        </th>
                                    </tr>
                                </table>
                            </div>
                        </div>


                        <div class="field a-field a-field_a1">
                            <img class="img_info show-date-one"
                                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM1JREFUeNpiZEAC5xwz+4GUARBfMNo/vZABD8CllgVNHUiBAwNxAKtaRqBNAkA6AYhBdDwQKwDxAyBeSMBAbGongAw8D7WNGuACExUNAwcDEwOVweA3EDnZgNLSBXLDDoj70Q0EJdAD5JgGTCkMuBI2Rg4A8uG2g3wBFLuAL0exEJEDBJD4AoRyFDYDL6DRH4D4ABIbmxqUrPcfynakIAxBrt0/NNLhqIHUzcv9wOj/QKY5AsgGfoAKUKOg/QAy0BGI65FtIdcwIG4ECDAA31JA22iN4gUAAAAASUVORK5CYII=">
                            <datepicker
                                    :disabled-dates="state.disabledDates"
                                    :format="customFormatter"
                                    :full-month-name=true
                                    :language="es"
                                    @input="showSettlements()"
                                    calendar-class="show-calendar"
                                    input-class="field__input a-field__input show-date-align-two"
                                    placeholder="Fecha de pago"
                                    required="required"
                                    v-model="input.payment_date"
                                    wrapper-class="show-calendar"
                            ></datepicker>
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
                                               disabled
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
                        <div style="margin: 2rem 0;">
                            <div v-if="is_capacitor">
                                <div class="row text-center news-image" v-if="photo">
                                    <div class="col-lg-3 col-md-4 col-xs-6">
                                        <a  data-lightbox="roadtrip" class="d-block mb-4 h-100">
                                            <img class="img-fluid img-thumbnail" :src="photo" alt="">
                                        </a>
                                    </div>
                                </div>

                                <div v-if="!hasPhoto">
                                    <a  href="javascript:;" class="btn btn-white value"
                                        @click="takePhoto"
                                        style="padding: 0"
                                    >
                                        <img :src="`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAA+ElEQVQ4jbVVwQ3DIAz0CB0hI3SE6yb5RDp+HSGbdBSekRJBR2CEjNA+Ci0EQquWWvIjsTnOZzAiFVtAGKizAceHq/MCorYmM43+YMDRQq32pG5Fh1oNOGr0hyrYjOFoQZcuprOg9p7FZgzHCtiLlQEvE9ht8yawM+AlZpuBTmD3BCslvCMAtSabW1DXwEJT6qDUIvLoZFRmX2IT4qWYAfsQX0DIUw/Q7ZVXA/QVuqC7WKir/8hK+hTQgKOX7CoJ3Sgh9kiS5H/Ij2UrAu4e6I1/DPgbw9YaNu9y83Pod2h3U0T+cJezhF+nTQraaB4Gazqxt/bNm3IH8ojwkP76AUUAAAAASUVORK5CYII=`" alt="" class="icon" style="vertical-align: top;">
                                        <span class="ml-2">TOMAR FOTO</span>
                                    </a>
                                </div>
                                <div v-else class="row text-center news-image">
                                    <div class="col-lg-3 col-md-4 col-xs-6">

                                        <a class="btn btn-white value"
                                           @click="removePhoto"
                                           style="padding: 0"
                                        >
                                            <img :src="`data:image/png;base64,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`" alt="" class="icon" style="vertical-align: top;">
                                            <span class="ml-2">QUITAR FOTO </span>
                                        </a>
                                    </div>
                                </div>

                            </div>

                        </div>


                        <div v-if="!hasPhoto && !photo">
                            <hr>
                            <p>Admite imágenes (jpg, png) y documentos (pdf) de hasta 10MB</p>

                            <div class="input-group">

                                <div class="custom-file">
                                    <input @change="onUploaderChange" aria-describedby="fileUploader" class="custom-file-input" id="fileUploader"
                                           ref="myFileInput" required="required" type="file">
                                    <label class="custom-file-label" for="fileUploader" id="info">Selecciona el
                                        archivo</label>
                                </div>
                            </div>
                            <br>
                        </div>

                        <div class="center" style="margin-bottom: 1rem;">


                            <a @click="showNumber();" class="btn btn-white value"
                               href="javascript:;"
                            >
                                <img alt=""
                                     class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAA+ElEQVQ4jbVVwQ3DIAz0CB0hI3SE6yb5RDp+HSGbdBSekRJBR2CEjNA+Ci0EQquWWvIjsTnOZzAiFVtAGKizAceHq/MCorYmM43+YMDRQq32pG5Fh1oNOGr0hyrYjOFoQZcuprOg9p7FZgzHCtiLlQEvE9ht8yawM+AlZpuBTmD3BCslvCMAtSabW1DXwEJT6qDUIvLoZFRmX2IT4qWYAfsQX0DIUw/Q7ZVXA/QVuqC7WKir/8hK+hTQgKOX7CoJ3Sgh9kiS5H/Ij2UrAu4e6I1/DPgbw9YaNu9y83Pod2h3U0T+cJezhF+nTQraaB4Gazqxt/bNm3IH8ojwkP76AUUAAAAASUVORK5CYII=" style="vertical-align: top;">
                                OTROS DATOS
                            </a>
                        </div>


                        <div v-if="uploadShowFile && !hasPhoto">
                            <hr>
                            <p>Admite imágenes (jpg, png) y documentos (pdf) de hasta 10MB</p>

                            <div class="input-group">

                                <div class="custom-file">
                                    <input @change="onUploaderChange" aria-describedby="fileUploader" class="custom-file-input"
                                           id="fileUploader" ref="myFileInput" type="file">
                                    <label class="custom-file-label" for="fileUploader" id="info">Selecciona el
                                        archivo</label>
                                </div>
                            </div>
                            <br>
                        </div>


                        <div v-if="uploadShowNumber">
                            <hr>
                            <div style="display: grid;">
                                <label class="field a-field a-field_a1" style="color: #272529;">
                                    N° de Comprobante
                                </label>
                                <label class="field a-field a-field_a1">
                                    <input class="field__input a-field__input" placeholder="Ingrese número"
                                           type="text" v-model="input.payment_number"
                                    />
                                </label>
                            </div>

                            <div style="display: grid;">
                                <label class="field a-field a-field_a1" style="color: #272529;">
                                    Aclaración
                                </label>
                                <label class="field a-field a-field_a1" style="color: #272529;">
   <textarea class="field__input a-field_left__input" cols="50" form="usrform" maxlength="150"
             name="comment" placeholder="Ingrese comentario" rows="4" v-model="input.payment_commentary">
</textarea>
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="actions_payments">
                            <button class="btn btn-primary btn-rounded" type="submit">Enviar notificación</button>


                        </div>

                    </div>
                </div>
            </div>

        </form>

    </div>


</template>

<script>

    import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
    import {Money} from 'v-money';
    import Datepicker from 'vuejs-datepicker';
    import {es} from 'vuejs-datepicker/dist/locale';
    import {Capacitor} from "@capacitor/core";
    import {Camera, CameraResultType} from "@capacitor/camera";

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
                es: es,
                uploadShowFile: false,
                uploadShowNumber: false,
                owner: '',
                total_amount: 0,
                hasPhoto: false,
                photo: false,
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
                },
                is_capacitor() {
                    if ((Capacitor.getPlatform() === 'ios') || (Capacitor.getPlatform() === 'android')) {
                        return true;
                    }
                    return false;
                },

            },

        methods:
            {
                async takePhoto() {
                    const hasPermission = await Camera.checkPermissions();
                    console.log(`hasPermission ${hasPermission.camera}`);
                    if (hasPermission.camera !== 'granted') {
                        await Camera.requestPermissions();
                    } else {
                        try {
                            const profilePicture = Camera.getPhoto({
                                quality: 90,
                                allowEditing: false,
                                resultType: CameraResultType.DataUrl,
                                source: 'CAMERA',
                            });

                            this.photo = (await profilePicture).dataUrl;
                            this.hasPhoto = true;
                            const base64ContentArray = this.photo.split(',');

                            const mimetype = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];

                            fetch(this.photo)
                                .then(res => res.blob())
                                .then(blob => {
                                    console.log('here is your binary: ', blob);
                                    this.fileToUpload = blob;
                                    this.hasPhoto = true;
                                });

                        } catch (error) {
                            console.error(error);
                        }
                        // image.webPath will contain a path that can be set as an image src.
                        // You can access the original file using image.path, which can be
                        // passed to the Filesystem API to read the raw data of the image,
                        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
                        //    const imageUrl = image.webPath;
                        // Can be set to the src of an image now
                        // imageElement.src = imageUrl;
                    }
                },

                removePhoto() {
                    this.hasPhoto = false;
                    this.photo = false;
                },

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
                setSettlements: async function (period, owner) {
                    try {
                        // Set settlements
                        this.settlements = await this.getSettlements(owner, period);
                        let total = 0;
                        let fu_ids = Object.keys(this.input.amounts);
                        let payment = false;
                        for (let i = 0; i < fu_ids.length; i++) {
                            //total+=this.settlements[i].amount;
                            //this.input.amounts[fu_ids[i]]=this.settlements[i].amount;
                            total += this.settlements[i].balance;
                            this.input.amounts[fu_ids[i]] = this.settlements[i].balance;
                            //this.input.amounts[fu_ids[i]]=0;
                            payment = payment || this.settlements[i].payments;
                        }
                        //this.total_amount = 0;
                        this.total_amount = total;

                        if (payment) {
                            this.$swal({
                                type: 'warning',
                                title: 'Tienes informado un pago de este período',
                                text: '¿Aún así quieres continuar?',
                                confirmButtonText: 'Entendido'
                            });

                        }
                    } catch (err) {
                        console.log(err);
                    }

                },
                showBill() {
                    if (this.uploadShowFile) {
                        this.uploadShowFile = false;
                    } else {
                        this.uploadShowFile = true;
                    }
                },
                showNumber() {
                    if (this.uploadShowNumber) {
                        this.uploadShowNumber = false;
                    } else {
                        this.uploadShowNumber = true;
                    }
                },
                onUploaderChange(e) {
                    this.fileToUpload = e.target.files[0];
                    if (['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].indexOf(this.fileToUpload.type) == -1) {
                        this.$swal({
                            type: 'error',
                            title: 'Ocurrió un error',
                            text: 'Recuerda cargar el tipo de archivo permitido!'
                        });

                        document.getElementById('info').innerHTML = 'Selecciona el archivo';
                        this.fileToUpload = {};
                        return;
                    } else {

                        var pdrs = this.fileToUpload.name;
                        this.typeFile = this.fileToUpload.type;
                        document.getElementById('info').innerHTML = pdrs;

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
                sendPaymentNotification(e) {

                    e.preventDefault();


                    if (this.input.payment_date == '') {
                        this.$swal({
                            type: 'error',
                            title: 'Ocurrió un error',
                            text: 'Debes ingresar la fecha del pago!'
                        });
                        return;
                    }

                    if (this.total_amount == 0) {
                        this.$swal({
                            type: 'error',
                            title: 'Ocurrió un error',
                            text: 'Debes ingresar el pago de al menos una unidad de servicio!'
                        });
                        return;
                    }


                    let paydate = new Date(this.input.payment_date);
                    paydate = paydate.toISOString();


                    let amounts = Object.keys(this.input.amounts)

                        .map(amount => {
                            return {
                                service_unit_id: amount,
                                amount: this.input.amounts[amount]
                            }
                        });

                    if (amounts.length == 0) {
                        this.form.error = 'Debes ingresar el pago de al menos una unidad de servicio';
                        return;
                    }

                    var payment_data =
                        {
                            bank_account_id: this.input.bank_account,
                            payment_method_id: this.input.payment_method,
                            date: paydate,
                            number: this.input.payment_number,
                            period: this.period,
                            commentary: this.input.payment_commentary,
                            amounts: amounts

                        };


                    this.notifyPayment(payment_data)
                        .then(res => {

                            if (this.fileToUpload && !this.photo) {
                                const reader = new FileReader();
                                reader.onload = (async (f) => {
                                    try {
                                        urlNew = await this.uploadPaymentNotifications(f.target.result, this.typeFile, res);
                                        this.fileToUpload = {};
                                        if (this.$refs.myFileInput !== 'undefined' && this.$refs.myFileInput.value !== '') {
                                            this.$refs.myFileInput.value = '';
                                        }
                                        if (this.photo) {
                                            this.removePhoto();
                                        }
                                    } catch (err) {

                                    }
                                });
                                if (['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].indexOf(this.fileToUpload.type) == -1) {
                                    this.$swal({
                                        type: 'success',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        confirmButtonText: 'Aceptar',
                                        title: 'Notificación Enviada',
                                        text: 'La notificación de pago se envio correctamente!'
                                    }).then((result) => {
                                            if (result.value) {
                                                this.$router.push(
                                                    {
                                                        name: 'facturas',
                                                        params:
                                                            {
                                                                success_message: 'La notificación de pago se envio correctamente!'
                                                            }
                                                    });

                                            }
                                        }
                                    );
                                    this.form.success = true
                                    return;
                                } else {
                                    reader.readAsArrayBuffer(this.fileToUpload);
                                }
                            } else if(this.fileToUpload && this.photo) {
                                this.$swal({
                                    type: 'success',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    confirmButtonText: 'Aceptar',
                                    title: 'Notificación Enviada',
                                    text: 'La notificación de pago se envio correctamente!'
                                }).then((result) => {
                                        if (result.value) {
                                            this.$router.push(
                                                {
                                                    name: 'facturas',
                                                    params:
                                                        {
                                                            success_message: 'La notificación de pago se envio correctamente!'
                                                        }
                                                });

                                        }
                                    }
                                );
                                this.photo = null;
                                this.fileToUpload = {};
                                this.form.success = true
                                return;

                            }
                            this.fileToUpload = {};
                            if (this.$refs.myFileInput !== 'undefined' && this.$refs.myFileInput.value !== '') {
                                this.$refs.myFileInput.value = '';
                            }
                            if (this.photo) {
                                this.removePhoto();
                            }
                            this.$swal({
                                type: 'success',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar',
                                title: 'Notificación Enviada',
                                text: 'La notificación de pago se envio correctamente!'
                            }).then((result) => {
                                    if (result.value) {
                                        this.$router.push(
                                            {
                                                name: 'facturas',
                                                params:
                                                    {
                                                        success_message: 'La notificación de pago se envio correctamente!'
                                                    }
                                            });

                                    }
                                }
                            );
                            this.form.success = true
                        })
                        .catch(res => {
                            console.log(res);

                            if (this.hideDate) {
                                this.$swal({
                                    type: 'error',
                                    title: 'Ocurrió un error',
                                    text: 'Debes ingresar el pago de al menos una unidad de servicio!'
                                });
                            }

                            if (this.input.payment_date == '') {
                                this.$swal({
                                    type: 'error',
                                    title: 'Ocurrió un error',
                                    text: 'Debes ingresar la fecha del pago!'
                                });
                            }


                            if (this.total_amount == 0) {
                                this.$swal({
                                    type: 'error',
                                    title: 'Ocurrió un error',
                                    text: 'Debes ingresar el pago de al menos una unidad de servicio!'
                                });
                            }
                            //this.form.error   = 'Ocurrió un error al enviar la notificación de pago, intente nuevamente mas tarde'
                        });
                }
            }
    }


</script>
