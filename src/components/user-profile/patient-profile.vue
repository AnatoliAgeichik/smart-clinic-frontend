<template>
	<custom-header>
	</custom-header>
	<div class="container rounded bg-white mt-5 mb-5">
	    <div class="row">
	        <div class="col-md-3 border-right">
	            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
	            	<img class="rounded-circle mt-5" width="150px" height="200px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
	            	<h6 class="font-weight-bold">{{user.name}}</h6>
	            	<h6 class="text-black-50">{{user.email}}</h6>
	            	<span> </span>
	            </div>
	        </div>
	        <div class="col-md-5 border-right">
	            <div class="p-3 py-5">
	                <div class="d-flex justify-content-between align-items-center mb-3">
	                    <h4 class="text-right">Patient Settings</h4>
	                </div>
	                    <div class="col-md-12">
	                    	<label class="labels">First Name</label>
	                    	<input type="text" class="form-control" placeholder="first name" 
	                    		id="firstName" v-model="patient.first_name" 
	                    		required>
	                    </div>
	                    <br/>
	                    
	                    <div class="col-md-12">
	                    	<label class="labels">Surname</label>
	                    	<input type="text" class="form-control"
	                    		id="surname" v-model="patient.surname" placeholder="surname" required>
	                    </div>
	                    <br/>
	                    
	                    <div class="col-md-12">
	                    	<label class="labels">Birthday</label>
	                    	<input class="form-control" id="birthday" type="date"
	                    	 v-model="patient.birthday" required>
	                    </div>
	                    <br/>

	                    <div class="col-md-12">
	                    	<label class="labels">Phone</label>
	                    	<input class="form-control" id="birthday" type="text" placeholder="phone"
	                    	 v-model="patient.phone" required>
	                    </div>
	                    <br/>

	                    <div class="mt-5 text-center">
	                    	<button v-if="!is_have_patient" class="btn btn-primary profile-button" type="button"
	                			@click="createPatient">Create patient profile
	                		</button>
	                		<button v-if="is_have_patient" class="btn btn-primary profile-button" type="button"
	                		 	@click="updatePatient">Update patient profile
	                		</button>
	                	</div>
	            </div>
	        </div>
	        <div class="col-md-4">
	            <div class="p-3 py-5">
	            	<div class="d-flex justify-content-between align-items-center mb-3">
	                    <h5 class="text-right">Address</h5>
	                </div>
	                <div class="col-md-12">
	                	<label class="labels">Country</label>
	                	<input type="text" class="form-control"
	                	 placeholder="Country" v-model="address.country">
	                </div> <br>
	                <div class="col-md-12">
	                	<label class="labels">City</label>
	                	<input type="text" class="form-control" 
	                		placeholder="City" v-model="address.city">
	                </div> <br/>
	                <div class="col-md-12">
	                	<label class="labels">Street</label>
	                	<input type="text" class="form-control" 
	                	placeholder="Street" v-model="address.street">
	                </div> <br/>
	                <div class="col-md-12">
	                	<label class="labels">House number</label>
	                	<input type="text" class="form-control"
	                	 placeholder="House number" v-model="address.house_number">
	                </div>
	                <br/>
	                <div class="col-md-12">
	                	<label class="labels">Number flat</label>
	                	<input type="text" class="form-control"
	                	 placeholder="Number flat" v-model="address.number_flat">
	                </div>
	            </div>
	                   <div class="mt-5 text-center">
	                		<button v-if="!is_have_address" class="btn btn-primary profile-button" type="button"
	                			@click="createAddress">Add address
	                		</button>
	                		<button v-if="is_have_address" class="btn btn-primary profile-button" type="button"
	                		 	@click="updateAddress">Update address
	                		</button>
	                	</div>
	        </div>
	        </div>
	    </div>
		<custom-footer>
		</custom-footer>
</template>

<script type="text/javascript">

import customHeader from '../navigation/custom-header'
import customFooter from '../navigation/custom-footer.vue'

export default{
	components: {
      customHeader,
	  customFooter,
    },
	data(){
      return {
      	patient:{
	        first_name : "",
	        surname : "",
	        birthday : "",
	        phone: "",
	    },
	    address:{
	    	country: "",
	    	city: "",
	    	street: "",
	    	house_number: "",
	    	number_flat: ""
	    },
      }
    },
    computed:{
    	user(){
    		return this.$store.state.auth.user
    	},
    	is_have_patient(){
    		return Boolean(this.$store.state.auth.user.patient_id)
    	},
    	is_have_address(){
    		if (!this.is_have_patient){
    			return false
    		}
    		return Boolean(
    			this.$store.state.patient.patient.address_id
    		)	
    	}
  	},
  	created(){
		this.$store.dispatch('patient/getPatient')
			.then(() => {
				this.patient = this.$store.state.patient.patient
			})
		this.$store.dispatch('patient/getAddress')
			.then(() => {
				this.address = this.$store.state.patient.address
			})

  	},
    methods: {
    	createPatient(event){
    		this.$store.dispatch('patient/createPatient',  this.patient)
    	},
    	updatePatient(event){
    		this.$store.dispatch('patient/updatePatient',  this.patient)
    	},
    	createAddress(event){
    		this.$store.dispatch('patient/createAddress',  this.address)
    	},
    	updateAddress(event){
    		this.$store.dispatch('patient/updateAddress',  this.address)
    	}

    }
}
</script>

<style scoped>
	body {
    background: rgb(0, 0, 0)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(256, 0, 0);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
</style>