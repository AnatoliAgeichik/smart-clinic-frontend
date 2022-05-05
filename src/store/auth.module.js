import axios from 'axios';
import router from '../router';
import { login_url, registration_url, user_url } from '../urls';

export const auth = {
  namespaced: true,

  state: {
    user: {},
    status: {},
    check: 0,
  },

  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state) {
      state.status = 'success';
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.user = {};
      state.status = {};
      state.check = 0;
    },

    SET_USERS(state, user) {
      state.user = user;
      state.status = { id: 1 };
      state.check = 1;
    },
  },

  actions: {
    login({ commit, state }, user) {
      let result = new Promise((resolve, reject) => {
        commit('logout');
        commit('doctor/reset', null, { root: true });
        commit('patient/reset', null, { root: true });
        commit('auth_request');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axios({
          url: login_url,
          data: {
            email: user.email,
            password: user.password,
          },
          method: 'POST',
        })
          .then((resp) => {
            if (resp.data.access_token && resp.data.refresh_token) {
              const access_token = resp.data.access_token;
              const refresh_token = resp.data.refresh_token;
              localStorage.setItem('access_token', access_token);
              localStorage.setItem('refresh_token', refresh_token);
              //axios.defaults.headers.common['Authorization'] = token;
              commit('auth_success');
              this.dispatch('auth/get_user_profile', { self: this });
            } else {
            }
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            reject(err);
          });
      });
      return result;
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        commit('doctor/reset', { root: true });
        commit('patient/reset', { root: true });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        commit('SET_USERS', {});
        //delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: registration_url,
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
          },
          method: 'POST',
        })
          .then((resp) => {
            const access_token = resp.data.access_token;
            const refresh_token = resp.data.refresh_token;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            //axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success');
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            reject(err);
          });
      });
    },
    get_user_profile({ commit }) {
      axios
        .get(user_url, {
          headers: {
            'x-access-tokens': localStorage.getItem('access_token'),
          },
        })
        .then((response) => {
          commit('SET_USERS', response.data);
          router.push('doctor-profile');
        })
        .catch((error) => {
          console.log(error.statusText);
        });
    },
  },

  getters: {
    userStatus(state) {
      return state.status;
    },
    user(state) {
      return state.user;
    },
    user_id(state) {
      return state.user.id;
    },
  },
};
