<template lang="">
    <div class="container-fluid">
        <div class="row">
            <div class="left-side col-12 col-lg-6">
                <div class="logo">
                    <!-- <img src="../temp/css/assets/images/user_img/logo3.png" alt="Social book"> -->
                </div>
                <!-- <h1>{{ firstName }}</h1> -->
                <div class="title">
                    Nơi tìm hiểu và chia sẻ những vị trí, trải nghiệm với những địa điểm du lịch                   
                </div>
            </div>
            <form class="right-side col-12 col-lg-6" @submit.prevent="handleSubmit">
                <div class="container">
                    <div class="row">
                        <div class="col-6 p-0"><InputBase :type="'text'" :placeholder="'Họ'" @sendString="sendString"/></div>
                        <div class="col-6 ps-1 pe-0"><InputBase :type="'text'" :placeholder="'Tên'" @sendString="sendString"/></div>
                    </div>
                </div>
                <InputBase :type="'text'" :placeholder="'Email'" @sendString="sendString"/>
                <InputBase :type="'password'" :placeholder="'Mật khẩu'" @sendString="sendString"/>
                <!-- <input type="text" class="form-input form-control" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                <input type="password" class="form-input form-control" placeholder="Mật khẩu" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"> -->
                <!-- <InputBase :type="'text'" :placeholder="'Nhập lại mật khẩu'"/>
                <InputBase :type="'date'" :placeholder="'Ngày sinh'"/> -->
                <button type="submit" class="sign-up-btn form-btn btn btn-success">Đăng ký</button>
                <button type="button" class="sign-in-btn form-btn btn btn-primary" @click="moveToLogin">Đã có tài khoản? Đăng nhập ngay</button>
            </form>
        </div>
    </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import InputBase from '../components/InputBase.vue';
import {useRouter} from 'vue-router';
// import {useStore} from 'vuex';
import {reactive, ref} from 'vue';
// import {SIGNUP_ACTION} from '../store/storeconstants';
import axios from 'axios';
export default {
    components: {InputBase},
    setup() {
        // const store = useStore();
        // const action = () => {
        //     store.dispatch('auth', {
        //         signup: SIGNUP_ACTION
        //     })
        // };
        
        const data = reactive({
            // firstName: '',
            // lastName: '',
            // email: '',
            // password: ''
        });
        const isValid = ref(true);
        const router = useRouter();
        const moveToLogin = () => {
            router.push('/');
        }
        const sendString = (sendString) => {
            let obj = Object.assign({}, sendString);
            if(obj['type'] === 'Họ' && obj['condition']) {
                data.lastName = obj['value'];
            }
            else if (obj['type'] === 'Tên' && obj['condition']) {
                data.firstName = obj['value'];
            }
            else if (obj['type'] === 'Email' && obj['condition']) {
                data.email = obj['value'];
            }
            else if (obj['type'] === 'Mật khẩu' && obj['condition']) {
                data.password = obj['value'];
            }
            else {
                isValid.value = false;
            }
        }
        const handleSubmit = () => {

            if (isValid.value && Object.keys(data).length !== 0) {
                data.returnSecureToken = true;
                console.log(data);
                axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDT5wm4oPfy7gUnuLQSQrWf-0Hyg0lR28U`, data)
                .then((response) => {
                    console.log(response);
                })
                .catch(e => {
                    console.log(e);
                })
            } else {
                alert('Vui long kiem tra lai');
            } 
        }
        return {router, moveToLogin, sendString, handleSubmit}
    }
}
</script>
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
    input.form-input, .sign-up-btn {
        margin-bottom: 1rem;
    } 
    .sign-in-btn, .sign-up-btn {
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