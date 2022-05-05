import axios from 'axios';
import { user_url, get_patient_url, get_address_url } from '../urls';
import { mapGetters } from 'vuex';

export const patient = {
  namespaced: true,
  state: {
    patient: {},
    address: {},
  },

  mutations: {
    FETCH_PATIENT(state, patient) {
      state.patient = patient;
    },
    FETCH_ADDRESS(state, address) {
      state.address = address;
    },
    reset(state) {
      console.log('aeeeeeeeeeeewfcsfsdecscd');
      state.patient = {};
      state.address = {};
    },
  },

  actions: {
    getPatient({ commit, state, rootState }) {
      console.log('in get patient');
      axios
        .get(get_patient_url(rootState.auth.user.id), {
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
        })
        .then((response) => {
          console.log('response afjaekljf');
          console.log(response.data);
          commit('FETCH_PATIENT', response.data);
        })
        .catch((error) => {
          console.log(error.statusText);
        });
    },
    createPatient({ commit, rootState }, patient) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_patient_url(rootState.auth.user.id),
          data: {
            first_name: patient.first_name,
            surname: patient.surname,
            birthday: patient.birthday,
            phone: patient.phone,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'POST',
        })
          .then((respone) => {
            commit('FETCH_PATIENT', response.data);
          })
          .catch((error) => {
            console.log(error.statusText);
          });
      });
      this.dispatch('profile/getPatient', { self: this });
      this.dispatch('auth/get_user_profile', { self: this });
    },
    updatePatient({ commit, rootState }, patient) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_patient_url(rootState.auth.user.id),
          data: {
            first_name: patient.first_name,
            surname: patient.surname,
            birthday: patient.birthday,
            phone: patient.phone,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'PUT',
        })
          .then((respone) => {
            commit('FETCH_PATIENT', response.data);
          })
          .catch((error) => {
            console.log(error.statusText);
          });
      });
      this.dispatch('profile/getPatient', { self: this });
    },
    getAddress({ commit, state, rootState }) {
      axios
        .get(get_address_url(rootState.auth.user.id), {
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
        })
        .then((response) => {
          commit('FETCH_ADDRESS', response.data);
        })
        .catch((error) => {
          console.log(error.statusText);
        });
    },
    createAddress({ commit, rootState }, address) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_address_url(rootState.auth.user.id),
          data: {
            country: address.country,
            city: address.city,
            street: address.street,
            house_number: address.house_number,
            number_flat: address.number_flat,
          },
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
          method: 'POST',
        })
          .then((respone) => {
            this.dispatch('profile/getAddress', { self: this });
          })
          .catch((error) => {
            console.log(error.statusText);
          });
        this.dispatch('profile/getAddress', { self: this });
      });
    },
    updateAddress({ commit, rootState }, address) {
      return new Promise((resolve, reject) => {
        axios({
          url: get_address_url(rootState.auth.user.id),
          data: {
            country: address.country,
            city: address.city,
            street: address.street,
            house_number: address.house_number,
            number_flat: address.number_flat,
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
      });
      this.dispatch('profile/getAddress', { self: this });
    },
  },
  getters: {
    patient(state) {
      return state.patient;
    },
    address(state) {
      return state.address;
    },
  },
};
