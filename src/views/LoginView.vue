<template>
    <div class="container-fluid">
        <div class="row">
            <div class="left-side col-12 col-lg-6">
                <div class="logo">
                    <!-- <img src="../temp/css/assets/images/user_img/logo3.png" alt="Social book"> -->
                </div>
                <div class="title">
                    Nơi tìm hiểu và chia sẻ những vị trí, trải nghiệm với những địa điểm du lịch                   
                </div>
            </div>
            <form class="right-side col-12 col-lg-6" @submit.prevent="handleLoginSubmit">
                <input type="text" v-model="email" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <input type="password" v-model="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <button type="submit" class="sign-in-btn form-btn btn btn-primary">Đăng nhập</button>
                <a href="" class="link-forgot-password mb-2">Quên mật khẩu?</a>
                <button type="button" class="sign-up-btn form-btn btn btn-success" @click="moveToRegister">Đăng ký</button>
                <!-- <FormSubmit/> -->
            </form>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .container-fluid {
        background-color: #f0f2f5;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    .logo {
        background: url('../temp/css/assets/images/user_img/logo3.png') left / contain no-repeat;
        height: 4rem;
        margin-bottom: 1rem;
    }
    .left-side {
        display: flex;
        justify-content: center;
        flex-direction: column;
        & img {
            max-width: 100%;
        }
    }
    .right-side {
        border-radius: 2%;
        background-color: #fff;
        box-shadow: 0 0 1.6em #ccc;
        max-width: 400px;
        margin: 0 auto;
        padding: 12px;
    }
    .sign-in-form {
        padding: 1rem;
    }
    input.form-input {
        /* border: none; */
        outline: none;
        &:focus {
            box-shadow: none;
        }
    }
    input.form-input, .form-btn {
        margin-bottom: 1rem;
        width: 100%;
    } 
    button {
        font-weight: bold;
        padding: 0.5rem;
    }
    a.link-forgot-password {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    /**Responsive */
    @media (max-width: 576px) {
        .right-side {
            margin: 1rem auto;
        }
    }

    @media (min-width: 576px) and (max-width: 768px){
        .right-side {
            margin: 1rem auto;
        }
        .logo {
            background-position-x: center;
        }
        .title {
            text-align: center;
        }
    }
    @media (min-width: 1200px) {
        .container-fluid {
            height: 100vh;
        }
    }
</style>
<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap/dist/js/bootstrap.bundle.js';
    import '@fortawesome/vue-fontawesome';
    import {mapState, mapActions} from 'vuex';
    import store from '../store/store';
    import axios from 'axios';

    // import {FormSubmit} from '../components/test.js';
    // import FormSubmit from '../components/FormSubmit.vue';

    export default {
        name: 'LoginView',
        data() {
            return {
                email: '',
                password: '',
                login_data: {} ,
                response_data: {},
            }
        },
        methods: {
            moveToRegister() {
                this.$router.push('/signup');
            },

            handleLoginSubmit() {
                try {
                    this.login_data['email'] = this.email;
                    this.login_data['password'] = this.password;
                    this.login_data.returnSecureToken = true;
                    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDT5wm4oPfy7gUnuLQSQrWf-0Hyg0lR28U',
                        this.login_data)
                    .then((response) => {
                        console.log(response);
                        this.response_data = Object.assign({}, response);
                        localStorage.setItem('token', this.response_data.data.refreshToken);
                        this.$router.push('/home');
                        store.dispatch('setAuth', true);
                    })
                    .catch(e => {
                        console.log(e);
                        store.dispatch('setAuth', false);
                    }) 
                } catch (error) {
                    console.log(error);
                }
            },

            pushToHomeView() {

            }
        },
        computed: {
            // mapState({
            // // arrow functions can make the code very succinct!
            // firstName: state => state.name,
            // })
            
            // ...mapState({
            //     firstName: (state) => console.log(state.name),
            // }),

            // firstName() {
            //     return store.state.name;
            // },

            // ...mapState(['name']),
            // firstName() {
            //     return this.name;
            // },

            // ...mapState('auth', {
            //     firstName: (state) => state.name,
            // }),
            
        },
        created() {
            localStorage.getItem('token')
            if (localStorage.getItem('token')) {
                this.$router.push('/home');
            }
        }
    }
</script>