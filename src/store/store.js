import { createStore } from "vuex";
import auth from "./modules/auth/index";

const store = createStore({
    // modules: {
    //     auth,
    // },
    state: {
        authenticated: false
    },
    mutations: {
        SET_AUTH: (state, auth) => {
            state.authenticated = auth
        }
    },
    actions: {
       setAuth: ({commit}, auth) => {
        commit('SET_AUTH', auth)
       }
    },
    modules: {}
});

export default store;
