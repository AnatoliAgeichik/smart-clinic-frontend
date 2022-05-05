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
	                    <h4 class="text-right">Doctor Settings</h4>
	                </div>
	                    <div class="col-md-12">
	                    	<label class="labels">First Name</label>
	                    	<input type="text" class="form-control" placeholder="first name" 
	                    		id="firstName" v-model="doctor.first_name" 
	                    		required>
	                    </div>
	                    <br/>
	                    
	                    <div class="col-md-12">
	                    	<label class="labels">Surname</label>
	                    	<input type="text" class="form-control"
	                    		id="surname" v-model="doctor.surname" placeholder="surname" required>
	                    </div>
	                    <br/>
	                    
	                    <div class="col-md-12">
	                    	<label class="labels">Birthday</label>
	                    	<input class="form-control" id="birthday" type="date" v-model="doctor.birthday" required>
	                    </div>
	                    <br/>
	                    <div class="mt-5 text-center">
	                		<button v-if="is_new" class="btn btn-primary profile-button" type="button" @click=	"createDoctor">Create doctor profile</button>
	                		<button v-if="!is_new" class="btn btn-primary profile-button" type="button" @click="updateDoctor">Update doctor profile</button>
	                	</div>
	            </div>
	        </div>
	        <div class="col-md-4">
	            <div class="p-3 py-5">
	            	<div class="d-flex justify-content-between align-items-center mb-3">
	                    <h5 class="text-right">Education</h5>
	                </div>
	                <div class="col-md-12">
	                	<label class="labels">University name</label>
	                	<input type="text" class="form-control" placeholder="University name" v-model="education.university_name">
	                </div> <br>
	                <div class="col-md-12">
	                	<label class="labels">Specialization</label>
	                	<input type="text" class="form-control" placeholder="Specialization" v-model="education.specialization">
	                </div> <br/>
	                <div class="col-md-12">
	                	<label class="labels">Education degree</label>
	                	<input type="text" class="form-control" placeholder="Education degree" v-model="education.education_degree">
	                </div> <br/>
	                <div class="col-md-12">
	                	<label class="labels">Date of graduation</label>
	                	<input type="date" class="form-control" placeholder="Date of graduation" v-model="education.date_of_graduation">
	                </div>
	            </div>
	            <div class="mt-5 text-center">
	                	<button v-if="!is_new" class="btn btn-primary profile-button" type="button" @click=	"createEducation">Add education</button>
	            </div>


	            	<div class="p-3 py-5" v-for="ed in allEducation" :key="ed.id">
		            	<div class="col-md-12">
		                	<label class="labels">University name</label>
		                	<input type="text" class="form-control" placeholder="University name"
		                	 v-model="ed.university_name">
		                </div> <br>
		                <div class="col-md-12">
		                	<label class="labels">Specialization</label>
		                	<input type="text" class="form-control" placeholder="Specialization"
		                	 v-model="ed.specialization">
		                </div> <br/>
		                <div class="col-md-12">
		                	<label class="labels">Education degree</label>
		                	<input type="text" class="form-control" placeholder="Education degree"
		                	 v-model="ed.education_degree">
		                </div> <br/>
		                <div class="col-md-12">
		                	<label class="labels">Date of graduation</label>
		                	<input type="date" class="form-control" placeholder="Date of graduation"
		                	 v-model="ed.date_of_graduation">
		                </div>
		                <div class="mt-5 text-center">
		                	<button v-if="!is_new" class="btn btn-primary profile-button" type="button" @click=	"updateEducation(ed)">Update education</button>
		           		 </div>
	            	</div>
	        </div>
	        </div>
	    </div>
	<custom-footer>
	</custom-footer>
</template>

<script type="text/javascript">

import customHeader  from '../navigation/custom-header'
import customFooter from '../navigation/custom-footer.vue'

export default{
	components: {
      customHeader,
	  customFooter,
    },
	data(){
      return {
      	doctor:{
	        first_name : "",
	        surname : "",
	        birthday : "",
	    },
	    education:{
	    	university_name: "",
	    	specialization: "",
	    	education_degree: "",
	    	date_of_graduation: ""
	    },
	    allEducation:[]
      }
    },
    computed:{
    	user(){
    		return this.$store.state.auth.user
    	},
    	is_new(){
    		return Boolean(!this.$store.state.auth.user.doctor_id)
    	}
  	},
  	created(){
		this.$store.dispatch('doctor/getDoctor')
			.then(() => {
				this.doctor = this.$store.state.doctor.doctor
			})
		this.$store.dispatch('doctor/getEducation')
			.then(() => {
				this.allEducation = this.$store.state.doctor.education
			})

  	},
    methods: {
    	createDoctor(event){
    		this.$store.dispatch('doctor/createDoctor',  this.doctor)
			setTimeOut(()=> {this.doctor = this.$store.state.doctor.doctor }, 500)
				
    	},
    	updateDoctor(event){
    		this.$store.dispatch('doctor/updateDoctor',  this.doctor)
			setTimeOut(()=> {this.doctor = this.$store.state.doctor.doctor }, 500)
				
    	},
    	createEducation(event){
    		this.$store.dispatch('doctor/createEducation',  this.education)
			setTimeOut(()=> {this.allEducation = this.$store.state.doctor.education }, 500)
    	},
    	updateEducation(ed){
    		this.$store.dispatch('doctor/updateEducation',  ed)
				setTimeOut(()=> {this.allEducation = this.$store.state.doctor.education }, 500)
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