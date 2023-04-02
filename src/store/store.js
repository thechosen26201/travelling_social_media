import { createStore } from "vuex";
import auth from "./modules/auth/index";

const store = createStore({
    // modules: {
    //     auth,
    // },
    state: {
        isAuthenticated: false
    },
    mutations: {
        SET_AUTH: (state, auth) => {
            state.isAuthenticated = auth
        },
    },
    actions: {
        setAuth: ({ commit }, auth) => {
            commit('SET_AUTH', auth)
        },
    },
    getters: {
        getAuth: (state) => {
            return state.isAuthenticated
        },
    },
    modules: {}
});

export default store;
