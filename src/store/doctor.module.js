import axios from 'axios';
import {
  user_url,
  doctor_url,
  get_doctor_url,
  get_education_url,
  get_education_by_id_url,
} from '../urls';
import { mapGetters } from 'vuex';

export const doctor = {
  namespaced: true,
  state: {
    doctor: {},
    education: [],
  },

  mutations: {
    FETCH_DOCTOR(state, doctor) {
      state.doctor = doctor;
    },
    FETCH_EDUCATION(state, education) {
      state.education = education;
    },
    reset(state) {
      console.log('alakfjakljfekjajejike');
      state.doctor = {};
      state.education = [];
    },
  },

  actions: {
    getDoctor({ commit, state, rootState }) {
      axios
        .get(get_doctor_url(rootState.auth.user.id), {
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
        })
        .then((response) => {
          commit('FETCH_DOCTOR', response.data);
        })
        .catch((error) => {
          console.log(error.statusText);
        });
    },
    createDoctor({ commit, rootState }, doctor) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_doctor_url(rootState.auth.user.id),
          data: {
            first_name: doctor.first_name,
            surname: doctor.surname,
            birthday: doctor.birthday,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'POST',
        })
          .then((respone) => {
            commit('FETCH_DOCTOR', response.data);
          })
          .catch((error) => {
            console.log(error.statusText);
          });
      });
      this.dispatch('doctor/getDoctor', { self: this });
      this.dispatch('auth/get_user_profile', { self: this });
    },
    updateDoctor({ commit, rootState }, doctor) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_doctor_url(rootState.auth.user.id),
          data: {
            first_name: doctor.first_name,
            surname: doctor.surname,
            birthday: doctor.birthday,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'PUT',
        })
          .then((respone) => {
            commit('FETCH_DOCTOR', response.data);
          })
          .catch((error) => {
            console.log(error.statusText);
          });
        this.dispatch('doctor/getDoctor', { self: this });
      });
    },
    getEducation({ commit, state, rootState }) {
      axios
        .get(get_education_url(rootState.auth.user.id), {
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
        })
        .then((response) => {
          commit('FETCH_EDUCATION', response.data);
        })
        .catch((error) => {
          console.log(error.statusText);
        });
    },
    createEducation({ commit, rootState }, education) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_education_url(rootState.auth.user.id),
          data: {
            university_name: education.university_name,
            specialization: education.specialization,
            education_degree: education.education_degree,
            date_of_graduation: education.date_of_graduation,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'POST',
        })
          .then((respone) => {
            this.dispatch('doctor/getDoctor', { self: this });
          })
          .catch((error) => {
            console.log(error.statusText);
          });
        this.dispatch('doctor/getEducation', { self: this });
      });
    },
    updateEducation({ commit, rootState }, education) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_education_by_id_url(rootState.auth.user.id, education.id),
          data: {
            university_name: education.university_name,
            specialization: education.specialization,
            education_degree: education.education_degree,
            date_of_graduation: education.date_of_graduation,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'PUT',
        })
          .then((respone) => {})
          .catch((error) => {
            console.log(error.statusText);
          });
        this.dispatch('doctor/getEducation', { self: this });
      });
    },
  },
  getters: {
    userStatus(state) {
      return state.status;
    },
    doctor(state) {
      return state.doctor;
    },
    education(state) {
      return state.education;
    },
  },
};
