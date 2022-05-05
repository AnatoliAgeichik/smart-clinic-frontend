import { createStore } from 'vuex';
import { auth } from './auth.module';
import { doctor } from './doctor.module';
import { patient } from './patient.module';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    auth,
    doctor,
    patient,
  },
  plugins: [createPersistedState()],
});

export default store;
