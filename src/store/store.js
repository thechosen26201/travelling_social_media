import { createStore } from "vuex";
import auth from "./modules/auth/index";

const store = createStore({
    modules: {
        auth,
    },
    // state() {
    //     return {
    //         name: 'Khanh',
    //     }
    // },
});

export default store;
