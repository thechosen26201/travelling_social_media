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

                <!-- <input ref="emailInput" type="text" v-model="email" class="form-input form-control" placeholder="Email"
                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <input type="password" v-model="password" class="form-input form-control" placeholder="Mật khẩu"
                    aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"> -->
                <InputBase :type="'text'" :placeholder="'Email'" @sendString="sendString"/>
                <InputBase :type="'password'" :placeholder="'Mật khẩu'" @sendString="sendString"/>
                <button type="submit" class="sign-in-btn form-btn btn btn-primary">Đăng nhập</button>
                <router-link to="/forgot" class="link-forgot-password mb-2">Quên mật khẩu?</router-link>
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

input.form-input {
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

@media (min-width: 576px) and (max-width: 768px) {
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import validators from '../js/validators';
import resource from '../js/resource';
import useErrors from '../js/errors';
import InputBase from '../components/InputBase.vue';

export default {
    name: 'LoginView',
    components: { InputBase },
    data() {
        return {
            email: '',
            password: '',
            login_data: {},
            response_data: {},
            messages: {},
            toast_message: '',
            isToastShow: false,
            isError: true,
            auth: getAuth(),
            isValid: false,
        }
    },
    methods: {
        /**Hàm toast message */
        notify(message, type, duration) {
            toast(message, {
                autoClose: duration,
                type: type
            });
        },

        moveToRegister() {
            this.$router.push('/signup');
        },
        sendString (sendString) {
            let obj = Object.assign({}, sendString);
            if (obj['type'] === 'Email' && obj['condition']) {
                this.email = obj['value'];
                this.isValid = true;
            }
            else if (obj['type'] === 'Mật khẩu' && obj['condition']) {
                this.password = obj['value'];
                this.isValid = true;
            }
            else {
                this.isValid = false;
            }
        },
        async handleLoginSubmit() {
            try {
                const { INVALID_PASSWORD, EMAIL_NOT_FOUND } = useErrors();
                if(this.isValid) {
                    const response = await signInWithEmailAndPassword(this.auth, this.email, this.password);
                    // this.response_data = response.user.accessToken
                    // console.log(response.user.accessToken);
                    this.notify('Đăng nhập thành công','success', 1500);
                    this.pushToNextView();
                    return;
                }
                else {
                    throw new TypeError('Kiểm tra lại định dạng')
                }
                
            } catch (error) {
                // store.dispatch('setAuth', false);
                this.notify('Kiểm tra lại email hoặc mật khẩu', 'error', 2500)
                console.log(error);
            }
        },
        /**
         * đẩy về trang home
         * 13/03/23
         */
        pushToNextView() {
            // localStorage.setItem('token', JSON.stringify(this.response_data));
            this.$router.push('/list_destination');
        },

        validateInput(email, password) {
            const { isEmail, isEmpty } = validators();
            const { EMAIL, PASSWORD } = resource();
            this.messages = {};
            if (isEmpty(EMAIL, email) || isEmpty(PASSWORD, password)) {
                this.messages['empty'] = 'Vui lòng điền đủ email / mật khẩu';
                return false;
            }
            else if (isEmail(EMAIL, email)) {
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
        // this.$refs.emailInput.focus();
        document.querySelector('input[placeholder=Email]').focus();
    },
    created() {
        localStorage.getItem('token')
        if (localStorage.getItem('token')) {
            this.$router.push('/latest');
        }
    }
}
</script>