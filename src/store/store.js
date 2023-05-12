import { createStore } from "vuex";
import { auth } from "../firebase";
import { toast } from 'vue3-toastify';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "../router";
import 'vue3-toastify/dist/index.css';

const store = createStore({
    // modules: {
    //     auth,
    // },
    state: {
        isAuthenticated: false,
        list_post: [],
        reply_comment: {},
        delete_comment: '',
        edit_comment: {},
        user_profile: {},
        modal: {},
        carousel_link: '',
        isFetch: false,
    },
    mutations: {
        SET_AUTH: (state, auth) => {
            state.isAuthenticated = auth
        },
        SET_POST: (state, list) => {
            state.list_post.push(list);
        },
        SET_REPLY: (state, comment_obj) => {
            state.reply_comment = Object.assign({}, comment_obj);
        },
        SET_DELETE: (state, delete_obj) => {
            state.delete_comment = delete_obj;
        },
        SET_EDIT: (state, edit_obj) => {
            state.edit_comment = Object.assign({}, edit_obj);
        },
        SET_CURRENT_USER: (state) => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const temp = {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        emailVerified: user.emailVerified,
                        uid: user.uid
                    }
                    return state.user_profile = Object.assign({}, temp)
                }
            });

        },
        SET_IMG_URL: (state, link) => {
            return new URL(link, import.meta.url).href
        },
        LOG_OUT: () => {
            signOut(auth).then(() => {
                console.log('Đã đăng xuất');
                router.push({name: 'user-login'})
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
        },
        SET_MODAL: (state, modal) => {
            try {
                state.modal = modal;
            } catch (error) {
                console.log(error);
            }
        },
        SET_TOAST: (state, message, type, duration = 2000) => {
            toast(message, {
                autoClose: duration,
                type: type
            }); 
        },
        FETCH_NEXT: (state, isFetch) => {
            try {
                return state.isFetch = isFetch;
            } catch (error) {
                console.log(error);
            }
        }
    },
    actions: {
        setAuth: ({ commit }, auth) => {
            commit('SET_AUTH', auth)
        },
        setDel: ({ commit }, obj) => {
            commit('SET_DELETE', obj)
        },
        setUser: ({ commit }) => {
            commit('SET_CURRENT_USER')
        },
        setImgUrl: ({commit}, link) => {
            commit('SET_IMG_URL', link)
        },
        logOut: ({ commit }) => {
            commit('LOG_OUT');
        },
        setModal: ({commit}, modal) => {
            commit('SET_MODAL', modal);
        },
        notify: ({commit}, message, type, duration = 2000) => {
            commit('SET_TOAST', message, type, duration);
        },
        setFetchFlag: ({commit}, isFetch) => {
            commit('FETCH_NEXT', isFetch);
        }
    },
    getters: {
        getAuth: (state) => {
            return state.isAuthenticated
        },
        getReply: state => {
            return state.reply_comment
        },
        getDelete: state => {
            return state.delete_comment
        },
        getEdit: state => {
            return state.edit_comment;
        },
        getUser: state => {
            return state.user_profile;
        },
        getModal: state => {
            return state.modal;
        },
    },
    modules: {}
});

export default store;
