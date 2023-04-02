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
            
            <ToastMessage v-if="isToastShow" :propsMessage="toast_message.toString()" :typeMessage="isError"/>
            <form class="right-side col-12 col-lg-6" @submit.prevent="handleLoginSubmit">
                
                <input ref="emailInput" type="text" v-model="email" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
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
        padding: 0;
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
    input.form-input{
        margin-bottom: 1rem;
        width: 100%;
    } 
    .form-btn {
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
    @media (min-width: 768px) and (max-width: 992px) {
        .title {
            text-align: center;
        }
        .logo {
            background-position-x: center;
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
    import axios from 'axios';
    
    import validators from '../js/validators';
    import resource from '../js/resource';
    import useErrors from '../js/errors';
    import ToastMessage from '../components/ToastMessage.vue';
    import store from '../store/store';

    export default {
        name: 'LoginView',
        components: {ToastMessage},
        data() {
            return {
                email: '',
                password: '',
                login_data: {} ,
                response_data: {},
                messages: {},
                toast_message: '',
                isToastShow: false,
                isError: true
            }
        },
        methods: {
            moveToRegister() {
                this.$router.push('/signup');
            },

            async handleLoginSubmit() {
                try {
                    const {INVALID_PASSWORD, EMAIL_NOT_FOUND} = useErrors();
                    this.login_data['username'] = this.email;
                    this.login_data['password'] = this.password;
                    await axios.post(`auth/authenticate`, this.login_data)
                    .then((response) => {
                        console.log(response);
                        this.response_data = Object.assign({}, response);
                        this.messages['success'] = 'Đăng nhập thành công';
                        this.showToastMessage(false);
                        store.dispatch('setAuth', true);
                        // setAuthHeader(response.data.token);
                        this.pushToLatestView();
                    })
                    .catch(e => {
                        store.dispatch('setAuth', false);
                        console.log(e);
                    }) 
                    
                } catch (error) {
                    store.dispatch('setAuth', false);
                    console.log(error);
                }
            },
            /**
             * Lưu token và đẩy về trang home
             * 13/03/23
             */
            pushToLatestView() {
                localStorage.setItem('token', JSON.stringify(this.response_data.data));
                this.$router.push('/latest');
            },

            validateInput(email, password) {
                const {isEmail, isEmpty} = validators();
                const {EMAIL, PASSWORD} = resource();
                this.messages = {};
                if(isEmpty(EMAIL, email) || isEmpty(PASSWORD, password)) {
                    this.messages['empty'] = 'Vui lòng điền đủ email / mật khẩu';
                    return false;
                }
                else if(isEmail(EMAIL, email)) {
                    this.messages['email'] = 'Vui lòng kiểm tra lại email'
                    return false
                }
                this.messages = {};
                return true;
            },
            /**
             * Hiện toast message
             */
            showToastMessage(isError) {
                this.toast_message = Object.values(this.messages);
                this.isError = isError;
                this.isToastShow = true;
                this.timeOutHandle();
            }, 

            timeOutHandle() {
                let timer = setTimeout(() => {
                    this.isToastShow = false;
                    this.toast_message = {};
                }, 5 * 1000);
                return timer;
            },
            /**
             * Đóng toast message
             */
            closeToast() {
                return this.isToastShow = false;
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
        mounted() {
            this.$refs.emailInput.focus();
        },
        created() {
            localStorage.getItem('token')
            if (localStorage.getItem('token')) {
                this.$router.push('/latest');
            }
        }
    }
</script>