<template>

	<div class="page-account-view page-services-associations-payment-notification">

	<services-association-header
			:services_association="services_association"/>
	
	<section class="bar " >
			<div class="container">
	
			</div>
		</section>
	
	

			<div class="container bar-payment">


				<vue-element-loading :active="isLoading" spinner="spinner" color="#CE4169" />

				<div class="card border-none shadow mb-4 mt-4" v-if="!isEnabled">

					<div class="notification-edit">

						<h5 class="title">Mensaje de Pago</h5>

						<img src="@/assets/img/empty-states/no_pagos.png" alt="exito" class="img_info">
						<p class="text-table max-50">
							No se puedo procesar el pago, vuelve a intentarlo!
						</p>

						<div class="alert-notifications">
							<img src="@/assets/img/error.svg" alt="error" class="img_info"> Esta función se encuentra deshabilitada por la cooperativa
						</div>

					</div>

				</div>

				<div class="card border-none shadow mb-4 mt-4" v-if="isEnabled">



					<div class="card-body">
                        <h5 class="title">Mensaje de Pago</h5>
<div style="text-align: center;">
						<img src="@/assets/img/mensaje-pago_realizado.png" alt="exito" style="width: 250px;">
<h5 style="color: #40417f!important;/* font-weight: 500 !important; */font-family: Monserrat-Medium;font-size: 2rem;">Estado: {{pay_state}}</h5>
</div>
						
						<p class="sub_title payment-space-p"><br> Descripción del Monto Total del período abonado.<br><br>
						</p>
						
						

						<div v-if="form.success" class="alert alert-success"><img src="@/assets/img/exito.svg" alt="exito" class="img_info"> La notificación de pago se envio correctamente</div>
						<div v-if="form.error && !form.success" class="alert alert-danger"><img src="@/assets/img/error.svg" alt="error" class="img_info"> {{form.error}}</div>


						<table class="table table-payment-notification" style="background:#eef0f2;">
    <tr>
 		<th  class="functional-unit row-table-payment">Unidad de servicio</th>
		<th  class="amount row-table-payment" style="text-align: right;padding-right: 2rem; ">Monto</th>
  
				
				<tr v-for="fu in services_association.service_units">

									<td class="row-payment"> <br> {{fu.location}}</td>
									<td class="row-payment" style="float:right;">						
   <label class="field a-field a-field_a1" >
     <money  class="field__input a-field__input" 
												v-model="input.amounts[fu.id]"
												v-bind="money"
												style="margin-bottom: 0px;"
                                                disabled
	/>
  </label>
									</td>
								</tr>
								<tr>
									<td scope="col" class="total">Total</td>
									<td scope="col" class="total_amount" style="text-align: right;">{{ total_amount | currency}}</td>
								</tr>							
						</table>


						<div >
	
	</div>
						

<div>
<hr>



</div>
<br>
				
					</div>
				</div>
			</div>

	</div>


</template>

<script>

import ServicesAssociationHeader from '@/components/ServicesAssociationHeader';
import { Money } 			   from 'v-money';
import Datepicker from 'vuejs-datepicker';
import {es} from 'vuejs-datepicker/dist/locale';
import utils from '@/mixins/utils';


export default {
	components:
	{
		ServicesAssociationHeader,
		Money,
		Datepicker
	},
	mixins:
		[
			utils
		],
	data: function()
	{

		return {
            fileToUpload: {},
            user:{},
			settlements: [],
			period: '',
			typeFile:'',
			es: es,
			uploadShowFile:false,
			uploadShowNumber:false,
			owner: '',
			pay_state:'RECHAZADO',
			total_amount: 0,
			total_amountShow:0,
			hideDate: false,
			typeInput: true,
			state : {},
			payment_data_me:{},
			isLoading: true,
			money: {
				decimal: ',',
				thousands: '.',
				precision: 2,
				masked: false
			},
			filters:
			{
				max_date:  '',
				min_date:  '',
				curr_date: ''
			},
			input:
			{
				payment_date:   '',
				payment_method:   '',
				payment_number:   '',
				payment_commentary:   '',
				bank_account:   '',
				amounts:        {},
				amountsShow:        {}
			},
			form:
			{
				success: null,
				error:   null
			},
			payment_methods: 	   [],
			bank_accounts: 		   []
		}
	},
	created: async function()
	{
           this.user = await this.getProfile();
			if(this.services_association.periods)
		{
			this.period = this.services_association.periods[this.services_association.periods.length-1].id;
			this.owner = this.services_association.id;
			await this.setSettlements(this.period,this.owner);
		}
	
	},
	watch:
	{
		services_association(services_association)
		{
			if(this.services_association.periods)
		{
			this.period = this.services_association.periods[this.services_association.periods.length-1].id;
			this.owner = this.services_association.id;
			this.setSettlements(this.period,this.owner);
		}	
		}
	},
	computed:
	{
		isEnabled()
		{
			return this.$store.getters.servicesAssociation.bank_accounts &&this.$store.getters.servicesAssociation.bank_accounts.length  > 0;
		},
		services_association()
		{
			return this.$store.getters.servicesAssociation;
		}
	},

	methods:
	{
		 customFormatter(date) {
			 return  this.$moment(date).format('Y-MM-DD'); 
    },

		showSettlements()
		{
			// Set settlements by date
			let total   = 0;
			let fu_ids  = Object.keys(this.input.amounts);
			for(let i=0; i < fu_ids.length; i++)
			{
				if(this.$moment.utc(this.input.payment_date).format('Y-MM-DD') <= this.$moment.utc(this.settlements[i].first_due_date).format('Y-MM-DD')) {
					total+=this.settlements[i].amount_on_first_due_date;
					this.input.amounts[fu_ids[i]]=this.settlements[i].amount_on_first_due_date;
				} else {
					total+=this.settlements[i].amount;
					this.input.amounts[fu_ids[i]]=this.settlements[i].amount;
				}
				
			}
				this.total_amount = total;	
		},
		setSettlements: async function(period,owner)
		{
			try
			{
			// Set settlements
			this.settlements = await this.getSettlements(owner, period);
			let total   = 0;
			let fu_ids  = Object.keys(this.input.amounts);
			let payment = false;
			for(let i=0; i < fu_ids.length; i++)
			{
				total+=this.settlements[i].balance;
				this.input.amounts[fu_ids[i]]=this.settlements[i].balance;
				//this.input.amounts[fu_ids[i]]=0;
				payment = this.settlements[i].payments;
			}
				//this.total_amount = 0;	
				this.total_amount = total;
			/*if(payment){
				this.$swal({
  type: 'warning',
  title: 'Tienes informado un pago de este período',
  text: '¿Aún así quieres continuar?',
  confirmButtonText: 'Entendido'
});	

			}	*/

//quiero abonar
let amounts = Object.keys(this.input.amounts)

.map(amount =>
			{
				return  {
					service_unit_id: amount,
					amount: 		    this.input.amounts[amount]
				}
			});

//Mercadopago.setPublishableKey("TEST-2db627bd-0304-4cc3-a483-8d5c1eaacdde");

var payment_data = {
  transaction_amount: this.total_amount,
  token: this.$route.query.token,
  description: 'Abono Total Sercivio Cooperativa',
  installments: parseInt(this.$route.query.installments),
  payment_method_id: this.$route.query.payment_method_id,
  issuer_id: this.$route.query.issuer_id,
  payer: {
    email: this.user.email
  },
  binary_mode:true	
};
payment_data = JSON.stringify(payment_data);

var dataPayment = await this.setPayMercadoPago(payment_data,this.services_association.cooperative.token_key)
.then(dataPayment =>
			{
				this.dataPayment = dataPayment;
				this.isLoading = false;

if(dataPayment.status == "approved") {

this.isLoading=false;
this.pay_state = 'APROBADO';

let paydate = new Date(dataPayment.date_approved);
		paydate = paydate.toISOString();

	var payment_data_me =
			{
				bank_account_id:   this.services_association.bank_accounts[0].id,
				payment_method_id: 3,
				date: 	paydate ,
				number: dataPayment.id,
				period: this.period,
				commentary: 'PAGO HECHO POR MERCADO PAGO',
				amounts: amounts
				
			};


if (payment_data_me) {
var test = this.notifyPayment(payment_data_me);
}


			this.$swal({
 type: 'success',
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText:'Aceptar',
  title: 'Pago Aceptado',
  text: 'El pago fue aprobado, queda en estado pendiente hasta que lo procese la cooperativa.!'
});


} else {
				//console.log(dataPayment);
		 var statusd = dataPayment.status_detail;
		 var respuesta = '';

	    switch (statusd){
	        case "cc_rejected_bad_filled_card_number":
	            respuesta = "Revisa el número de tarjeta";
	    	break;
	    	 case "cc_rejected_bad_filled_date":
	            respuesta = "Revisa la fecha de vencimiento";
	    	break;
	    	
	    	 case "cc_rejected_bad_filled_other":
	            respuesta = "Revisa los datos.";
	    	break;
	    	
	    	 case "cc_rejected_bad_filled_security_code":
	            respuesta = "Revisa el código de seguridad de la tarjeta.";
	    	break;
	    	
	    	 case "cc_rejected_blacklist":
	            respuesta = "No pudimos procesar tu pago.";
	    	break;
	    	
	    	 case "cc_rejected_call_for_authorize":
	            respuesta = "Debes autorizar ante tu entidad de pago (banco o tarjeta) el pago del monto a abonar.";
	    	break;
	    	 case "cc_rejected_card_disabled":
	            respuesta = "Llama a tu entidad de pago (banco o tarjeta) para activar tu tarjeta o usa otro medio de pago.El teléfono está al dorso de tu tarjeta.";
	    	break;
	    	 case "cc_rejected_card_error":
	            respuesta = "No pudimos procesar tu pago.";
	    	break;
	    	 case "cc_rejected_duplicated_payment":
	            respuesta = "Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.";
	    	break;
	    	 case "cc_rejected_high_risk":
	            respuesta = "Tu pago fue rechazado.Elige otro de los medios de pago, te recomendamos con medios en efectivo.";
	    	break;
	    	 case "cc_rejected_insufficient_amount":
	            respuesta = "Tu entidad de pago (banco o tarjeta) no tiene fondos suficientes";
	    	break;
	    	 case "cc_rejected_invalid_installments":
	            respuesta = "Tu entidad de pago (banco o tarjeta) no procesa pagos en esa cantidad de cuotas";
	    	break;
	    	 case "cc_rejected_max_attempts":
	            respuesta = "Llegaste al límite de intentos permitidos.Elige otra tarjeta u otro medio de pago";
	    	break;
	    	 case "cc_rejected_other_reason":
	            respuesta = "Tu entidad de pago (banco o tarjeta) no procesó el pago";
	    	break;
	    	 case "pending_contingency":
	            respuesta = "Estamos procesando tu pago.No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó.";
	    	break;
	    	 case "pending_review_manual":
	            respuesta = "Estamos procesando tu pago. No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó o si necesitamos más información.";
	    	break;
	    	
	    	default:
			 respuesta = "Error";
	    }	
				
				
				this.$swal({
  type: 'error',
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText:'Aceptar',
  title: 'Ocurrió un error',
  text: 'El pago no fue aprobado! '+ respuesta
}).then((result) => {
if (result.value) {
this.$router.push(
				{
					name: 'servicios'
				});	
	
}
}
);
}

			})
			.catch(err =>
			{
				this.isLoading = false;
			
				this.$swal({
  type: 'error',
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText:'Aceptar',
  title: 'Ocurrió un error',
  text: 'El pago no fue aprobado, vuelve a intentarlo!'
}).then((result) => {
if (result.value) {
this.$router.push(
				{
					name: 'servicios'
				});	
	
}
}
);






			});



			}
			catch(err)
			{
				console.log(err);
			}

		},
		showNumber() {
			if (this.uploadShowNumber){
			this.uploadShowNumber = false;
		} else {
			this.uploadShowNumber = true;
		}
		},
		onUploaderChange(e)
		{
			this.fileToUpload = e.target.files[0];
			 if(['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].indexOf(this.fileToUpload.type) == -1) {
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
		}
    }
}
 

</script>